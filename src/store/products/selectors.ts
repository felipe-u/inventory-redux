import type { RootState } from '../types'

export const selectProductById = (state: RootState, id: number) => {
  return state.products.find((product) => product.id === id)
}
