import { useAppDispatch } from './store'
import { type Product, type ProductId, type ProductWithId } from '../types'
import {
  addNewProduct,
  adjustStock,
  deleteProductById,
  editProduct,
  getProducts,
} from '../store/products/slice'

export const useProductsActions = () => {
  const dispatch = useAppDispatch()

  const loadProducts = () => {
    dispatch(getProducts())
  }

  const addProduct = (product: Product) => {
    dispatch(addNewProduct(product))
  }

  const deleteProduct = (id: ProductId) => {
    dispatch(deleteProductById(id))
  }

  const updateProduct = (product: ProductWithId) => {
    dispatch(editProduct(product))
  }

  const updateStock = (id: ProductId, adjust: number) => {
    dispatch(adjustStock({ id, adjust }))
  }

  return { loadProducts, addProduct, deleteProduct, updateProduct, updateStock }
}
