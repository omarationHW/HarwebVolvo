import { NextRequest, NextResponse } from 'next/server'
import { ComplianceService } from '@/services/compliance'

export async function POST(request: NextRequest) {
  try {
    const { entityType, entityId, country, data } = await request.json()

    if (!entityType || !entityId || !country) {
      return NextResponse.json(
        { error: 'Missing required fields: entityType, entityId, country' },
        { status: 400 }
      )
    }

    let validationResult

    switch (entityType) {
      case 'employee':
        validationResult = await ComplianceService.validateEmployee(data, country)
        break
      
      default:
        return NextResponse.json(
          { error: `Entity type ${entityType} not supported yet` },
          { status: 400 }
        )
    }

    // Aquí podrías guardar el resultado en la base de datos
    // await saveComplianceCheck(entityType, entityId, validationResult)

    return NextResponse.json({
      success: true,
      result: validationResult,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Compliance validation error:', error)
    return NextResponse.json(
      { error: 'Internal server error during compliance validation' },
      { status: 500 }
    )
  }
}