import { createClient } from '@supabase/supabase-js'
import { PrismaClient } from '@prisma/client'
import * as dotenv from 'dotenv'
import * as path from 'path'

// Load production environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env.production') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

const prisma = new PrismaClient()

async function migrateUsersToSupabaseAuth() {
  console.log('🚀 Starting user migration to Supabase Auth...')
  
  try {
    // Get all users from database
    const users = await prisma.user.findMany()
    console.log(`📊 Found ${users.length} users to migrate`)
    
    let successCount = 0
    let errorCount = 0
    
    for (const user of users) {
      try {
        // Create user in Supabase Auth
        const { data, error } = await supabase.auth.admin.createUser({
          email: user.email,
          password: '12345678', // Default password - users will need to reset
          email_confirm: true,
          user_metadata: {
            name: user.name,
            role: user.role,
            organizationId: user.organizationId
          }
        })
        
        if (error) {
          if (error.message.includes('already exists')) {
            console.log(`⚠️  User ${user.email} already exists in Supabase Auth`)
            successCount++
          } else {
            console.error(`❌ Error migrating ${user.email}:`, error.message)
            errorCount++
          }
        } else {
          console.log(`✅ Migrated user: ${user.email}`)
          successCount++
        }
      } catch (error) {
        console.error(`❌ Error migrating ${user.email}:`, error)
        errorCount++
      }
    }
    
    console.log('\n📊 Migration Summary:')
    console.log(`✅ Successfully migrated: ${successCount} users`)
    console.log(`❌ Failed to migrate: ${errorCount} users`)
    console.log('\n⚠️  All users have been set with password: 12345678')
    console.log('Users should reset their passwords on first login')
    
  } catch (error) {
    console.error('❌ Migration failed:', error)
  } finally {
    await prisma.$disconnect()
  }
}

// Run migration
migrateUsersToSupabaseAuth()