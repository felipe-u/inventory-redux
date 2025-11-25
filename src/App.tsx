import { Filters } from './components/Filters'
import { ProductList } from './components/ProductList'
import './App.css'
import { ProductForm } from './components/ProductForm'
import { useAppSelector } from './hooks/store'
import { Heading } from '@chakra-ui/react'

function App() {
  const uiOptions = useAppSelector((state) => state.ui)

  return (
    <div className='container'>
      <Heading p='10' size='3xl' fontWeight='bold' color='teal.fg'>
        Inventory Redux Exercise
      </Heading>
      <Filters />
      <ProductList />
      {uiOptions.isFormModalOpen && <ProductForm />}
    </div>
  )
}

export default App
