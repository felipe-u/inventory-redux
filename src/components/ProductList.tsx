import { store } from '../store'

interface Props {
  showFormModal: (mode: string) => void
}

export function ProductList({ showFormModal }: Props) {
  const products = store.getState().products

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
              <button onClick={() => showFormModal('new')}>New Product</button>
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
                <button>-</button>
                {product.stock}
                <button>+</button>
              </td>
              <td>
                <button onClick={() => showFormModal('edit')}>Edit</button>
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
