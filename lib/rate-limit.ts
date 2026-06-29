// Simple in-memory rate limiter
// For production, consider using Redis or a dedicated rate limiting service

interface RateLimitStore {
  count: number
  resetTime: number
}

const store = new Map<string, RateLimitStore>()

export function rateLimit({
  identifier,
  limit = 100,
  window = 60000, // 1 minute in milliseconds
}: {
  identifier: string
  limit?: number
  window?: number
}): { success: boolean; remaining: number; resetTime: number } {
  const now = Date.now()
  const record = store.get(identifier)

  if (!record || now > record.resetTime) {
    // Create new record or reset expired one
    const newRecord: RateLimitStore = {
      count: 1,
      resetTime: now + window,
    }
    store.set(identifier, newRecord)
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

// Clean up expired records periodically
setInterval(() => {
  const now = Date.now()
  const keysToDelete: string[] = []
  store.forEach((record, key) => {
    if (now > record.resetTime) {
      keysToDelete.push(key)
    }
  })
  keysToDelete.forEach(key => store.delete(key))
}, 60000) // Clean up every minute
