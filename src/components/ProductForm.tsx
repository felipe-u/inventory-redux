interface Props {
  hideFormModal: () => void
  showForm: { show: boolean; mode: string }
}

export function ProductForm({ hideFormModal, showForm }: Props) {
  return (
    <div className='product-form-container'>
      <h2>{showForm.mode === 'new' ? 'New' : 'Edit'} Product</h2>
      <form className='product-form'>
        <div className='input-container'>
          <label htmlFor='name'>Name</label>
          <input type='text' placeholder='Product name' />
        </div>

        <div className='input-container'>
          <label htmlFor='category'>Category</label>
          <input type='text' placeholder='Product category' />
        </div>

        <div className='input-container'>
          <label htmlFor='price'>Price</label>
          <span> $</span>
          <input type='number' placeholder='9.99' />
        </div>
      </form>

      <div className='btn-container'>
        <button>Save</button>
        <button onClick={hideFormModal}>Cancel</button>
      </div>
    </div>
  )
}
