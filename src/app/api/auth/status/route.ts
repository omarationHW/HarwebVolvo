import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function GET(request: NextRequest) {
  try {
    // Create Supabase client
    const supabase = await createClient()

    // Get the current user session
    const { data: { user }, error } = await supabase.auth.getUser()

    if (error || !user) {
      return NextResponse.json(
        { authenticated: false },
        { status: 401 }
      )
    }

    // Get user profile from database
    const { data: profile } = await supabase
      .from('users')
      .select('id, email, name, role, organizationId')
      .eq('email', user.email)
      .single()

    if (!profile) {
      return NextResponse.json(
        { authenticated: false },
        { status: 401 }
      )
    }

    return NextResponse.json({
      authenticated: true,
      user: {
        id: profile.id,
        email: profile.email,
        name: profile.name,
        role: profile.role,
        organizationId: profile.organizationId
      }
    })
  } catch (error) {
    console.error('❌ Status check error:', error)
    return NextResponse.json(
      { authenticated: false },
      { status: 401 }
    )
  }
}