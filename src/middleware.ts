import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

export async function middleware(request: NextRequest) {
  console.log('🔍 Middleware called for:', request.nextUrl.pathname)
  
  // Protected routes
  const protectedPaths = ['/dashboard', '/api/work-orders', '/api/employees', '/api/payroll', '/api/admin']
  const isProtectedPath = protectedPaths.some(path => 
    request.nextUrl.pathname.startsWith(path)
  )

  if (isProtectedPath) {
    console.log('🔒 Protected path detected')
    
    // Get token from cookie or authorization header
    let token = null
    const authHeader = request.headers.get('authorization')
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7)
      console.log('📝 Token from Authorization header, length:', token.length)
    } else {
      const cookieHeader = request.headers.get('cookie')
      if (cookieHeader) {
        const match = cookieHeader.match(/auth-token=([^;]+)/)
        if (match) {
          token = match[1]  
          console.log('🍪 Token from cookie, length:', token.length)
        }
      }
    }
    
    if (!token) {
      console.log('❌ No token found')
      if (request.nextUrl.pathname.startsWith('/api/')) {
        return NextResponse.json(
          { error: 'Authentication required' },
          { status: 401 }
        )
      }
      return NextResponse.redirect(new URL('/login', request.url))
    }

    try {
      const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production'
      console.log('🔑 JWT_SECRET length:', JWT_SECRET.length)
      
      // Use jose for Edge Runtime compatibility
      const secret = new TextEncoder().encode(JWT_SECRET)
      const { payload } = await jwtVerify(token, secret)
      
      console.log('✅ Token verified successfully with jose')
      console.log('User role:', payload.role)
      
      // Add user context to headers for API routes
      if (request.nextUrl.pathname.startsWith('/api/')) {
        const requestHeaders = new Headers(request.headers)
        requestHeaders.set('x-user-id', payload.id as string)
        requestHeaders.set('x-user-role', payload.role as string)
        if (payload.organizationId) {
          requestHeaders.set('x-organization-id', payload.organizationId as string)
        }

        console.log('📤 Headers set:', {
          'x-user-id': payload.id,
          'x-user-role': payload.role,
        })

        return NextResponse.next({
          request: {
            headers: requestHeaders,
          },
        })
      }
      
    } catch (error) {
      console.log('❌ Token verification failed:', (error as Error).message)
      console.log('Error details:', error)
      
      if (request.nextUrl.pathname.startsWith('/api/')) {
        return NextResponse.json(
          { error: 'Invalid token', details: (error as Error).message },
          { status: 401 }
        )
      }
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}