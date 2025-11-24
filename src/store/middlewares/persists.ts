import type { Middleware } from '@reduxjs/toolkit'

export const persistUIOptionsMiddleware: Middleware =
  (store) => (next) => (action) => {
    next(action)
    localStorage.setItem(
      '_redux_inventory_ui_state_',
      JSON.stringify(store.getState().ui)
    )
  }
