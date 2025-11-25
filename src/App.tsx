import { Filters } from './components/Filters'
import { ProductList } from './components/ProductList'
import './App.css'
import { Heading } from '@chakra-ui/react'
import { ProductFormModal } from './components/ProductFormModal'

function App() {
  return (
    <div className='container'>
      <Heading p='10' size='3xl' fontWeight='bold' color='teal.fg'>
        Inventory Redux Exercise
      </Heading>
      <Filters />
      <ProductList />
      <ProductFormModal />
    </div>
  )
}

export default App
