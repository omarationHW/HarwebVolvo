import { NextRequest, NextResponse } from 'next/server'
import { findUserByEmail } from '@/lib/db-direct'
import { comparePassword, generateToken } from '@/utils/auth'
import { z } from 'zod'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = loginSchema.parse(body)

    console.log('🔍 Login attempt for:', email)

    // Find user by email using direct PostgreSQL connection
    const user = await findUserByEmail(email)

    if (!user) {
      console.log('❌ User not found:', email)
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    console.log('✅ User found:', user.email, 'Role:', user.role)

    // Verify password
    const isValidPassword = await comparePassword(password, user.password)
    if (!isValidPassword) {
      console.log('❌ Invalid password for:', email)
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    console.log('✅ Password verified for:', email)

    // Generate JWT token
    const token = generateToken({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      organizationId: user.organization_id || undefined,
      workOrderId: user.work_order_id || undefined
    })

    console.log('✅ Token generated, length:', token.length)

    const response = NextResponse.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        organization: null
      }
    })

    // Set cookie for server-side authentication
    response.cookies.set('auth-token', token, {
      httpOnly: false, // Disable httpOnly for testing
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7 // 7 days
    })

    console.log('✅ Cookie set, redirecting to dashboard')

    return response
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.log('❌ Validation error:', error.issues)
      return NextResponse.json(
        { error: 'Invalid request data', details: error.issues },
        { status: 400 }
      )
    }
    
    console.error('❌ Login error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: (error as Error).message },
      { status: 500 }
    )
  }
}