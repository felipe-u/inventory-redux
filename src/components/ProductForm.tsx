export function ProductForm() {
  const mode = 'new'

  return (
    <div>
      <h2>{mode === 'new' ? 'New' : 'Edit'} Product</h2>
      <form>
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
    </div>
  )
}
