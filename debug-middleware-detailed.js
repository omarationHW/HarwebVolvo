#!/usr/bin/env node

const jwt = require('jsonwebtoken')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function debugMiddlewareDetailed() {
  console.log('🔍 DETAILED MIDDLEWARE DEBUG\n')
  
  try {
    // Step 1: Get JWT_SECRET from same source as middleware
    const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production'
    console.log('1️⃣ JWT_SECRET Configuration:')
    console.log('Secret length:', JWT_SECRET.length)
    console.log('Secret preview:', JWT_SECRET.substring(0, 20) + '...')
    
    // Step 2: Get user from database exactly like login endpoint
    console.log('\n2️⃣ Database User Lookup:')
    const user = await prisma.user.findUnique({
      where: { email: 'superadmin@harweb.com' },
      include: {
        organization: {
          include: {
            country: true
          }
        }
      }
    })
    
    if (!user) {
      console.log('❌ User not found')
      return
    }
    
    console.log('User found:', user.name)
    console.log('User role:', user.role)
    console.log('User organizationId:', user.organizationId)
    
    // Step 3: Create token exactly like generateToken function
    console.log('\n3️⃣ Token Generation (exact replica of auth.ts):')
    const tokenPayload = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      organizationId: user.organizationId,
      workOrderId: user.workOrderId || undefined
    }
    
    console.log('Token payload:', JSON.stringify(tokenPayload, null, 2))
    
    const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: '7d' })
    console.log('Token created, length:', token.length)
    
    // Step 4: Verify token exactly like verifyToken function
    console.log('\n4️⃣ Token Verification (exact replica of auth.ts):')
    try {
      const decoded = jwt.verify(token, JWT_SECRET)
      console.log('✅ Token verified successfully')
      console.log('Decoded payload:', JSON.stringify(decoded, null, 2))
      
      // Step 5: Check if this matches what middleware expects
      console.log('\n5️⃣ Middleware Expectations Check:')
      console.log('User ID:', decoded.id)
      console.log('User Role:', decoded.role)
      console.log('Organization ID:', decoded.organizationId)
      
      if (decoded.role === 'SUPER_ADMIN') {
        console.log('✅ User is SUPER_ADMIN - should have access to /api/admin/*')
      } else {
        console.log('❌ User is not SUPER_ADMIN')
      }
      
    } catch (verifyError) {
      console.log('❌ Token verification failed:', verifyError.message)
    }
    
    // Step 6: Test actual API call with this token
    console.log('\n6️⃣ Testing actual API call:')
    const testResponse = await fetch('http://localhost:3000/api/admin/test-auth', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    
    console.log('API Response status:', testResponse.status)
    const responseData = await testResponse.text()
    console.log('API Response:', responseData)
    
  } catch (error) {
    console.error('❌ Debug error:', error)
    console.error('Stack:', error.stack)
  } finally {
    await prisma.$disconnect()
  }
}

debugMiddlewareDetailed()