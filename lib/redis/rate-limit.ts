// Production-grade rate limiting using Redis
import { getRedisClient } from './client'

interface RateLimitResult {
  success: boolean
  remaining: number
  resetTime: number
}

/**
 * Rate limiting using Redis for production
 * Falls back to in-memory if Redis is not available
 */
export async function rateLimitRedis({
  identifier,
  limit = 100,
  window = 60000, // 1 minute in milliseconds
}: {
  identifier: string
  limit?: number
  window?: number
}): Promise<RateLimitResult> {
  try {
    const redis = getRedisClient()
    const key = `ratelimit:${identifier}`
    const now = Date.now()
    const windowStart = now - window

    // Use Redis pipeline for atomic operations
    const pipeline = redis.pipeline()
    
    // Remove entries outside the current window
    pipeline.zremrangebyscore(key, 0, windowStart)
    
    // Count current requests
    pipeline.zcard(key)
    
    // Add current request
    pipeline.zadd(key, now, `${now}-${Math.random()}`)
    
    // Set expiration
    pipeline.expire(key, Math.ceil(window / 1000))
    
    const results = await pipeline.exec()
    
    if (!results) {
      throw new Error('Redis pipeline failed')
    }

    const currentCount = results[1][1] as number
    const remaining = Math.max(0, limit - currentCount)
    const resetTime = now + window

    return {
      success: currentCount <= limit,
      remaining,
      resetTime,
    }
  } catch (error) {
    console.warn('Redis rate limiting failed, falling back to in-memory:', error)
    // Fallback to in-memory rate limiting
    return rateLimitMemory({ identifier, limit, window })
  }
}

/**
 * In-memory rate limiting (fallback)
 */
const memoryStore = new Map<string, { count: number; resetTime: number }>()

function rateLimitMemory({
  identifier,
  limit = 100,
  window = 60000,
}: {
  identifier: string
  limit?: number
  window?: number
}): RateLimitResult {
  const now = Date.now()
  const record = memoryStore.get(identifier)

  if (!record || now > record.resetTime) {
    const newRecord = {
      count: 1,
      resetTime: now + window,
    }
    memoryStore.set(identifier, newRecord)
    return {
      success: true,
      remaining: limit - 1,
      resetTime: newRecord.resetTime,
    }
  }

  if (record.count >= limit) {
    return {
      success: false,
      remaining: 0,
      resetTime: record.resetTime,
    }
  }

  record.count++
  return {
    success: true,
    remaining: limit - record.count,
    resetTime: record.resetTime,
  }
}

/**
 * Clean up expired memory records periodically
 */
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now()
    const keysToDelete: string[] = []
    memoryStore.forEach((record, key) => {
      if (now > record.resetTime) {
        keysToDelete.push(key)
      }
    })
    keysToDelete.forEach(key => memoryStore.delete(key))
  }, 60000) // Clean up every minute
}
