import { CloseButton, Dialog } from '@chakra-ui/react'
import { ProductForm } from './ProductForm'
import { useAppSelector } from '../hooks/store'
import { useUIActions } from '../hooks/useUIActions'

export function ProductFormModal() {
  const { closeFormModal } = useUIActions()
  const uiOptions = useAppSelector((state) => state.ui)

  return (
    <Dialog.Root open={uiOptions.isFormModalOpen} onOpenChange={closeFormModal}>
      <Dialog.Backdrop />

      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title fontSize='2xl'>
              {uiOptions.formModalMode === 'new'
                ? 'New Product'
                : 'Edit Product'}
            </Dialog.Title>
          </Dialog.Header>

          <Dialog.Body pt='4'>
            <ProductForm />
          </Dialog.Body>
          <Dialog.CloseTrigger asChild>
            <CloseButton size='sm' />
          </Dialog.CloseTrigger>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  )
}
