import { createSlice } from '@reduxjs/toolkit'
import { products } from '../../mock/products'

export const productsSlice = createSlice({
  name: 'products',
  initialState: products,
  reducers: {},
})

export default productsSlice.reducer
