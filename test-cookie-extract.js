#!/usr/bin/env node

function testCookieExtraction() {
  console.log('🔍 Testing cookie extraction...')
  
  // Simulate cookie string from request
  const cookieString = 'auth-token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImVhNjJiZTdiLWE2MDctNDAyYi05ZDAwLWU5ZDJmYTI1YzU4YiIsImVtYWlsIjoic3VwZXJhZG1pbkBoYXJ3ZWIuY29tIiwibmFtZSI6IvCfjI0gU3VwZXIgQWRtaW5pc3RyYWRvciIsInJvbGUiOiJTVVBFUl9BRE1JTiIsIm9yZ2FuaXphdGlvbklkIjpudWxsLCJpYXQiOjE3NTQyODQ3NjEsImV4cCI6MTc1NDg4OTU2MX0.9zREeezWSU9BTBKhgW-697K839-SV16gLlYzeTrmVHk; Path=/; Expires=Mon, 11 Aug 2025 05:19:21 GMT; Max-Age=604800; SameSite=lax'
  
  console.log('Cookie string:', cookieString)
  
  // Test extraction logic from middleware
  const match = cookieString.match(/auth-token=([^;]+)/)
  if (match) {
    const token = match[1]
    console.log('✅ Token extracted successfully')
    console.log('Token:', token.substring(0, 50) + '...')
    
    // Test JWT verification
    const jwt = require('jsonwebtoken')
    const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key'
    
    try {
      const decoded = jwt.verify(token, JWT_SECRET)
      console.log('✅ Token is valid')
      console.log('User role:', decoded.role)
    } catch (error) {
      console.log('❌ Token verification failed:', error.message)
    }
    
  } else {
    console.log('❌ No token found in cookie')
  }
}

testCookieExtraction()