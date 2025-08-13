// Simple in-memory cache for API responses
class SimpleCache {
  private cache = new Map<string, { data: any; timestamp: number; ttl: number }>()

  set(key: string, data: any, ttlMinutes: number = 5) {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl: ttlMinutes * 60 * 1000 // Convert to milliseconds
    })
  }

  get(key: string) {
    const item = this.cache.get(key)
    if (!item) return null

    const isExpired = Date.now() - item.timestamp > item.ttl
    if (isExpired) {
      this.cache.delete(key)
      return null
    }

    return item.data
  }

  clear() {
    this.cache.clear()
  }

  delete(key: string) {
    this.cache.delete(key)
  }
}

export const apiCache = new SimpleCache()

// Cache wrapper for API calls
export function withCache<T>(
  key: string,
  fn: () => Promise<T>,
  ttlMinutes: number = 5
): Promise<T> {
  const cached = apiCache.get(key)
  if (cached) {
    return Promise.resolve(cached)
  }

  return fn().then(result => {
    apiCache.set(key, result, ttlMinutes)
    return result
  })
}