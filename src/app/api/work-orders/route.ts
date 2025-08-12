import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const workOrderId = request.headers.get('x-work-order-id')
    const userRole = request.headers.get('x-user-role')

    if (!workOrderId) {
      return NextResponse.json(
        { error: 'Work order ID required' },
        { status: 400 }
      )
    }

    const workOrder = await prisma.workOrder.findUnique({
      where: { id: workOrderId },
      include: {
        _count: {
          select: {
            employees: true,
            payrollRuns: true
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

    return NextResponse.json(workOrder)
  } catch (error) {
    console.error('Get work order error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const workOrderId = request.headers.get('x-work-order-id')
    const userRole = request.headers.get('x-user-role')

    if (!workOrderId) {
      return NextResponse.json(
        { error: 'Work order ID required' },
        { status: 400 }
      )
    }

    if (userRole !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      )
    }

    const body = await request.json()
    const { employerName, configuration } = body

    const updatedWorkOrder = await prisma.workOrder.update({
      where: { id: workOrderId },
      data: {
        ...(employerName && { employerName }),
        ...(configuration && { configuration })
      }
    })

    return NextResponse.json(updatedWorkOrder)
  } catch (error) {
    console.error('Update work order error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}