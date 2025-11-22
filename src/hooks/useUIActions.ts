import {
  hideModal,
  resetFilters,
  setCategoryFilter,
  setTitleFilter,
  showFormModal,
} from '../store/ui/slice'
import type { ProductId } from '../types'
import { useAppDispatch } from './store'

export const useUIActions = () => {
  const dispatch = useAppDispatch()

  const openFormModal = (show: boolean, mode: string, productId: ProductId) => {
    dispatch(showFormModal({ show, mode, productId }))
  }

  const closeFormModal = () => {
    dispatch(hideModal())
  }

  const onSetTitleFilter = (title: string) => {
    dispatch(setTitleFilter(title))
  }

  const onSetCategoryFilter = (category: string) => {
    dispatch(setCategoryFilter(category))
  }

  const onResetFilters = () => {
    dispatch(resetFilters())
  }

  return {
    openFormModal,
    closeFormModal,
    onSetTitleFilter,
    onSetCategoryFilter,
    onResetFilters,
  }
}
