#!/usr/bin/env node

const API_BASE = 'http://localhost:3000'

async function testLogin() {
  try {
    console.log('Testing login with test@example.com...')
    
    const response = await fetch(`${API_BASE}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: 'test@example.com',
        password: '12345678'
      })
    })
    
    const data = await response.json()
    
    console.log('Status:', response.status)
    console.log('Response:', JSON.stringify(data, null, 2))
    
    if (response.ok) {
      console.log('✅ Login successful!')
      console.log('Token:', data.token ? 'Present' : 'Missing')
      console.log('User:', data.user?.name || 'Unknown')
    } else {
      console.log('❌ Login failed')
    }
    
  } catch (error) {
    console.error('Network error:', error)
  }
}

testLogin()