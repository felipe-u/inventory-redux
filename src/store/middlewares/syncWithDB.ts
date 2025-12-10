import type { Middleware } from '@reduxjs/toolkit'
import { loadProducts, rollbackProduct } from '../products/slice'
import { toast } from 'sonner'
import type { Product, ProductId, ProductWithId } from '../../types'

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

export const syncWithDBMiddleware: Middleware =
  (store) => (next) => async (action) => {
    const { type, payload } = action as { type: string; payload: unknown }
    const prevState = store.getState()

    next(action)

    if (type === 'products/addNewProduct') {
      const p = payload as Product
      try {
        const res = await fetch('https://dummyjson.com/products/add', {
          method: 'POST',
          body: JSON.stringify({
            title: p.title,
            category: p.category,
            price: p.price,
            stock: p.stock,
            thumbnail: p.thumbnail,
          }),
          headers: { 'Content-Type': 'application/json' },
        })
        if (!res.ok) throw new Error()
        toast.success('Product created')
      } catch {
        toast.error('Error creating product')
      }
    }

    if (type === 'products/deleteProductById') {
      const productId = payload as ProductId
      const product = prevState.products.find(
        (product: ProductWithId) => product.id === productId
      )
      const index = prevState.products.findIndex(
        (product: ProductWithId) => product.id === productId
      )
      try {
        const res = await fetch(`https://dummyjson.com/products/${productId}`, {
          method: 'DELETE',
        })
        if (!res.ok) throw new Error()
        toast.success('Product deleted')
      } catch {
        toast.error('Error deleting product')
        if (product) store.dispatch(rollbackProduct({ product, index }))
      }
    }

    if (type === 'products/editProduct') {
      const p = payload as ProductWithId
      try {
        const res = await fetch(`https://dummyjson.com/products/${p.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: p.title,
            category: p.category,
            price: p.price,
            stock: p.stock,
            thumbnail: p.thumbnail,
          }),
        })
        if (!res.ok) throw new Error()
        toast.success('Product updated')
      } catch {
        toast.error('Error uptading product')
      }
    }
  }
