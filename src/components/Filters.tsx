import { useState } from 'react'
import { useUIActions } from '../hooks/useUIActions'

export function Filters() {
  const { onSetTitleFilter } = useUIActions()
  const [titleInput, setTitleInput] = useState('')

  const hanldeNameFilter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onSetTitleFilter(titleInput.toLocaleLowerCase().trim())
    }
  }

  return (
    <header>
      <div className='name-filter'>
        <h3>Search by name</h3>
        <input
          type='text'
          value={titleInput}
          onChange={(e) => setTitleInput(e.target.value)}
          onKeyDown={hanldeNameFilter}
        />
      </div>
      <div className='cat-filter'>
        <h3>Search by category</h3>
        <select name='category' id='category'>
          <option value=''></option>
        </select>
      </div>
      <div className='stock-filter'>
        <h3>Products with low stock</h3>
        <button>Filter</button>
      </div>
    </header>
  )
}
