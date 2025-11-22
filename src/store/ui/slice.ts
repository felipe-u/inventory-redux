import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { ProductId } from '../../types'

const initialState = {
  isFormModalOpen: false,
  selectedProductId: -1,
  formModalMode: 'new',
  filters: { title: '', category: 'all' },
}

type ShowFormModalPayload = {
  show: boolean
  mode: string
  productId: ProductId
}

export const UISlice = createSlice({
  name: 'ui',
  initialState: initialState,
  reducers: {
    showFormModal: (state, action: PayloadAction<ShowFormModalPayload>) => {
      state.isFormModalOpen = action.payload.show
      state.formModalMode = action.payload.mode
      state.selectedProductId = action.payload.productId
    },
    hideModal: (state) => {
      state.isFormModalOpen = false
      state.selectedProductId = -1
    },

    setTitleFilter: (state, action: PayloadAction<string>) => {
      state.filters.title = action.payload
    },
    setCategoryFilter: (state, action: PayloadAction<string>) => {
      state.filters.category = action.payload
    },
    resetFilters: () => initialState,
  },
})

export default UISlice.reducer

export const {
  showFormModal,
  hideModal,
  setTitleFilter,
  setCategoryFilter,
  resetFilters,
} = UISlice.actions
