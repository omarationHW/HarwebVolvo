import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { hashPassword, generateToken } from '@/utils/auth'
import { z } from 'zod'
import { Country } from '@prisma/client'

const registerSchema = z.object({
  // User info
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(2),
  
  // Company info
  organizationName: z.string().min(2),
  employerName: z.string().min(2),
  country: z.enum(['BR', 'MX', 'AR', 'CO', 'CL']),
  
  // Optional configuration
  organizationType: z.enum(['CORPORATION', 'SME', 'STARTUP', 'NGO', 'GOVERNMENT']).default('SME'),
  taxId: z.string().optional()
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const data = registerSchema.parse(body)

    // Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await hashPassword(data.password)

    // Create hierarchical structure and user in a transaction
    const result = await prisma.$transaction(async (tx) => {
      // Get country configuration
      const countryConfig = await tx.countryConfiguration.findUnique({
        where: { country: data.country as Country }
      })

      if (!countryConfig) {
        throw new Error(`Country configuration not found for ${data.country}`)
      }

      // Create organization
      const organization = await tx.organization.create({
        data: {
          name: data.organizationName,
          code: data.organizationName.replace(/\s+/g, '').toUpperCase().substring(0, 10),
          type: data.organizationType,
          countryId: countryConfig.id,
          taxId: data.taxId || `${data.country}${Date.now()}`,
          address: {
            street: '',
            city: '',
            state: '',
            zipCode: '',
            country: countryConfig.name
          },
          configuration: {
            fiscalYear: 'calendar',
            payrollFrequency: 'biweekly',
            benefits: {
              healthInsurance: true
            }
          }
        }
      })

      // Create employer
      const employer = await tx.employer.create({
        data: {
          name: data.employerName,
          code: data.employerName.replace(/\s+/g, '').toUpperCase().substring(0, 10),
          organizationId: organization.id,
          legalName: data.employerName,
          taxId: data.taxId || `${data.country}${Date.now()}`,
          configuration: {
            payrollSettings: {
              payDates: [15, 30],
              currency: countryConfig.currency,
              roundingRules: 'round_to_peso'
            },
            benefits: {
              voucherRestaurant: 200
            }
          }
        }
      })

      // Create default department
      const department = await tx.department.create({
        data: {
          name: 'General',
          code: 'GEN',
          employerId: employer.id,
          description: 'Departamento general'
        }
      })

      // Create default work order
      const workOrder = await tx.workOrder.create({
        data: {
          code: `WO_${Date.now()}`,
          name: `${data.employerName} - Principal`,
          description: 'Orden de trabajo principal',
          employerId: employer.id,
          payrollPeriod: 'BIWEEKLY',
          startDate: new Date(),
          configuration: {
            overtime: { enabled: true, rate: 2.0 },
            benefits: { voucherRestaurant: 200 },
            workingDays: 22
          }
        }
      })

      // Create admin user
      const user = await tx.user.create({
        data: {
          email: data.email,
          password: hashedPassword,
          name: data.name,
          role: 'ORG_ADMIN',
          organizationId: organization.id,
          permissions: {
            canViewAllEmployers: true,
            canManagePayroll: true,
            canManageEmployees: true
          }
        }
      })

      return { user, workOrder, organization, employer }
    })

    // Generate JWT token
    const token = generateToken({
      id: result.user.id,
      email: result.user.email,
      name: result.user.name,
      role: result.user.role,
      organizationId: result.organization.id
    })

    const response = NextResponse.json({
      token,
      user: {
        id: result.user.id,
        email: result.user.email,
        name: result.user.name,
        role: result.user.role,
        organization: {
          id: result.organization.id,
          name: result.organization.name,
          country: data.country
        },
        employer: {
          id: result.employer.id,
          name: result.employer.name
        }
      }
    }, { status: 201 })

    // Set HTTP-only cookie for server-side authentication
    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7 // 7 days
    })

    return response
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.issues },
        { status: 400 }
      )
    }
    
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}