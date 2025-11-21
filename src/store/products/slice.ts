import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { products } from '../../mock/products'
import type { Product, ProductId } from '../../types'
import { generateRandomId } from '../../util'

export const productsSlice = createSlice({
  name: 'products',
  initialState: products,
  reducers: {
    addNewProduct: (state, action: PayloadAction<Product>) => {
      const id = generateRandomId()
      state.push({ id, ...action.payload })
    },
    deleteProductById: (state, action: PayloadAction<ProductId>) => {
      const id = action.payload
      return state.filter((product) => product.id !== id)
    },
  },
})

export default productsSlice.reducer

export const { addNewProduct, deleteProductById } = productsSlice.actions
