import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    // Get user info from headers (set by middleware)
    const userId = request.headers.get('x-user-id')
    const userRole = request.headers.get('x-user-role')

    if (!userId || userRole !== 'SUPER_ADMIN') {
      return NextResponse.json(
        { error: 'Access denied. Super Admin role required.' },
        { status: 403 }
      )
    }

    // Get complete hierarchy: Countries -> Organizations -> Employers -> WorkOrders
    const countries = await prisma.countryConfiguration.findMany({
      include: {
        organizations: {
          include: {
            employers: {
              include: {
                workOrders: {
                  include: {
                    employees: true,
                    _count: {
                      select: { employees: true }
                    }
                  }
                },
                departments: true,
                _count: {
                  select: { 
                    workOrders: true,
                    departments: true
                  }
                }
              }
            },
            _count: {
              select: { employers: true }
            }
          }
        }
      }
    })

    // Format the response
    const hierarchyData = countries.map(country => ({
      id: country.id,
      name: country.name,
      country: country.country,
      currency: country.currency,
      type: 'country' as const,
      count: country.organizations.length,
      statistics: {
        organizations: country.organizations.length,
        employers: country.organizations.reduce((acc, org) => acc + org._count.employers, 0),
        workOrders: country.organizations.reduce((acc, org) => 
          acc + org.employers.reduce((empAcc, emp) => empAcc + emp._count.workOrders, 0), 0
        ),
        employees: country.organizations.reduce((acc, org) => 
          acc + org.employers.reduce((empAcc, emp) => 
            empAcc + emp.workOrders.reduce((woAcc, wo) => woAcc + wo._count.employees, 0), 0
          ), 0
        )
      },
      children: country.organizations.map(org => ({
        id: org.id,
        name: org.name,
        code: org.code,
        type: 'organization' as const,
        organizationType: org.type,
        count: org._count.employers,
        statistics: {
          employers: org._count.employers,
          workOrders: org.employers.reduce((acc, emp) => acc + emp._count.workOrders, 0),
          employees: org.employers.reduce((acc, emp) => 
            acc + emp.workOrders.reduce((woAcc, wo) => woAcc + wo._count.employees, 0), 0
          )
        },
        children: org.employers.map(emp => ({
          id: emp.id,
          name: emp.name,
          code: emp.code,
          type: 'employer' as const,
          count: emp._count.workOrders,
          statistics: {
            workOrders: emp._count.workOrders,
            departments: emp._count.departments,
            employees: emp.workOrders.reduce((acc, wo) => acc + wo._count.employees, 0)
          },
          children: emp.workOrders.map(wo => ({
            id: wo.id,
            name: wo.name,
            code: wo.code,
            type: 'workorder' as const,
            payrollPeriod: wo.payrollPeriod,
            status: wo.status,
            count: wo._count.employees,
            statistics: {
              employees: wo._count.employees
            }
          }))
        }))
      }))
    }))

    // Calculate global statistics
    const globalStats = {
      totalCountries: countries.length,
      totalOrganizations: countries.reduce((acc, c) => acc + c.organizations.length, 0),
      totalEmployers: countries.reduce((acc, c) => 
        acc + c.organizations.reduce((orgAcc, org) => orgAcc + org._count.employers, 0), 0
      ),
      totalWorkOrders: countries.reduce((acc, c) => 
        acc + c.organizations.reduce((orgAcc, org) => 
          orgAcc + org.employers.reduce((empAcc, emp) => empAcc + emp._count.workOrders, 0), 0
        ), 0
      ),
      totalEmployees: countries.reduce((acc, c) => 
        acc + c.organizations.reduce((orgAcc, org) => 
          orgAcc + org.employers.reduce((empAcc, emp) => 
            empAcc + emp.workOrders.reduce((woAcc, wo) => woAcc + wo._count.employees, 0), 0
          ), 0
        ), 0
      )
    }

    return NextResponse.json({
      success: true,
      globalStats,
      hierarchy: hierarchyData
    })

  } catch (error) {
    console.error('Admin hierarchy error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}