#!/usr/bin/env node

const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

async function testAuthFunctions() {
  console.log('🔍 Testing auth functions directly...\n')
  
  try {
    const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key'
    
    // Test token generation with SUPER_ADMIN (potential null values)
    console.log('1️⃣ Testing generateToken for SUPER_ADMIN...')
    const superAdminUser = {
      id: 'test-id',
      email: 'superadmin@harweb.com',
      name: 'Super Admin',
      role: 'SUPER_ADMIN',
      organizationId: null, // This could cause issues
      workOrderId: undefined // This could cause issues
    }
    
    console.log('Input user:', JSON.stringify(superAdminUser, null, 2))
    
    // Test the exact token generation logic from auth.ts
    const tokenPayload = {
      id: superAdminUser.id,
      email: superAdminUser.email,
      name: superAdminUser.name,
      role: superAdminUser.role,
      organizationId: superAdminUser.organizationId,
      workOrderId: superAdminUser.workOrderId
    }
    
    console.log('Token payload:', JSON.stringify(tokenPayload, null, 2))
    
    const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: '7d' })
    console.log('✅ Token generated successfully')
    console.log('Token length:', token.length)
    
    // Test token verification
    console.log('\n2️⃣ Testing token verification...')
    const decoded = jwt.verify(token, JWT_SECRET)
    console.log('✅ Token verified successfully')
    console.log('Decoded payload:', JSON.stringify(decoded, null, 2))
    
    console.log('\n🎉 Auth functions work correctly!')
    
  } catch (error) {
    console.log('\n❌ Error in auth functions:')
    console.log('Error type:', error.constructor.name)
    console.log('Error message:', error.message)
    console.log('Error stack:', error.stack)
  }
}

testAuthFunctions()