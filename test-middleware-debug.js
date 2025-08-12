#!/usr/bin/env node

const API_BASE = 'http://localhost:3000'

async function testMiddlewareDebug() {
  try {
    console.log('🔍 Testing middleware directly...')
    
    // Step 1: Login
    const loginResponse = await fetch(`${API_BASE}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: 'superadmin@harweb.com',
        password: '12345678'
      })
    })
    
    if (!loginResponse.ok) {
      console.log('❌ Login failed')
      return
    }
    
    const loginData = await loginResponse.json()
    console.log('✅ Login successful!')
    
    // Step 2: Test auth endpoint with Authorization header
    console.log('\n🔍 Testing with Authorization header...')
    const authResponse = await fetch(`${API_BASE}/api/admin/test-auth`, {
      headers: {
        'Authorization': `Bearer ${loginData.token}`,
        'Content-Type': 'application/json'
      }
    })
    
    console.log('Response status:', authResponse.status)
    const authData = await authResponse.json()
    console.log('Response data:', JSON.stringify(authData, null, 2))
    
  } catch (error) {
    console.error('❌ Test error:', error.message)
  }
}

testMiddlewareDebug()