#!/usr/bin/env node

const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function testLoginDirect() {
  try {
    console.log('🔍 Testing login logic directly...')
    
    // Find user by email (simulating the API logic)
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
    
    if (!user || !user.isActive) {
      console.log('❌ User not found or inactive')
      return
    }
    
    console.log('✅ User found:', user.name, '(', user.role, ')')
    console.log('Organization:', user.organization?.name || 'None')
    
    // Test password
    const isValidPassword = await bcrypt.compare('12345678', user.password)
    console.log('Password valid:', isValidPassword)
    
    // Show organization structure
    if (user.organization) {
      console.log('Organization structure:')
      console.log('- Organization ID:', user.organization.id)
      console.log('- Country Config:', user.organization.country?.name || 'None')
    } else {
      console.log('✅ Super Admin - No organization (as expected)')
    }
    
  } catch (error) {
    console.error('Error:', error)
    console.error('Stack:', error.stack)
  } finally {
    await prisma.$disconnect()
  }
}

testLoginDirect()