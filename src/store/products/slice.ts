import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { products } from '../../mock/products'
import type { Product } from '../../types'
import { generateRandomId } from '../../util'

export const productsSlice = createSlice({
  name: 'products',
  initialState: products,
  reducers: {
    addNewProduct: (state, action: PayloadAction<Product>) => {
      const id = generateRandomId()
      state.push({ id, ...action.payload })
    },
  },
})

export default productsSlice.reducer

export const { addNewProduct } = productsSlice.actions
