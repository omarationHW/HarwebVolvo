#!/usr/bin/env node

const API_BASE = 'http://localhost:3000'

async function testSuperAdmin() {
  try {
    console.log('🌍 Testing Super Admin Login...')
    
    // Step 1: Login as Super Admin
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
    
    console.log('Login Status:', loginResponse.status)
    
    if (!loginResponse.ok) {
      const errorData = await loginResponse.json()
      console.log('❌ Login failed:', errorData)
      return
    }
    
    const loginData = await loginResponse.json()
    console.log('✅ Login successful!')
    console.log('User:', loginData.user.name)
    console.log('Role:', loginData.user.role)
    console.log('Organization:', loginData.user.organization || 'None (Super Admin)')
    
    // Step 2: Test Hierarchy API
    console.log('\n🔍 Testing Hierarchy API...')
    const hierarchyResponse = await fetch(`${API_BASE}/api/admin/hierarchy`, {
      headers: {
        'Authorization': `Bearer ${loginData.token}`
      }
    })
    
    console.log('Hierarchy API Status:', hierarchyResponse.status)
    
    if (hierarchyResponse.ok) {
      const hierarchyData = await hierarchyResponse.json()
      console.log('✅ Hierarchy API successful!')
      console.log('Global Stats:', hierarchyData.globalStats)
      console.log('Countries found:', hierarchyData.hierarchy.length)
      
      hierarchyData.hierarchy.forEach(country => {
        console.log(`📍 ${country.name}: ${country.statistics.organizations} orgs, ${country.statistics.employees} employees`)
      })
    } else {
      const errorData = await hierarchyResponse.json()
      console.log('❌ Hierarchy API failed:', errorData)
    }
    
  } catch (error) {
    console.error('Network error:', error)
  }
}

testSuperAdmin()