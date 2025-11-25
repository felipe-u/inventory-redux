import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { ProductId, UIOptions } from '../../types'

const DEFAULT_UI_OPTIONS: UIOptions = {
  isFormModalOpen: false,
  selectedProductId: -1,
  formModalMode: 'new',
  filters: { title: '', category: 'all', lowStock: false },
}

const initialState: UIOptions = (() => {
  const persistedState = localStorage.getItem('_redux_inventory_ui_state_')
  return persistedState ? JSON.parse(persistedState) : DEFAULT_UI_OPTIONS
})()

type ShowFormModalPayload = {
  show: boolean
  mode: 'new' | 'edit'
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

    setLowStockFilter: (state, action: PayloadAction<boolean>) => {
      state.filters.lowStock = action.payload
    },

    resetFilters: (state) => {
      state.filters = DEFAULT_UI_OPTIONS.filters
    },
  },
})

export default UISlice.reducer

export const {
  showFormModal,
  hideModal,
  setTitleFilter,
  setCategoryFilter,
  setLowStockFilter,
  resetFilters,
} = UISlice.actions
