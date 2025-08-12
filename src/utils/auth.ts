import * as jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { AuthUser } from '@/types'

const JWT_SECRET: string = process.env.JWT_SECRET || 'your-super-secret-jwt-key'
const JWT_EXPIRES_IN: string = process.env.JWT_EXPIRES_IN || '7d'

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10)
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash)
}

export function generateToken(user: AuthUser): string {
  const payload = {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    organizationId: user.organizationId,
    workOrderId: user.workOrderId
  }
  
  return (jwt.sign as any)(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })
}

export function verifyToken(token: string): AuthUser | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as AuthUser
    return decoded
  } catch (error) {
    return null
  }
}

export function getTokenFromRequest(request: Request): string | null {
  // First try Authorization header
  const authHeader = request.headers.get('authorization')
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7)
  }
  
  // Then try cookie
  const cookie = request.headers.get('cookie')
  if (cookie) {
    const match = cookie.match(/auth-token=([^;]+)/)
    if (match) {
      return match[1]
    }
  }
  
  return null
}