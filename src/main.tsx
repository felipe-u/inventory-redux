import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { store } from './store/index.ts'
import { ChakraProvider, defaultSystem } from '@chakra-ui/react'

createRoot(document.getElementById('root')!).render(
  <ChakraProvider value={defaultSystem}>
    <Provider store={store}>
      <App />
    </Provider>
  </ChakraProvider>
)
