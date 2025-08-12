import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { z } from 'zod'
import { EmployeeType } from '@prisma/client'

const createEmployeeSchema = z.object({
  employeeCode: z.string().min(1),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  documentType: z.string(),
  documentNumber: z.string(),
  type: z.enum(['FULL_TIME', 'PART_TIME', 'CONTRACTOR', 'TEMPORARY']),
  hireDate: z.string().datetime(),
  salary: z.number().positive(),
  currency: z.string().default('BRL'),
  position: z.string(),
  departmentId: z.string().uuid()
})

export async function GET(request: NextRequest) {
  try {
    const workOrderId = request.headers.get('x-work-order-id')
    if (!workOrderId) {
      return NextResponse.json(
        { error: 'Work order ID required' },
        { status: 400 }
      )
    }

    const searchParams = request.nextUrl.searchParams
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const search = searchParams.get('search') || ''
    const departmentId = searchParams.get('departmentId')

    const where = {
      workOrderId,
      ...(search && {
        OR: [
          { firstName: { contains: search, mode: 'insensitive' as any } },
          { lastName: { contains: search, mode: 'insensitive' as any } },
          { email: { contains: search, mode: 'insensitive' as any } },
          { employeeCode: { contains: search, mode: 'insensitive' as any } }
        ]
      }),
      ...(departmentId && { departmentId })
    }

    const [employees, total] = await Promise.all([
      prisma.employee.findMany({
        where,
        include: {
          department: true
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' }
      }),
      prisma.employee.count({ where })
    ])

    return NextResponse.json({
      data: employees,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Get employees error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const workOrderId = request.headers.get('x-work-order-id')
    if (!workOrderId) {
      return NextResponse.json(
        { error: 'Work order ID required' },
        { status: 400 }
      )
    }

    const body = await request.json()
    const data = createEmployeeSchema.parse(body)

    // Check if employee code already exists
    const existingEmployee = await prisma.employee.findUnique({
      where: {
        workOrderId_employeeCode: {
          workOrderId,
          employeeCode: data.employeeCode
        }
      }
    })

    if (existingEmployee) {
      return NextResponse.json(
        { error: 'Employee code already exists' },
        { status: 400 }
      )
    }

    // Create employee
    const employee = await prisma.employee.create({
      data: {
        ...data,
        type: data.type as EmployeeType,
        hireDate: new Date(data.hireDate),
        workOrderId
      },
      include: {
        department: true
      }
    })

    return NextResponse.json(employee, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.issues },
        { status: 400 }
      )
    }
    
    console.error('Create employee error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}