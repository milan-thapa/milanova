// Redis client configuration for production caching and rate limiting
import { Redis } from 'ioredis'

let redis: Redis | null = null

/**
 * Get Redis client instance (singleton pattern)
 */
export function getRedisClient(): Redis {
  if (!redis) {
    const redisUrl = process.env.REDIS_URL || process.env.UPSTASH_REDIS_REST_URL
    
    if (!redisUrl) {
      console.warn('Redis URL not configured, falling back to in-memory operations')
      // Return a mock client for development
      return createMockRedis()
    }

    redis = new Redis(redisUrl, {
      maxRetriesPerRequest: 3,
      retryStrategy: (times: number) => {
        const delay = Math.min(times * 50, 2000)
        return delay
      },
      enableReadyCheck: true,
    })

    redis.on('error', (error: Error) => {
      console.error('Redis Client Error:', error)
    })

    redis.on('connect', () => {
      console.log('Redis Client Connected')
    })
  }

  return redis
}

/**
 * Create a mock Redis client for development/testing
 */
function createMockRedis(): Redis {
  const mock = {
    get: async (key: string) => null,
    set: async (key: string, value: string, mode?: string, duration?: number) => 'OK',
    del: async (key: string) => 1,
    incr: async (key: string) => 1,
    incrby: async (key: string, amount: number) => amount,
    expire: async (key: string, seconds: number) => 1,
    ttl: async (key: string) => -1,
    exists: async (key: string) => 0,
    flushdb: async () => 'OK',
    disconnect: async () => 'OK',
    on: (event: string, callback: Function) => mock,
  } as any

  return mock
}

/**
 * Close Redis connection
 */
export async function closeRedisConnection(): Promise<void> {
  if (redis) {
    await redis.quit()
    redis = null
  }
}

/**
 * Health check for Redis connection
 */
export async function checkRedisHealth(): Promise<boolean> {
  try {
    const client = getRedisClient()
    await client.ping()
    return true
  } catch (error) {
    console.error('Redis health check failed:', error)
    return false
  }
}
