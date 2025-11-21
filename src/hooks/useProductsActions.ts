import { useAppDispatch } from './store'
import { type Product, type ProductId, type ProductWithId } from '../types'
import {
  addNewProduct,
  adjustStock,
  deleteProductById,
  editProduct,
} from '../store/products/slice'

export const useProductsActions = () => {
  const dispatch = useAppDispatch()

  const addProduct = ({
    title,
    category,
    price,
    stock,
    thumbnail,
  }: Product) => {
    dispatch(addNewProduct({ title, category, price, stock, thumbnail }))
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

  return { addProduct, deleteProduct, updateProduct, updateStock }
}
