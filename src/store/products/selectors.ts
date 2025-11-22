import type { RootState } from '../types'

export const selectProductById = (state: RootState, id: number) => {
  return state.products.find((product) => product.id === id)
}

export const filteredProducts = (state: RootState) => {
  return state.products.filter(
    (product) =>
      product.title
        .toLocaleLowerCase()
        .trim()
        .includes(state.ui.filters.title) &&
      (state.ui.filters.category === 'all'
        ? product.category
        : product.category === state.ui.filters.category)
  )
}

export const allCategories = (state: RootState) => {
  return [
    ...new Set(
      state.products.map((product) => product.category).filter(Boolean)
    ),
  ]
}
