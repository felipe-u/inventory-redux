import { useEffect, useState } from 'react'
import { useProductsActions } from '../hooks/useProductsActions'
import { useAppSelector } from '../hooks/store'
import { selectProductById } from '../store/products/selectors'
import type { Product } from '../types'
import { useUIActions } from '../hooks/useUIActions'
import {
  Box,
  Button,
  Center,
  Field,
  Flex,
  Image,
  Input,
  NumberInput,
  Text,
} from '@chakra-ui/react'
import { isValidUrl } from '../util'

const initialFormState = {
  title: '',
  category: '',
  price: 0,
  stock: 0,
  thumbnail: '',
}

export function ProductForm() {
  const { addProduct, updateProduct } = useProductsActions()
  const { closeFormModal } = useUIActions()

  const uiOptions = useAppSelector((state) => state.ui)
  const productId = uiOptions.selectedProductId

  const product = useAppSelector((state) =>
    productId ? selectProductById(state, productId) : null
  )

  const [form, setForm] = useState<Product>(initialFormState)
  const [thumbnailError, setThumbnailError] = useState(false)

  useEffect(() => {
    if (productId && product) {
      setForm(product)
    }
  }, [productId, product])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const { title, category, price, stock, thumbnail } = form
    if (!title.trim() || !category.trim() || !thumbnail.trim()) {
      alert('Missing fields')
      return
    }
    if (price <= 0) {
      alert('Price must be greater than zero')
      return
    }
    if (stock < 0) {
      alert("Stock can't be negative")
      return
    }

    if (uiOptions.formModalMode === 'new') {
      addProduct(form)
    } else {
      updateProduct({ id: productId!, ...form })
    }

    setForm(initialFormState)
    closeFormModal()
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = event.target
    setForm((prev) => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value,
    }))
  }

  return (
    <Box>
      <form className='product-form' onSubmit={handleSubmit}>
        <Flex flexDir='column' gap='5'>
          <Field.Root>
            <Field.Label>Name</Field.Label>
            <Input
              name='title'
              type='text'
              placeholder='Awesome chair'
              value={form.title}
              onChange={handleInputChange}
              required
            />
          </Field.Root>

          <Field.Root>
            <Field.Label>Category</Field.Label>
            <Input
              name='category'
              type='text'
              placeholder='Furniture'
              value={form.category}
              onChange={handleInputChange}
              required
            />
          </Field.Root>

          <Field.Root>
            <Field.Label>Price</Field.Label>
            <NumberInput.Root
              name='price'
              value={form.price.toString()}
              onValueChange={(value) => {
                setForm((f) => ({ ...f, price: value.valueAsNumber }))
              }}
              required
              step={0.01}
              min={0}
              formatOptions={{ style: 'currency', currency: 'USD' }}
            >
              <NumberInput.Control />
              <NumberInput.Input />
            </NumberInput.Root>
          </Field.Root>

          <Field.Root>
            <Field.Label>Stock</Field.Label>
            <NumberInput.Root
              name='stock'
              value={form.stock.toString()}
              onValueChange={(value) => {
                setForm((f) => ({ ...f, stock: value.valueAsNumber }))
              }}
              required
              min={0}
              disabled={uiOptions.formModalMode === 'edit'}
            >
              <NumberInput.Control />
              <NumberInput.Input />
            </NumberInput.Root>
          </Field.Root>

          <Field.Root>
            <Field.Label>Thumbnail</Field.Label>
            <Input
              name='thumbnail'
              type='text'
              placeholder='Image Url'
              value={form?.thumbnail}
              onChange={(e) => {
                setThumbnailError(false)
                handleInputChange(e)
              }}
              required
            />

            {form.thumbnail &&
              isValidUrl(form.thumbnail) &&
              !thumbnailError && (
                <Center w='100%'>
                  <Image
                    src={form.thumbnail}
                    alt={thumbnailError ? '' : 'Thumbnail preview'}
                    boxSize='300px'
                    fit='cover'
                    rounded='md'
                    onError={() => setThumbnailError(true)}
                    onLoad={() => setThumbnailError(false)}
                  />
                </Center>
              )}

            {thumbnailError && (
              <Text color='red.700' p='5'>
                The URL does not load a valid image
              </Text>
            )}
          </Field.Root>

          <Center w='100%' gap='7'>
            <Button type='submit' colorPalette='purple'>
              Save
            </Button>
            <Button type='reset' onClick={closeFormModal}>
              Cancel
            </Button>
          </Center>
        </Flex>
      </form>
    </Box>
  )
}
