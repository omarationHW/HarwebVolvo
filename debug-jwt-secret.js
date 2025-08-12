#!/usr/bin/env node

const jwt = require('jsonwebtoken')

async function debugJWTSecret() {
  console.log('🔍 Debugging JWT_SECRET consistency...')
  
  // Load environment variables  
  require('dotenv').config()
  
  const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key'
  console.log('JWT_SECRET from env:', JWT_SECRET ? `${JWT_SECRET.substring(0, 10)}...` : 'undefined')
  console.log('JWT_SECRET length:', JWT_SECRET.length)
  
  // Test token creation and verification with the same secret
  console.log('\n🔍 Testing token creation and immediate verification...')
  
  const payload = {
    id: 'test-id',
    email: 'superadmin@harweb.com',
    name: 'Super Admin',
    role: 'SUPER_ADMIN',
    organizationId: null
  }
  
  try {
    // Create token
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' })
    console.log('✅ Token created successfully')
    console.log('Token length:', token.length)
    
    // Immediately verify the token
    const decoded = jwt.verify(token, JWT_SECRET)
    console.log('✅ Token verified successfully')
    console.log('Decoded role:', decoded.role)
    
    // Test with wrong secret
    console.log('\n🔍 Testing with wrong secret...')
    try {
      jwt.verify(token, 'wrong-secret')
      console.log('❌ This should not succeed!')
    } catch (error) {
      console.log('✅ Correctly failed with wrong secret:', error.message)
    }
    
    // Check if .env file exists and what it contains
    const fs = require('fs')
    console.log('\n🔍 Checking .env files...')
    
    const envFiles = ['.env', '.env.local']
    for (const envFile of envFiles) {
      if (fs.existsSync(envFile)) {
        const content = fs.readFileSync(envFile, 'utf8')
        const jwtLine = content.split('\n').find(line => line.startsWith('JWT_SECRET'))
        console.log(`${envFile}:`, jwtLine || 'JWT_SECRET not found')
      } else {
        console.log(`${envFile}: not found`)
      }
    }
    
  } catch (error) {
    console.error('❌ JWT test failed:', error)
  }
}

debugJWTSecret()