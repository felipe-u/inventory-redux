import type { RootState } from '../types'

export const selectProductById = (state: RootState, id: number) => {
  return state.products.find((product) => product.id === id)
}

export const filteredProducts = (state: RootState) => {
  return state.products.filter((product) =>
    product.title.toLocaleLowerCase().trim().includes(state.ui.filters.title)
  )
}
