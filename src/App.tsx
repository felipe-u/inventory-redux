import { Filters } from './components/Filters'
import { ProductList } from './components/ProductList'
import './App.css'
import { ProductForm } from './components/ProductForm'

function App() {
  return (
    <div className='container'>
      <h1>Inventory Redux Exercise</h1>
      <Filters />
      <ProductList />
      <ProductForm />
    </div>
  )
}

export default App
