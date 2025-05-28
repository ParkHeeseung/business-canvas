import { useEffect, useState } from 'react'

export type StorageMode = 'local-storage' | 'in-memory'

const storageMode: StorageMode = import.meta.env.VITE_STORAGE ?? 'in-memory'

const memoryStore = new Map<string, unknown>()

export const useStorage = <T>(key: string, defaultValue: T) => {
  const [value, setValue] = useState<T>(() => {
    try {
      if (storageMode === 'local-storage') {
        const stored = localStorage.getItem(key)
        return stored ? (JSON.parse(stored) as T) : defaultValue
      } else {
        const stored = memoryStore.get(key)
        return stored !== undefined ? (stored as T) : defaultValue
      }
    } catch (e) {
      console.error('Failed to load initial value:', e)
      return defaultValue
    }
  })

  useEffect(() => {
    try {
      if (storageMode === 'local-storage') {
        localStorage.setItem(key, JSON.stringify(value))
      } else {
        memoryStore.set(key, value)
      }
    } catch (e) {
      console.error('Failed to save value:', e)
    }
  }, [key, value])

  return [value, setValue] as const
}
