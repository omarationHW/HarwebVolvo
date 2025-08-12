#!/usr/bin/env node

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function checkSuperAdmin() {
  try {
    console.log('🔍 Checking for Super Admin user...')
    
    const superAdmin = await prisma.user.findUnique({
      where: { email: 'superadmin@harweb.com' },
      include: {
        organization: true
      }
    })
    
    if (superAdmin) {
      console.log('✅ Super Admin found!')
      console.log('ID:', superAdmin.id)
      console.log('Name:', superAdmin.name)
      console.log('Role:', superAdmin.role)
      console.log('Organization ID:', superAdmin.organizationId)
      console.log('Organization:', superAdmin.organization?.name || 'None')
      console.log('Permissions:', JSON.stringify(superAdmin.permissions, null, 2))
    } else {
      console.log('❌ Super Admin not found!')
    }
    
    // Check all users
    console.log('\n📋 All users in database:')
    const allUsers = await prisma.user.findMany({
      select: {
        email: true,
        name: true,
        role: true,
        organizationId: true
      }
    })
    
    allUsers.forEach(user => {
      console.log(`- ${user.email} (${user.role}) - Org: ${user.organizationId || 'None'}`)
    })
    
  } catch (error) {
    console.error('Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

checkSuperAdmin()