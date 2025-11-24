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

export const syncWithDBMiddleware: Middleware = (store) => (next) => async (action) => {
  const { type, payload } = action
  next(action)

  if (type === 'products/addNewProduct') {
    try {
      const res = await fetch('https://dummyjson.com/products/add', {
        method: 'POST',
        body: JSON.stringify({
          title: payload.title,
          category: payload.category,
          price: payload.price,
          stock: payload.stock,
          thumbnail: payload.thumbnail,
        }),
        headers: { 'Content-Type': 'application/json' },
      })
      if (res.ok) {
        alert('Product created')
      }
    } catch {
      alert('Error creating product')
    }
  }

  if (type === 'products/deleteProductById') {
    try {
      const res = await fetch(`https://dummyjson.com/products/${payload}`, {
        method: 'DELETE',
      })
      if (res.ok) {
        alert('Product deleted')
      }
    } catch {
      alert('Error deleting product')
    }
  }

  if (type === 'products/editProduct') {
    try {
      const res = await fetch(`https://dummyjson.com/products/${payload.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: payload.title,
          category: payload.category,
          price: payload.price,
          stock: payload.stock,
          thumbnail: payload.thumbnail,
        }),
      })
      if (res.ok) {
        alert('Product updated')
      }
    } catch {
      alert('Error uptading product')
    }
  }
}
