import { useAppDispatch } from './store'
import { type Product } from '../types'
import { addNewProduct } from '../store/products/slice'

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

  return { addProduct }
}
