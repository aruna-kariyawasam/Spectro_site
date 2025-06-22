// File: lib/jwt.ts
import jwt from 'jsonwebtoken'

const SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key'

/**
 * Generate a JWT token with 1-hour expiration
 */
export function generateToken(payload: object): string {
  return jwt.sign(payload, SECRET, { expiresIn: '1h' })
}

/**
 * Verify a JWT token and return the decoded payload or null if invalid
 */
export function verifyToken(token: string): any {
  try {
    return jwt.verify(token, SECRET)
  } catch (err) {
    return null
  }
}
