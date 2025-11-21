import type { Middleware } from '@reduxjs/toolkit'

export const persistsMiddleware: Middleware = (store) => (next) => (action) => {
  next(action)
  localStorage.setItem(
    '_redux_inventory_state_',
    JSON.stringify(store.getState())
  )
}
