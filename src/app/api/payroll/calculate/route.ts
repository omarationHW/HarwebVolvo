import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { PayrollCalculator } from '@/services/payroll-calculator'
import { z } from 'zod'

const calculatePayrollSchema = z.object({
  employeeIds: z.array(z.string()).optional(),
  period: z.string(),
  startDate: z.string().datetime(),
  endDate: z.string().datetime()
})

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
    const data = calculatePayrollSchema.parse(body)

    // Get work order configuration with country info
    const workOrder = await prisma.workOrder.findUnique({
      where: { id: workOrderId },
      include: {
        employer: {
          include: {
            organization: {
              include: {
                country: true
              }
            }
          }
        }
      }
    })

    if (!workOrder) {
      return NextResponse.json(
        { error: 'Work order not found' },
        { status: 404 }
      )
    }

    // Get employees to process
    const employees = await prisma.employee.findMany({
      where: {
        workOrderId,
        ...(data.employeeIds && {
          id: { in: data.employeeIds }
        }),
        terminationDate: null
      }
    })

    if (employees.length === 0) {
      return NextResponse.json(
        { error: 'No employees found to process' },
        { status: 400 }
      )
    }

    // Create payroll calculator
    const calculator = new PayrollCalculator(workOrder.employer.organization.country.country)

    // Calculate payroll for each employee
    const calculations = []
    let totalGross = 0
    let totalNet = 0
    let totalTaxes = 0
    let totalDeductions = 0

    for (const employee of employees) {
      const salary = Number(employee.salary)
      const calculation = calculator.calculate(salary, {
        dependents: 0,
        benefits: 0,
        otherDeductions: 0
      })

      calculations.push({
        employeeId: employee.id,
        employeeCode: employee.employeeCode,
        employeeName: `${employee.firstName} ${employee.lastName}`,
        ...calculation
      })

      totalGross += calculation.grossSalary
      totalNet += calculation.netSalary
      totalTaxes += calculation.totalTaxes
      totalDeductions += calculation.deductions
    }

    // Create draft payroll run
    const payrollRun = await prisma.payrollRun.create({
      data: {
        runNumber: `PR-${Date.now()}`,
        period: data.period,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
        status: 'DRAFT',
        totalEmployees: employees.length,
        totalGross,
        totalNet,
        totalTaxes,
        totalDeductions,
        currency: (workOrder.configuration as any)?.currency || 'BRL',
        workOrderId,
        processingData: {
          calculations,
          processedAt: new Date().toISOString()
        }
      }
    })

    return NextResponse.json({
      payrollRun,
      calculations,
      summary: {
        totalEmployees: employees.length,
        totalGross,
        totalNet,
        totalTaxes,
        totalDeductions,
        currency: (workOrder.configuration as any)?.currency || 'BRL'
      }
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.issues },
        { status: 400 }
      )
    }
    
    console.error('Calculate payroll error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}