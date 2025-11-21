import { useAppSelector } from '../hooks/store'
import { useProductsActions } from '../hooks/useProductsActions'
import type { ProductId } from '../types'

interface Props {
  showFormModal: (mode: string, productId: ProductId | null) => void
}

export function ProductList({ showFormModal }: Props) {
  const products = useAppSelector((state) => state.products)
  const { deleteProduct, updateStock } = useProductsActions()

  const handleStockAdj = (
    productId: ProductId,
    prevStock: number,
    adjust: number
  ) => {
    if (adjust === -1 && prevStock === 0) {
      alert("Stock can't be negative")
      return
    }
    updateStock(productId, adjust)
  }

  return (
    <section>
      <table className='products-table'>
        <thead>
          <tr>
            <th>Id</th>
            <th>Image</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr className='new-product-row'>
            <td colSpan={7}>
              <button onClick={() => showFormModal('new', null)}>
                New Product
              </button>
            </td>
          </tr>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>
                <img src={product.thumbnail} alt={product.title} />
              </td>
              <td>{product.title}</td>
              <td>{product.category}</td>
              <td>${product.price}</td>
              <td>
                <button
                  onClick={() => handleStockAdj(product.id, product.stock, -1)}
                >
                  -
                </button>
                {product.stock}
                <button onClick={() => updateStock(product.id, 1)}>+</button>
              </td>
              <td>
                <button onClick={() => showFormModal('edit', product.id)}>
                  Edit
                </button>
                <button onClick={() => deleteProduct(product.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
