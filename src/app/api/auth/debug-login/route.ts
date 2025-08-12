import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    console.log('🔍 Debug login endpoint called')
    
    const body = await request.json()
    console.log('📝 Request body:', body)
    
    const { email } = body
    
    // Simple user lookup
    const user = await prisma.user.findUnique({
      where: { email }
    })
    
    console.log('👤 User found:', user ? user.name : 'None')
    
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }
    
    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    })
    
  } catch (error) {
    console.error('❌ Debug login error:', error)
    console.error('Error type:', error instanceof Error ? error.constructor.name : 'Unknown')
    console.error('Error message:', error instanceof Error ? error.message : String(error))
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack available')
    
    return NextResponse.json({
      error: 'Debug error',
      details: {
        type: error instanceof Error ? error.constructor.name : 'Unknown',
        message: error instanceof Error ? error.message : String(error)
      }
    }, { status: 500 })
  }
}