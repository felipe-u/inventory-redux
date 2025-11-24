import type { RootState } from '../types'

export const filtersSelector = (state: RootState) => {
  return state.ui.filters
}
