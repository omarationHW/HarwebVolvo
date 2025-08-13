import { Pool } from 'pg'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
})

export async function findUserByEmail(email: string) {
  const client = await pool.connect()
  try {
    const result = await client.query(
      'SELECT id, email, password, name, role, "organizationId" as organization_id, "workOrderId" as work_order_id FROM users WHERE email = $1 AND "isActive" IS NOT FALSE',
      [email]
    )
    return result.rows[0] || null
  } finally {
    client.release()
  }
}

export { pool }

// forcing push