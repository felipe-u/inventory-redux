import { configureStore, Tuple } from '@reduxjs/toolkit'
import productsReducer from './products/slice'
import { persistsMiddleware } from './middlewares/persists'

export const store = configureStore({
  reducer: {
    products: productsReducer,
  },
  middleware: () => new Tuple(persistsMiddleware),
})
