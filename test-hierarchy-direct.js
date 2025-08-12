#!/usr/bin/env node

const API_BASE = 'http://localhost:3000'

async function testHierarchy() {
  try {
    console.log('🌍 Testing Super Admin Hierarchy API with Cookie...')
    
    // Step 1: Login and get cookie
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
    
    // Get the cookie from the response
    const cookies = loginResponse.headers.get('set-cookie')
    console.log('Cookies received:', cookies)
    
    // Step 2: Test Hierarchy API with cookie
    console.log('\n🔍 Testing Hierarchy API with cookie...')
    const hierarchyResponse = await fetch(`${API_BASE}/api/admin/hierarchy`, {
      headers: {
        'Cookie': cookies || `auth-token=${loginData.token}`
      }
    })
    
    console.log('Hierarchy API Status:', hierarchyResponse.status)
    
    if (hierarchyResponse.ok) {
      const hierarchyData = await hierarchyResponse.json()
      console.log('✅ Hierarchy API successful!')
      console.log('Global Stats:', hierarchyData.globalStats)
      console.log('Countries found:', hierarchyData.hierarchy.length)
    } else {
      const errorData = await hierarchyResponse.json()
      console.log('❌ Hierarchy API failed:', errorData)
    }
    
  } catch (error) {
    console.error('Network error:', error)
  }
}

testHierarchy()