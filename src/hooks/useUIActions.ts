import { hideModal, setTitleFilter, showFormModal } from '../store/ui/slice'
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

  return { openFormModal, closeFormModal, onSetTitleFilter }
}
