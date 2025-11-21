import { Filters } from './components/Filters'
import { ProductList } from './components/ProductList'
import './App.css'
import { ProductForm } from './components/ProductForm'
import { useState } from 'react'

function App() {
  const [showForm, setShowForm] = useState({ show: false, mode: 'new' })

  function showFormModal(mode: string) {
    setShowForm({show: true, mode: mode})
  }

  function hideFormModal() {
    setShowForm((prev) => ({ ...prev, show: false }))
  }

  return (
    <div className='container'>
      <h1>Inventory Redux Exercise</h1>
      <Filters />
      <ProductList showFormModal={showFormModal} />
      {showForm.show && <ProductForm showForm={showForm} hideFormModal={hideFormModal} />}
    </div>
  )
}

export default App
