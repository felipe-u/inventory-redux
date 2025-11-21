import { Filters } from './components/Filters'
import { ProductList } from './components/ProductList'
import './App.css'
import { ProductForm } from './components/ProductForm'
import { useState } from 'react'

function App() {
  const [showForm, setShowForm] = useState<{
    show: boolean
    mode: string
    productId: number | null
  }>({
    show: false,
    mode: 'new',
    productId: 0,
  })

  function showFormModal(mode: string, productId: number | null) {
    setShowForm({ show: true, mode: mode, productId: productId })
  }

  function hideFormModal() {
    setShowForm((prev) => ({ ...prev, show: false }))
  }

  return (
    <div className='container'>
      <h1>Inventory Redux Exercise</h1>
      <Filters />
      <ProductList showFormModal={showFormModal} />
      {showForm.show && (
        <ProductForm showForm={showForm} hideFormModal={hideFormModal} />
      )}
    </div>
  )
}

export default App
