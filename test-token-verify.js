#!/usr/bin/env node

const jwt = require('jsonwebtoken')

function testTokenVerification() {
  try {
    // Get a fresh token first
    console.log('🔍 Testing token verification...')
    
    const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key'
    console.log('JWT_SECRET exists:', !!JWT_SECRET)
    
    // Create a test token
    const payload = {
      id: 'test-id',
      email: 'superadmin@harweb.com',
      name: 'Super Admin',
      role: 'SUPER_ADMIN',
      organizationId: null
    }
    
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' })
    console.log('✅ Token created')
    console.log('Token:', token.substring(0, 50) + '...')
    
    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET)
    console.log('✅ Token verified successfully')
    console.log('Decoded payload:', JSON.stringify(decoded, null, 2))
    
    // Test verifyToken function from auth.ts (simulated)
    console.log('\n🔍 Testing verifyToken function logic...')
    
    function verifyToken(token) {
      try {
        const decoded = jwt.verify(token, JWT_SECRET)
        return decoded
      } catch (error) {
        console.log('Verify error:', error.message)
        return null
      }
    }
    
    const result = verifyToken(token)
    console.log('verifyToken result:', result ? 'SUCCESS' : 'FAILED')
    
  } catch (error) {
    console.error('❌ Token verification error:', error)
  }
}

testTokenVerification()