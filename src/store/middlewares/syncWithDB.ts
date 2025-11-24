import type { Middleware } from '@reduxjs/toolkit'
import { loadProducts } from '../products/slice'

export const loadProductsMiddleware: Middleware =
  (store) => (next) => async (action) => {
    const { type } = action as { type: string }

    if (type === 'products/getProducts') {
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
