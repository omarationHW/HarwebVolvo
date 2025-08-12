import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // Get user info from headers (set by middleware)
    const userId = request.headers.get('x-user-id')
    const userRole = request.headers.get('x-user-role')

    console.log('🔍 Admin hierarchy API called by:', { userId, userRole })

    if (!userId || userRole !== 'SUPER_ADMIN') {
      return NextResponse.json(
        { error: 'Access denied. Super Admin role required.' },
        { status: 403 }
      )
    }

    // Return structured mock data for hierarchy
    const hierarchyData = [
      {
        id: 'mexico',
        name: 'México',
        country: 'MX',
        currency: 'MXN',
        type: 'country',
        count: 2,
        statistics: {
          organizations: 2,
          employers: 3,
          workOrders: 8,
          employees: 280
        },
        details: {
          currency: 'MXN',
          location: 'América del Norte',
          employeeCount: 280,
          status: 'Activo',
          description: 'Operaciones principales en México'
        },
        children: [
          {
            id: 'org-panxea',
            name: 'Panxea Corporation',
            code: 'PANXEA_MX',
            type: 'organization',
            organizationType: 'CORPORATION',
            count: 2,
            statistics: {
              employers: 2,
              workOrders: 5,
              employees: 185
            },
            details: {
              location: 'Ciudad de México',
              employeeCount: 185,
              status: 'Activo',
              description: 'Corporación tecnológica'
            },
            children: [
              {
                id: 'emp-panxea-mx',
                name: 'Panxea México',
                code: 'PNX_MX',
                type: 'employer',
                count: 3,
                statistics: {
                  workOrders: 3,
                  departments: 3,
                  employees: 110
                },
                details: {
                  location: 'Polanco, CDMX',
                  employeeCount: 110,
                  status: 'Activo'
                },
                children: [
                  {
                    id: 'wo-dev-team',
                    name: 'Desarrollo',
                    code: 'DEV_2024',
                    type: 'workorder',
                    payrollPeriod: 'BIWEEKLY',
                    status: 'ACTIVE',
                    count: 45,
                    statistics: { employees: 45 }
                  },
                  {
                    id: 'wo-marketing',
                    name: 'Marketing',
                    code: 'MKT_2024',
                    type: 'workorder',
                    payrollPeriod: 'BIWEEKLY',
                    status: 'ACTIVE',
                    count: 35,
                    statistics: { employees: 35 }
                  },
                  {
                    id: 'wo-sales',
                    name: 'Ventas',
                    code: 'SALES_2024',
                    type: 'workorder',
                    payrollPeriod: 'MONTHLY',
                    status: 'ACTIVE',
                    count: 30,
                    statistics: { employees: 30 }
                  }
                ]
              },
              {
                id: 'emp-panxea-services',
                name: 'Panxea Services',
                code: 'PNX_SERV',
                type: 'employer',
                count: 2,
                statistics: {
                  workOrders: 2,
                  departments: 2,
                  employees: 75
                },
                children: [
                  {
                    id: 'wo-consulting',
                    name: 'Consultoría',
                    code: 'CONS_2024',
                    type: 'workorder',
                    payrollPeriod: 'MONTHLY',
                    status: 'ACTIVE',
                    count: 40,
                    statistics: { employees: 40 }
                  },
                  {
                    id: 'wo-support',
                    name: 'Soporte',
                    code: 'SUPP_2024',
                    type: 'workorder',
                    payrollPeriod: 'BIWEEKLY',
                    status: 'ACTIVE',
                    count: 35,
                    statistics: { employees: 35 }
                  }
                ]
              }
            ]
          },
          {
            id: 'org-techstart',
            name: 'TechStart Solutions',
            code: 'TECHSTART',
            type: 'organization',
            organizationType: 'STARTUP',
            count: 1,
            statistics: {
              employers: 1,
              workOrders: 3,
              employees: 95
            },
            children: [
              {
                id: 'emp-techstart-main',
                name: 'TechStart Principal',
                code: 'TS_MAIN',
                type: 'employer',
                count: 3,
                statistics: {
                  workOrders: 3,
                  departments: 4,
                  employees: 95
                },
                children: [
                  {
                    id: 'wo-development',
                    name: 'Desarrollo Software',
                    code: 'DEV_TS_2024',
                    type: 'workorder',
                    payrollPeriod: 'BIWEEKLY',
                    status: 'ACTIVE',
                    count: 55,
                    statistics: { employees: 55 }
                  },
                  {
                    id: 'wo-qa',
                    name: 'QA',
                    code: 'QA_2024',
                    type: 'workorder',
                    payrollPeriod: 'BIWEEKLY',
                    status: 'ACTIVE',
                    count: 20,
                    statistics: { employees: 20 }
                  },
                  {
                    id: 'wo-devops',
                    name: 'DevOps',
                    code: 'DEVOPS_2024',
                    type: 'workorder',
                    payrollPeriod: 'MONTHLY',
                    status: 'ACTIVE',
                    count: 20,
                    statistics: { employees: 20 }
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'brasil',
        name: 'Brasil',
        country: 'BR',
        currency: 'BRL',
        type: 'country',
        count: 1,
        statistics: {
          organizations: 1,
          employers: 1,
          workOrders: 2,
          employees: 150
        },
        details: {
          currency: 'BRL',
          location: 'América del Sur',
          employeeCount: 150,
          status: 'Activo'
        },
        children: [
          {
            id: 'org-globalcorp-brasil',
            name: 'GlobalCorp Brasil',
            code: 'GLOBAL_BR',
            type: 'organization',
            organizationType: 'CORPORATION',
            count: 1,
            statistics: {
              employers: 1,
              workOrders: 2,
              employees: 150
            },
            children: [
              {
                id: 'emp-globalcorp-sp',
                name: 'GlobalCorp São Paulo',
                code: 'GC_SP',
                type: 'employer',
                count: 2,
                statistics: {
                  workOrders: 2,
                  departments: 2,
                  employees: 150
                },
                children: [
                  {
                    id: 'wo-operations-br',
                    name: 'Operações',
                    code: 'OPS_BR_2024',
                    type: 'workorder',
                    payrollPeriod: 'MONTHLY',
                    status: 'ACTIVE',
                    count: 85,
                    statistics: { employees: 85 }
                  },
                  {
                    id: 'wo-tech-br',
                    name: 'Tecnologia',
                    code: 'TECH_BR_2024',
                    type: 'workorder',
                    payrollPeriod: 'MONTHLY',
                    status: 'ACTIVE',
                    count: 65,
                    statistics: { employees: 65 }
                  }
                ]
              }
            ]
          }
        ]
      }
    ]

    // Calculate global statistics
    const globalStats = {
      totalCountries: hierarchyData.length,
      totalOrganizations: hierarchyData.reduce((acc, c) => acc + c.statistics.organizations, 0),
      totalEmployers: hierarchyData.reduce((acc, c) => acc + c.statistics.employers, 0),
      totalWorkOrders: hierarchyData.reduce((acc, c) => acc + c.statistics.workOrders, 0),
      totalEmployees: hierarchyData.reduce((acc, c) => acc + c.statistics.employees, 0)
    }

    console.log('✅ Returning hierarchy data:', {
      countries: globalStats.totalCountries,
      employees: globalStats.totalEmployees
    })

    return NextResponse.json({
      success: true,
      globalStats,
      hierarchy: hierarchyData
    })

  } catch (error) {
    console.error('❌ Admin hierarchy error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: (error as Error).message },
      { status: 500 }
    )
  }
}