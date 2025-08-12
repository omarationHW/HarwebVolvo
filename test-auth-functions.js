#!/usr/bin/env node

// Import auth functions to test them directly
import { generateToken, comparePassword } from './src/utils/auth.js'

async function testAuthFunctions() {
  console.log('🔍 Testing auth functions directly...\n')
  
  try {
    // Test password comparison
    console.log('1️⃣ Testing comparePassword...')
    const testHash = '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi' // hash of 'password'
    const result = await comparePassword('password', testHash)
    console.log('✅ comparePassword works:', result)
    
    // Test token generation with SUPER_ADMIN (no organizationId, no workOrderId)
    console.log('\n2️⃣ Testing generateToken for SUPER_ADMIN...')
    const superAdminUser = {
      id: 'test-id',
      email: 'superadmin@harweb.com',
      name: 'Super Admin',
      role: 'SUPER_ADMIN',
      organizationId: null,
      workOrderId: undefined
    }
    
    console.log('Input user:', JSON.stringify(superAdminUser, null, 2))
    
    const token = generateToken(superAdminUser)
    console.log('✅ Token generated successfully')
    console.log('Token length:', token.length)
    console.log('Token preview:', token.substring(0, 50) + '...')
    
    console.log('\n🎉 All auth functions work correctly!')
    
  } catch (error) {
    console.log('\n❌ Error in auth functions:')
    console.log('Error type:', error.constructor.name)
    console.log('Error message:', error.message)
    console.log('Error stack:', error.stack)
  }
}

testAuthFunctions()