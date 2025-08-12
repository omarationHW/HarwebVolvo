#!/usr/bin/env node

const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const prisma = new PrismaClient()

async function debugLoginError() {
  console.log('🔍 Debugging login error step by step...\n')
  
  try {
    // Step 1: Test database connection
    console.log('1️⃣ Testing database connection...')
    await prisma.$connect()
    console.log('✅ Database connected successfully')
    
    // Step 2: Find user
    console.log('\n2️⃣ Looking for super admin user...')
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
      console.log('❌ User not found!')
      return
    }
    
    console.log('✅ User found:')
    console.log('  - ID:', user.id)
    console.log('  - Name:', user.name)
    console.log('  - Role:', user.role)
    console.log('  - Active:', user.isActive)
    console.log('  - Organization:', user.organization?.name || 'None (Super Admin)')
    
    // Step 3: Test password
    console.log('\n3️⃣ Testing password validation...')
    const isValidPassword = await bcrypt.compare('12345678', user.password)
    console.log('✅ Password valid:', isValidPassword)
    
    if (!isValidPassword) {
      console.log('❌ Password validation failed!')
      return
    }
    
    // Step 4: Test JWT generation
    console.log('\n4️⃣ Testing JWT token generation...')
    const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key'
    console.log('JWT_SECRET exists:', !!JWT_SECRET)
    
    const tokenPayload = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      organizationId: user.organizationId
    }
    
    console.log('Token payload:', JSON.stringify(tokenPayload, null, 2))
    
    const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: '7d' })
    console.log('✅ JWT token generated successfully')
    console.log('Token length:', token.length)
    
    // Step 5: Test response structure
    console.log('\n5️⃣ Testing response structure...')
    const responseData = {
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        permissions: user.permissions,
        organization: user.organization ? {
          id: user.organization.id,
          name: user.organization.name,
          country: user.organization.country?.country || 'MX'
        } : null
      }
    }
    
    console.log('✅ Response structure created successfully')
    console.log('Response preview:', JSON.stringify(responseData, null, 2))
    
    console.log('\n🎉 All login steps completed without error!')
    console.log('The issue might be in the API endpoint itself.')
    
  } catch (error) {
    console.log('\n❌ Error found:')
    console.log('Error type:', error.constructor.name)
    console.log('Error message:', error.message)
    console.log('Error stack:', error.stack)
    
    // Check specific error types
    if (error.code) {
      console.log('Error code:', error.code)
    }
    
    if (error.meta) {
      console.log('Error meta:', JSON.stringify(error.meta, null, 2))
    }
    
  } finally {
    await prisma.$disconnect()
  }
}

debugLoginError()