import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { PayrollCalculator } from '@/services/payroll-calculator'
import { z } from 'zod'

const processPayrollSchema = z.object({
  payrollRunId: z.string().uuid()
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
    const { payrollRunId } = processPayrollSchema.parse(body)

    // Get payroll run
    const payrollRun = await prisma.payrollRun.findFirst({
      where: {
        id: payrollRunId,
        workOrderId,
        status: 'DRAFT'
      },
      include: {
        workOrder: {
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
        }
      }
    })

    if (!payrollRun) {
      return NextResponse.json(
        { error: 'Payroll run not found or already processed' },
        { status: 404 }
      )
    }

    // Update status to processing
    await prisma.payrollRun.update({
      where: { id: payrollRunId },
      data: { status: 'PROCESSING' }
    })

    try {
      // Get all employees for this payroll run
      const employees = await prisma.employee.findMany({
        where: {
          workOrderId,
          terminationDate: null
        }
      })

      // Create payroll calculator
      const calculator = new PayrollCalculator(payrollRun.workOrder.employer.organization.country.country)

      // Process each employee and create payroll items
      const payrollItems = []
      for (const employee of employees) {
        const salary = Number(employee.salary)
        const calculation = calculator.calculate(salary)

        const payrollItem = await prisma.payrollItem.create({
          data: {
            payrollRunId,
            employeeId: employee.id,
            grossSalary: calculation.grossSalary,
            netSalary: calculation.netSalary,
            totalTaxes: calculation.totalTaxes,
            totalDeductions: calculation.deductions,
            totalBenefits: calculation.benefits,
            calculations: calculation as any
          }
        })

        payrollItems.push(payrollItem)
      }

      // Update payroll run status to completed
      const completedPayrollRun = await prisma.payrollRun.update({
        where: { id: payrollRunId },
        data: {
          status: 'COMPLETED',
          processedAt: new Date(),
          totalEmployees: payrollItems.length
        }
      })

      return NextResponse.json({
        payrollRun: completedPayrollRun,
        itemsProcessed: payrollItems.length
      })
    } catch (error) {
      // If error occurs, update status to failed
      await prisma.payrollRun.update({
        where: { id: payrollRunId },
        data: {
          status: 'FAILED',
          errors: {
            message: error instanceof Error ? error.message : 'Unknown error',
            timestamp: new Date().toISOString()
          }
        }
      })
      throw error
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.issues },
        { status: 400 }
      )
    }
    
    console.error('Process payroll error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}