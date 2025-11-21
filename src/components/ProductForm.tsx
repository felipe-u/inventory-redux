import { useState } from 'react'
import { useProductsActions } from '../hooks/useProductsActions'

interface Props {
  hideFormModal: () => void
  showForm: { show: boolean; mode: string }
}

export function ProductForm({ hideFormModal, showForm }: Props) {
  const [thumbnailImg, setThumbnailImg] = useState('')
  const { addProduct } = useProductsActions()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const form = event.currentTarget
    const formData = new FormData(form)

    const title = formData.get('title') as string
    const category = formData.get('category') as string
    const price = Number(formData.get('price'))
    const stock = Number(formData.get('stock'))
    const thumbnail = formData.get('thumbnail') as string

    if (!title || !category || !price || !stock || !thumbnail) {
      return alert('Missing fields')
    }
    addProduct({ title, category, price, stock, thumbnail })
    form.reset()
    setThumbnailImg('')
  }

  return (
    <div className='product-form-container'>
      <h2>{showForm.mode === 'new' ? 'New' : 'Edit'} Product</h2>
      <form className='product-form' onSubmit={handleSubmit}>
        <div className='input-container'>
          <label htmlFor='title'>Name</label>
          <input name='title' type='text' placeholder='Product name' />
        </div>

        <div className='input-container'>
          <label htmlFor='category'>Category</label>
          <input name='category' type='text' placeholder='Product category' />
        </div>

        <div className='input-container'>
          <label htmlFor='price'>Price</label>
          <span> $</span>
          <input name='price' type='number' placeholder='9.99' />
        </div>

        <div className='input-container'>
          <label htmlFor='stock'>Stock</label>
          <input name='stock' type='number' placeholder='0' />
        </div>

        <div className='input-container'>
          <label htmlFor='thumbnail'>Thumbnail</label>
          <input
            name='thumbnail'
            type='text'
            placeholder='Image url'
            value={thumbnailImg}
            onChange={(e) => setThumbnailImg(e.currentTarget.value)}
          />
          {thumbnailImg && (
            <img
              src={thumbnailImg}
              alt='Please enter a valid url'
              style={{ width: '100px', height: '100px' }}
            />
          )}
        </div>
        <div className='btn-container'>
          <button type='submit'>Save</button>
          <button type='reset' onClick={hideFormModal}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
