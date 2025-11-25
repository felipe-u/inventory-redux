import { useEffect, useState } from 'react'

export function useDebounce<T>(value: T, delay = 500) {
  const [deboncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => clearTimeout(timer)
  }, [value, delay])

  return deboncedValue
}
