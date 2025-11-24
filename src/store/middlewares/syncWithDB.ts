import type { Middleware } from '@reduxjs/toolkit'
import { loadProducts } from '../products/slice'

export const syncWithDBMiddleware: Middleware =
  (store) => (next) => async (action) => {
    if (action.type === 'products/getProducts') {
      try {
        const res = await fetch('https://dummyjson.com/products')
        const data = await res.json()
        store.dispatch(loadProducts(data.products))
      } catch {
        throw new Error('Error fetching products')
      }
      return
    }
    return next(action)
  }
