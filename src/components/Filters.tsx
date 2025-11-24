import { useState } from 'react'
import { useUIActions } from '../hooks/useUIActions'
import { useAppSelector } from '../hooks/store'
import { allCategories } from '../store/products/selectors'
import { filtersSelector } from '../store/ui/selectors'

export function Filters() {
  const { onSetTitleFilter, onSetCategoryFilter, onResetFilters } =
    useUIActions()

  const filters = useAppSelector((state) => filtersSelector(state))
  const categories = useAppSelector((state) => allCategories(state))

  const [titleInput, setTitleInput] = useState(filters.title)

  const handleNameFilter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      const cleanInput = titleInput.trim().toLowerCase()
      onSetTitleFilter(cleanInput)
    }
  }

  const handleReset = () => {
    onResetFilters()
    setTitleInput('')
  }

  return (
    <header>
      <div className='name-filter'>
        <h3>Search by name</h3>
        <input
          type='text'
          value={titleInput}
          onChange={(e) => setTitleInput(e.target.value)}
          onKeyDown={handleNameFilter}
        />
      </div>

      <div className='cat-filter'>
        <h3>Search by category</h3>

        {categories.length > 0 ? (
          <select
            name='category'
            id='category'
            value={filters.category}
            onChange={(e) => onSetCategoryFilter(e.target.value)}
          >
            <option value='all'>All</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        ) : (
          <p>No products yet</p>
        )}
      </div>
      <div className='stock-filter'>
        <h3>Products with low stock</h3>
        <button>Filter</button>
      </div>
      <button onClick={handleReset}>Reset Filters</button>
    </header>
  )
}
