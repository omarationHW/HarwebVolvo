#!/usr/bin/env node

const API_BASE = 'http://localhost:3000'

const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
}

function log(color, message) {
  console.log(`${color}${message}${colors.reset}`)
}

async function testAPI(endpoint, method = 'GET', body = null, expectedStatus = 200) {
  try {
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json'
      }
    }
    
    if (body) {
      options.body = JSON.stringify(body)
    }

    const response = await fetch(`${API_BASE}${endpoint}`, options)
    const data = await response.json()
    
    if (response.status === expectedStatus) {
      log(colors.green, `✅ ${method} ${endpoint} - Status: ${response.status}`)
      if (Array.isArray(data)) {
        log(colors.blue, `   📊 Returned ${data.length} items`)
      } else if (data.user) {
        log(colors.blue, `   👤 User: ${data.user.name || data.user.email || 'Unknown'}`)
      } else if (data.message) {
        log(colors.blue, `   💬 Message: ${data.message}`)
      }
      return { success: true, data }
    } else {
      log(colors.red, `❌ ${method} ${endpoint} - Status: ${response.status}`)
      log(colors.red, `   Error: ${data.error || JSON.stringify(data)}`)
      return { success: false, error: data }
    }
  } catch (error) {
    log(colors.red, `❌ ${method} ${endpoint} - Network Error`)
    log(colors.red, `   ${error.message}`)
    return { success: false, error: error.message }
  }
}

async function runTests() {
  log(colors.bold + colors.blue, '\n🧪 TESTING HARWEB DBO SYSTEM APIs')
  log(colors.yellow, '================================================\n')

  const tests = [
    // Authentication APIs (may fail if middleware is disabled)
    {
      name: 'Super Admin Login Test',
      endpoint: '/api/auth/login',
      method: 'POST',
      body: { email: 'superadmin@harweb.com', password: '12345678' },
      expectedStatus: 200
    },
    {
      name: 'Regular Admin Login Test',
      endpoint: '/api/auth/login',
      method: 'POST',
      body: { email: 'admin@panxea.com', password: '12345678' },
      expectedStatus: 200
    },
    {
      name: 'Register Test', 
      endpoint: '/api/auth/register',
      method: 'POST',
      body: {
        email: 'test@example.com',
        password: '12345678',
        name: 'Test User',
        organizationName: 'Test Organization',
        employerName: 'Test Company',
        country: 'MX'
      },
      expectedStatus: 201
    },

    // Super Admin API
    {
      name: 'Super Admin Hierarchy',
      endpoint: '/api/admin/hierarchy',
      method: 'GET',
      needsAuth: true
    },

    // Work Orders API
    {
      name: 'Work Orders List',
      endpoint: '/api/work-orders',
      method: 'GET'
    },

    // Employees API
    {
      name: 'Employees List',
      endpoint: '/api/employees', 
      method: 'GET'
    },

    // Payroll APIs
    {
      name: 'Payroll Calculate',
      endpoint: '/api/payroll/calculate',
      method: 'POST',
      body: {
        workOrderId: 'test-id',
        period: '2024-01',
        employees: []
      }
    },
    {
      name: 'Payroll Process',
      endpoint: '/api/payroll/process',
      method: 'POST', 
      body: {
        workOrderId: 'test-id',
        period: '2024-01'
      }
    }
  ]

  let passed = 0
  let failed = 0

  for (const test of tests) {
    log(colors.yellow, `\n🔍 Testing: ${test.name}`)
    const result = await testAPI(
      test.endpoint,
      test.method,
      test.body,
      test.expectedStatus
    )
    
    if (result.success) {
      passed++
    } else {
      failed++
    }
    
    // Wait a bit between requests
    await new Promise(resolve => setTimeout(resolve, 100))
  }

  // Summary
  log(colors.yellow, '\n================================================')
  log(colors.bold + colors.blue, '📊 TEST SUMMARY')
  log(colors.green, `✅ Passed: ${passed}`)
  log(colors.red, `❌ Failed: ${failed}`)
  log(colors.blue, `📈 Success Rate: ${Math.round(passed / (passed + failed) * 100)}%`)

  if (failed > 0) {
    log(colors.yellow, '\n💡 Note: Some failures are expected if authentication is disabled')
    log(colors.yellow, '   or if APIs are not fully implemented yet.')
  }

  log(colors.yellow, '\n🎯 Next steps:')
  log(colors.blue, '   1. Check http://localhost:3000/dashboard for UI')
  log(colors.blue, '   2. Review TESTING_GUIDE.md for complete verification')
  log(colors.blue, '   3. Verify database with: psql -U postgres -d harweb_dbo -c "\\dt"')
}

// Check if server is running first
async function checkServer() {
  try {
    const response = await fetch(`${API_BASE}/dashboard`)
    if (response.status === 200 || response.status === 307) {
      log(colors.green, '✅ Server is running on http://localhost:3000')
      return true
    }
  } catch (error) {
    log(colors.red, '❌ Server is not running on http://localhost:3000')
    log(colors.yellow, '💡 Start server with: npm run dev')
    return false
  }
}

// Main execution
async function main() {
  const serverRunning = await checkServer()
  if (serverRunning) {
    await runTests()
  }
}

main().catch(console.error)