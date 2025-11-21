import { useAppDispatch } from './store'
import { type Product, type ProductId } from '../types'
import { addNewProduct, deleteProductById } from '../store/products/slice'

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

  return { addProduct, deleteProduct }
}
