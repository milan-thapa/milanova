import { cookies } from 'next/headers'

const CSRF_SECRET = process.env.CSRF_SECRET || (() => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }
  // Fallback for environments without crypto.randomUUID
  return 'dev-csrf-secret-' + Math.random().toString(36).substring(2) + Date.now().toString(36)
})()
const CSRF_COOKIE_NAME = 'csrf_token'

// Generate a random token
function generateToken(): string {
  const array = new Uint8Array(32)
  crypto.getRandomValues(array)
  return Array.from(array, (byte) => byte.toString(16).padStart(2, '0')).join('')
}

// Simple HMAC-like signature
async function signToken(token: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(token + CSRF_SECRET)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('')
}

export async function generateCSRFToken(): Promise<string> {
  const token = generateToken()
  const signature = await signToken(token)
  const combinedToken = `${token}.${signature}`
  
  // Set cookie
  const cookieStore = await cookies()
  cookieStore.set(CSRF_COOKIE_NAME, combinedToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60, // 1 hour
    path: '/',
  })
  
  return combinedToken
}

export async function validateCSRFToken(token: string): Promise<boolean> {
  const cookieStore = await cookies()
  const storedToken = cookieStore.get(CSRF_COOKIE_NAME)?.value
  
  if (!storedToken || !token) return false
  
  // Timing-safe comparison to prevent timing attacks
  if (storedToken.length !== token.length) {
    return false
  }
  
  // Constant-time comparison
  let result = 0
  for (let i = 0; i < token.length; i++) {
    result |= storedToken.charCodeAt(i) ^ token.charCodeAt(i)
  }
  
  return result === 0
}
