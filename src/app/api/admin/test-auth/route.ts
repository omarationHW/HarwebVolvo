import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    console.log('🔍 Test auth endpoint called')
    
    // Get user info from headers (set by middleware)
    const userId = request.headers.get('x-user-id')
    const userRole = request.headers.get('x-user-role')
    const orgId = request.headers.get('x-organization-id')
    
    console.log('Headers received:')
    console.log('- x-user-id:', userId)
    console.log('- x-user-role:', userRole)
    console.log('- x-organization-id:', orgId)
    
    // Check if this is a super admin
    if (userRole === 'SUPER_ADMIN') {
      return NextResponse.json({
        success: true,
        message: 'Super Admin access granted!',
        user: {
          id: userId,
          role: userRole,
          organizationId: orgId
        }
      })
    } else if (userId && userRole) {
      return NextResponse.json({
        success: true,
        message: 'Regular user access granted',
        user: {
          id: userId,
          role: userRole,
          organizationId: orgId
        }
      })
    } else {
      return NextResponse.json({
        error: 'No user headers found - middleware not working',
        headers: {
          'x-user-id': userId,
          'x-user-role': userRole,
          'x-organization-id': orgId
        }
      }, { status: 403 })
    }
    
  } catch (error) {
    console.error('❌ Test auth error:', error)
    
    return NextResponse.json({
      error: 'Test auth error',
      details: {
        type: error instanceof Error ? error.constructor.name : 'Unknown',
        message: error instanceof Error ? error.message : String(error)
      }
    }, { status: 500 })
  }
}