import { useEffect, useState } from 'react'
import { useProductsActions } from '../hooks/useProductsActions'
import { useAppSelector } from '../hooks/store'
import { selectProductById } from '../store/products/selectors'
import type { Product } from '../types'
import { useUIActions } from '../hooks/useUIActions'

const initialFormState = {
  title: '',
  category: '',
  price: 0,
  stock: 0,
  thumbnail: '',
}

export function ProductForm() {
  const { addProduct, updateProduct } = useProductsActions()
  const { closeFormModal } = useUIActions()

  const uiOptions = useAppSelector((state) => state.ui)
  const productId = uiOptions.selectedProductId

  const product = useAppSelector((state) =>
    productId ? selectProductById(state, productId) : null
  )

  const [form, setForm] = useState<Product>(initialFormState)

  useEffect(() => {
    if (productId && product) {
      setForm(product)
    }
  }, [productId, product])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const { title, category, price, stock, thumbnail } = form
    if (!title.trim() || !category.trim() || !thumbnail.trim()) {
      alert('Missing fields')
      return
    }
    if (price <= 0) {
      alert('Price must be greater than zero')
      return
    }
    if (stock < 0) {
      alert("Stock can't be negative")
      return
    }

    if (uiOptions.formModalMode === 'new') {
      addProduct(form)
    } else {
      updateProduct({ id: productId!, ...form })
    }

    setForm(initialFormState)
    closeFormModal()
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = event.target
    setForm((prev) => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value,
    }))
  }

  return (
    <div className='product-form-container'>
      <h2>{uiOptions.formModalMode === 'new' ? 'New' : 'Edit'} Product</h2>
      <form className='product-form' onSubmit={handleSubmit}>
        <div className='input-container'>
          <label htmlFor='title'>Name</label>
          <input
            name='title'
            type='text'
            placeholder='Product name'
            value={form.title}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className='input-container'>
          <label htmlFor='category'>Category</label>
          <input
            name='category'
            type='text'
            placeholder='Product category'
            value={form.category}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className='input-container'>
          <label htmlFor='price'>Price</label>
          <span> $</span>
          <input
            name='price'
            type='number'
            placeholder='9.99'
            value={form.price}
            onChange={handleInputChange}
            required
            min={0}
            step={0.01}
          />
        </div>

        <div className='input-container'>
          <label htmlFor='stock'>Stock</label>
          <input
            name='stock'
            type='number'
            placeholder='0'
            value={form.stock}
            onChange={handleInputChange}
            required
            min={0}
            disabled={uiOptions.formModalMode === 'edit'}
          />
        </div>

        <div className='input-container'>
          <label htmlFor='thumbnail'>Thumbnail</label>
          <input
            name='thumbnail'
            type='text'
            placeholder='Image url'
            value={form?.thumbnail}
            onChange={handleInputChange}
            required
          />
          {form?.thumbnail && (
            <img
              src={form.thumbnail}
              alt='Please enter a valid url'
              style={{ width: '100px', height: '100px' }}
            />
          )}
        </div>
        <div className='btn-container'>
          <button type='submit'>Save</button>
          <button type='reset' onClick={closeFormModal}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
