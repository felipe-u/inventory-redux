import type { Middleware } from '@reduxjs/toolkit'

export const persistUIOptionsMiddleware: Middleware =
  (store) => (next) => (action) => {
    const { type } = action as { type: string }
    next(action)

    if (type.startsWith('ui/')) {
      localStorage.setItem(
        '_redux_inventory_ui_state_',
        JSON.stringify(store.getState().ui)
      )
    }
  }
