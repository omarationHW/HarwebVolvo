import { useState, useEffect, useCallback } from 'react'

interface FetchState<T> {
  data: T | null
  loading: boolean
  error: string | null
  refetch: () => void
}

const cache = new Map<string, { data: any; timestamp: number }>()
const CACHE_TTL = 5 * 60 * 1000 // 5 minutes

export function useOptimizedFetch<T>(
  url: string,
  options?: RequestInit,
  deps: any[] = []
): FetchState<T> {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      // Check cache first
      const cached = cache.get(url)
      if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
        setData(cached.data)
        setLoading(false)
        return
      }

      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      
      // Cache the result
      cache.set(url, { data: result, timestamp: Date.now() })
      
      setData(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }, [url, ...deps])

  const refetch = useCallback(() => {
    cache.delete(url) // Clear cache for this URL
    fetchData()
  }, [fetchData, url])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return { data, loading, error, refetch }
}

// Hook for mutations with optimistic updates
export function useOptimizedMutation<T, P>(
  mutationFn: (params: P) => Promise<T>,
  options?: {
    onSuccess?: (data: T) => void
    onError?: (error: Error) => void
    invalidateCache?: string[]
  }
) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const mutate = useCallback(async (params: P) => {
    try {
      setLoading(true)
      setError(null)
      
      const result = await mutationFn(params)
      
      // Invalidate cache for specified URLs
      options?.invalidateCache?.forEach(url => cache.delete(url))
      
      options?.onSuccess?.(result)
      return result
    } catch (err) {
      const error = err instanceof Error ? err : new Error('An error occurred')
      setError(error.message)
      options?.onError?.(error)
      throw error
    } finally {
      setLoading(false)
    }
  }, [mutationFn, options])

  return { mutate, loading, error }
}