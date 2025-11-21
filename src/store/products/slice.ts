import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { DEFAULT_PRODUCTS } from '../../mock/products'
import type { Product, ProductId, ProductWithId } from '../../types'
import { generateRandomId } from '../../util'

type AdjustStockPayload = {
  id: ProductId
  adjust: number
}

const initialState: ProductWithId[] = (() => {
  const persistedState = localStorage.getItem('_redux_inventory_state_')
  return persistedState ? JSON.parse(persistedState).products : DEFAULT_PRODUCTS
})()

export const productsSlice = createSlice({
  name: 'products',
  initialState: initialState,
  reducers: {
    addNewProduct: (state, action: PayloadAction<Product>) => {
      const id = generateRandomId()
      state.push({ id, ...action.payload })
    },
    deleteProductById: (state, action: PayloadAction<ProductId>) => {
      const id = action.payload
      return state.filter((product) => product.id !== id)
    },
    editProduct: (state, action: PayloadAction<ProductWithId>) => {
      const index = state.findIndex(
        (product) => product.id === action.payload.id
      )
      if (index === -1) return
      state[index] = action.payload
    },
    adjustStock: (state, action: PayloadAction<AdjustStockPayload>) => {
      const index = state.findIndex(
        (product) => product.id === action.payload.id
      )
      if (index === -1) return
      state[index].stock += action.payload.adjust
    },
  },
})

export default productsSlice.reducer

export const { addNewProduct, deleteProductById, editProduct, adjustStock } =
  productsSlice.actions
