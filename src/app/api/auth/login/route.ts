import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
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

    // Create Supabase client
    const supabase = await createClient()

    // Sign in with Supabase Auth
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      console.log('❌ Login error:', error.message)
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    if (!data.user) {
      console.log('❌ No user data returned')
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    console.log('✅ User authenticated:', data.user.email)

    // Get user profile from database
    const { data: profile, error: profileError } = await supabase
      .from('users')
      .select('id, email, name, role, organizationId')
      .eq('email', email)
      .single()

    if (profileError || !profile) {
      console.log('❌ Profile not found:', profileError)
      return NextResponse.json(
        { error: 'User profile not found' },
        { status: 404 }
      )
    }

    console.log('✅ Profile found:', profile.email, 'Role:', profile.role)

    // Return user data and session
    const response = NextResponse.json({
      user: {
        id: profile.id,
        email: profile.email,
        name: profile.name,
        role: profile.role,
        organizationId: profile.organizationId
      },
      session: data.session
    })

    console.log('✅ Login successful, session created')

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