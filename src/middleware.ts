import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createClient } from '@/utils/supabase/middleware'

export async function middleware(request: NextRequest) {
  console.log('🔍 Middleware called for:', request.nextUrl.pathname)
  
  // Create Supabase client for middleware
  const { supabase, response } = createClient(request)
  
  // Protected routes
  const protectedPaths = ['/dashboard', '/api/work-orders', '/api/employees', '/api/payroll', '/api/admin']
  const isProtectedPath = protectedPaths.some(path => 
    request.nextUrl.pathname.startsWith(path)
  )

  if (isProtectedPath) {
    console.log('🔒 Protected path detected')
    
    // Check if user is authenticated with Supabase
    const { data: { user }, error } = await supabase.auth.getUser()
    
    if (error || !user) {
      console.log('❌ User not authenticated:', error?.message)
      
      if (request.nextUrl.pathname.startsWith('/api/')) {
        return NextResponse.json(
          { error: 'Authentication required' },
          { status: 401 }
        )
      }
      return NextResponse.redirect(new URL('/login', request.url))
    }
    
    console.log('✅ User authenticated:', user.email)
    console.log('User ID:', user.id)
    
    // Get user profile from database
    const { data: profile } = await supabase
      .from('users')
      .select('id, role, organizationId')
      .eq('email', user.email)
      .single()
    
    if (profile) {
      console.log('User role:', profile.role)
      
      // Add user context to headers for API routes
      if (request.nextUrl.pathname.startsWith('/api/')) {
        const requestHeaders = new Headers(request.headers)
        requestHeaders.set('x-user-id', profile.id)
        requestHeaders.set('x-user-role', profile.role)
        if (profile.organizationId) {
          requestHeaders.set('x-organization-id', profile.organizationId)
        }

        console.log('📤 Headers set:', {
          'x-user-id': profile.id,
          'x-user-role': profile.role,
        })

        return NextResponse.next({
          request: {
            headers: requestHeaders,
          },
        })
      }
    }
  }

  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}