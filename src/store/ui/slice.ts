import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { ProductId } from '../../types'

const initialState = {
  isFormModalOpen: false,
  selectedProductId: -1,
  formModalMode: 'new',
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
    hideModal: () => initialState,
  },
})

export default UISlice.reducer

export const { showFormModal, hideModal } = UISlice.actions
