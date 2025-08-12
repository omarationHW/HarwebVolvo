import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    console.log('🔍 Debug headers endpoint called')
    
    const headers = {
      'x-user-id': request.headers.get('x-user-id'),
      'x-user-role': request.headers.get('x-user-role'),
      'x-organization-id': request.headers.get('x-organization-id'),
      'authorization': request.headers.get('authorization'),
      'cookie': request.headers.get('cookie')
    }
    
    console.log('Headers received:', headers)
    
    return NextResponse.json({
      success: true,
      headers
    })
    
  } catch (error) {
    console.error('❌ Debug headers error:', error)
    
    return NextResponse.json({
      error: 'Debug error',
      details: {
        type: error instanceof Error ? error.constructor.name : 'Unknown',
        message: error instanceof Error ? error.message : String(error)
      }
    }, { status: 500 })
  }
}