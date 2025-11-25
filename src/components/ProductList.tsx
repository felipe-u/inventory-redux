import { useEffect } from 'react'
import { useAppSelector } from '../hooks/store'
import { useProductsActions } from '../hooks/useProductsActions'
import { useUIActions } from '../hooks/useUIActions'
import { filteredProducts } from '../store/products/selectors'
import type { ProductId } from '../types'
import {
  Box,
  Button,
  ButtonGroup,
  Group,
  IconButton,
  Image,
  Table,
} from '@chakra-ui/react'
import { cutText } from '../util'
import { DeleteIcon, EditIcon, MinusIcon, PlusIcon } from './Icons'

export function ProductList() {
  const products = useAppSelector((state) => filteredProducts(state))
  const { loadProducts, deleteProduct, updateStock } = useProductsActions()
  const { openFormModal } = useUIActions()

  useEffect(() => {
    loadProducts()
  }, [])

  const handleStockAdj = (
    productId: ProductId,
    prevStock: number,
    adjust: number
  ) => {
    if (adjust === -1 && prevStock === 0) {
      alert("Stock can't be negative")
      return
    }
    updateStock(productId, adjust)
  }

  return (
    <Box as='section' mt='10' mb='10'>
      <Box textAlign='right'>
        <Button
          colorPalette='purple'
          variant='solid'
          mb='5'
          onClick={() => openFormModal(true, 'new', -1)}
        >
          Add Product
        </Button>
      </Box>
      <Table.Root
        variant='outline'
        width='750px'
        tableLayout='fixed'
        stickyHeader
        interactive
        colorPalette='purple'
      >
        <Table.Header>
          <Table.Row bg='bg.subtle'>
            <Table.ColumnHeader textAlign='center' w='8%'>
              Id
            </Table.ColumnHeader>
            <Table.ColumnHeader textAlign='center' w='14%'>
              Image
            </Table.ColumnHeader>
            <Table.ColumnHeader w='18%'>Name</Table.ColumnHeader>
            <Table.ColumnHeader textAlign='center' w='12%'>
              Category
            </Table.ColumnHeader>
            <Table.ColumnHeader textAlign='center' w='12%'>
              Price
            </Table.ColumnHeader>
            <Table.ColumnHeader textAlign='center' w='14%'>
              Stock
            </Table.ColumnHeader>
            <Table.ColumnHeader textAlign='center' w='20%'>
              Actions
            </Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {products.map((product) => (
            <Table.Row key={product.id}>
              <Table.Cell textAlign='center'>{product.id}</Table.Cell>
              <Table.Cell>
                <Image
                  src={product.thumbnail}
                  borderRadius='full'
                  boxSize='100px'
                  fit='cover'
                  alt={product.title}
                />
              </Table.Cell>
              <Table.Cell>{cutText(product.title, 15)}</Table.Cell>
              <Table.Cell textTransform='capitalize' textAlign='center'>
                {product.category}
              </Table.Cell>
              <Table.Cell textAlign='center'>${product.price}</Table.Cell>
              <Table.Cell textAlign='center'>
                <Group attached borderWidth='1px' rounded='md'>
                  <IconButton
                    variant='surface'
                    size='2xs'
                    onClick={() =>
                      handleStockAdj(product.id, product.stock, -1)
                    }
                  >
                    <MinusIcon />
                  </IconButton>
                  <Box w='8' textAlign='center'>
                    {product.stock}
                  </Box>
                  <IconButton
                    variant='surface'
                    size='2xs'
                    onClick={() => updateStock(product.id, 1)}
                  >
                    <PlusIcon />
                  </IconButton>
                </Group>
              </Table.Cell>
              <Table.Cell textAlign='center'>
                <ButtonGroup>
                  <IconButton
                    variant='surface'
                    aria-label='Edit Product'
                    onClick={() => openFormModal(true, 'edit', product.id)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    variant='surface'
                    aria-label='Delete Product'
                    onClick={() => deleteProduct(product.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ButtonGroup>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  )
}
