import { NextRequest, NextResponse } from 'next/server'
import { ComplianceService } from '@/services/compliance'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const country = searchParams.get('country')
    const category = searchParams.get('category')

    if (!country) {
      return NextResponse.json(
        { error: 'Country parameter is required' },
        { status: 400 }
      )
    }

    let rules
    if (category) {
      rules = ComplianceService.getRulesByCategory(country, category as any)
    } else {
      rules = ComplianceService.getRulesByCountry(country)
    }

    return NextResponse.json({
      success: true,
      rules,
      count: rules.length
    })

  } catch (error) {
    console.error('Error fetching compliance rules:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}