import { Filters } from './components/Filters'
import { ProductList } from './components/ProductList'
import './App.css'
import { ProductForm } from './components/ProductForm'
import { useAppSelector } from './hooks/store'

function App() {
  const uiOptions = useAppSelector((state) => state.ui)

  return (
    <div className='container'>
      <h1>Inventory Redux Exercise</h1>
      <Filters />
      <ProductList />
      {uiOptions.isFormModalOpen && <ProductForm />}
    </div>
  )
}

export default App
