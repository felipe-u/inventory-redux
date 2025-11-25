import { Filters } from './components/Filters'
import { ProductList } from './components/ProductList'
import './App.css'
import { Heading } from '@chakra-ui/react'
import { ProductFormModal } from './components/ProductFormModal'
import { Toaster } from 'sonner'

function App() {
  return (
    <div className='container'>
      <Heading p='10' size='3xl' fontWeight='bold' color='purple.fg'>
        Inventory Redux Exercise
      </Heading>
      <Filters />
      <ProductList />
      <ProductFormModal />
      <Toaster richColors/>
    </div>
  )
}

export default App
