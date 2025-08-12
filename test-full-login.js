#!/usr/bin/env node

const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { z } = require('zod')

const prisma = new PrismaClient()

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
})

async function simulateLoginEndpoint() {
  console.log('🔍 Simulating full login endpoint...\n')
  
  try {
    // Step 1: Parse request body (simulate)
    console.log('1️⃣ Parsing request body...')
    const body = { email: 'superadmin@harweb.com', password: '12345678' }
    const { email, password } = loginSchema.parse(body)
    console.log('✅ Request body parsed successfully')
    
    // Step 2: Find user by email
    console.log('\n2️⃣ Finding user by email...')
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        organization: {
          include: {
            country: true
          }
        }
      }
    })
    
    if (!user || !user.isActive) {
      console.log('❌ User not found or inactive')
      return
    }
    console.log('✅ User found and active')
    
    // Step 3: Verify password
    console.log('\n3️⃣ Verifying password...')
    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) {
      console.log('❌ Invalid password')
      return
    }
    console.log('✅ Password valid')
    
    // Step 4: Generate JWT token
    console.log('\n4️⃣ Generating JWT token...')
    const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key'
    
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
    console.log('✅ JWT token generated')
    
    // Step 5: Create response data
    console.log('\n5️⃣ Creating response data...')
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
    
    console.log('✅ Response data created')
    console.log('Response user:', responseData.user.name, '(', responseData.user.role, ')')
    console.log('Organization:', responseData.user.organization?.name || 'None')
    
    console.log('\n🎉 Full login simulation completed successfully!')
    console.log('The API endpoint should work. The issue might be elsewhere.')
    
  } catch (error) {
    console.log('\n❌ Error during login simulation:')
    console.log('Error type:', error.constructor.name)
    console.log('Error message:', error.message)
    console.log('Error stack:', error.stack)
    
    // Check for specific error types
    if (error instanceof z.ZodError) {
      console.log('Zod validation error:', error.issues)
    }
    
    if (error.code) {
      console.log('Database error code:', error.code)
    }
    
  } finally {
    await prisma.$disconnect()
  }
}

simulateLoginEndpoint()