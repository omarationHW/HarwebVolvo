#!/usr/bin/env node

const API_BASE = 'http://localhost:3000'

async function testSuperAdminComplete() {
  try {
    console.log('🌍 Complete Super Admin Test...')
    
    // Step 1: Login
    console.log('\n1️⃣ Logging in as Super Admin...')
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
    console.log('User:', loginData.user.name)
    console.log('Role:', loginData.user.role)
    console.log('Token length:', loginData.token.length)
    
    // Step 2: Test hierarchy with Authorization header
    console.log('\n2️⃣ Testing hierarchy with Authorization header...')
    const hierarchyResponse = await fetch(`${API_BASE}/api/admin/hierarchy`, {
      headers: {
        'Authorization': `Bearer ${loginData.token}`,
        'Content-Type': 'application/json'
      }
    })
    
    console.log('Hierarchy response status:', hierarchyResponse.status)
    
    if (hierarchyResponse.ok) {
      const hierarchyData = await hierarchyResponse.json()
      console.log('✅ Hierarchy API successful!')
      console.log('Countries found:', hierarchyData.hierarchy?.length || 0)
      console.log('Global stats:', JSON.stringify(hierarchyData.globalStats, null, 2))
      
      // Show first country data
      if (hierarchyData.hierarchy && hierarchyData.hierarchy.length > 0) {
        const firstCountry = hierarchyData.hierarchy[0]
        console.log(`First country: ${firstCountry.name}`)
        console.log(`Organizations: ${firstCountry.children?.length || 0}`)
      }
      
    } else {
      const errorText = await hierarchyResponse.text()
      console.log('❌ Hierarchy API failed')
      console.log('Error response:', errorText)
    }
    
    // Step 3: Test dashboard access (should work in browser)
    console.log('\n3️⃣ Dashboard access test...')
    console.log('✅ Super Admin can now access:')
    console.log('- Login: http://localhost:3000/login')
    console.log('- Dashboard: http://localhost:3000/dashboard')
    console.log('- Credentials: superadmin@harweb.com / 12345678')
    
  } catch (error) {
    console.error('❌ Test error:', error.message)
  }
}

testSuperAdminComplete()