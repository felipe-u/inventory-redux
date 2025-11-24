import { configureStore, Tuple } from '@reduxjs/toolkit'
import productsReducer from './products/slice'
import UIReducer from './ui/slice'
import { persistUIOptionsMiddleware } from './middlewares/persists'
import {
  loadProductsMiddleware,
  syncWithDBMiddleware,
} from './middlewares/syncWithDB'

export const store = configureStore({
  reducer: {
    products: productsReducer,
    ui: UIReducer,
  },
  middleware: () =>
    new Tuple(
      persistUIOptionsMiddleware,
      loadProductsMiddleware,
      syncWithDBMiddleware
    ),
})
