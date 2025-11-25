import { useEffect, useState } from 'react'
import { useUIActions } from '../hooks/useUIActions'
import { useAppSelector } from '../hooks/store'
import { allCategories } from '../store/products/selectors'
import { filtersSelector } from '../store/ui/selectors'
import {
  Box,
  Button,
  Center,
  Flex,
  Input,
  NativeSelect,
  Separator,
  Text,
} from '@chakra-ui/react'
import { useDebounce } from '../hooks/useDebounce'

export function Filters() {
  const { onSetTitleFilter, onSetCategoryFilter, onResetFilters } =
    useUIActions()

  const filters = useAppSelector((state) => filtersSelector(state))
  const categories = useAppSelector((state) => allCategories(state))

  const [titleInput, setTitleInput] = useState(filters.title)
  const debouncedInput = useDebounce(titleInput)

  useEffect(() => {
    const cleanInput = debouncedInput.trim().toLowerCase()
    onSetTitleFilter(cleanInput)
  }, [debouncedInput])

  const handleReset = () => {
    onResetFilters()
    setTitleInput('')
  }

  return (
    <Box as='header' borderWidth='2px' rounded='md'>
      <Flex
        alignItems='center'
        justifyContent='space-around'
        width='600px'
        p='5'
        textAlign='center'
      >
        <Box>
          <Text pb='3'>Search by name</Text>
          <Input
            placeholder='Chair, Apple...'
            type='text'
            value={titleInput}
            onChange={(e) => setTitleInput(e.target.value)}
          />
        </Box>

        <Box>
          <Text pb='3'>Search by category</Text>

          {categories.length > 0 ? (
            <>
              <NativeSelect.Root>
                <NativeSelect.Field
                  name='category'
                  id='category'
                  value={filters.category}
                  onChange={(e) => onSetCategoryFilter(e.target.value)}
                  textTransform='capitalize'
                >
                  <option value='all'>All</option>
                  {categories.map((cat) => (
                    <option
                      key={cat}
                      value={cat}
                      style={{ textTransform: 'capitalize' }}
                    >
                      {cat}
                    </option>
                  ))}
                </NativeSelect.Field>
                <NativeSelect.Indicator />
              </NativeSelect.Root>
            </>
          ) : (
            <Text>No products yet</Text>
          )}
        </Box>

        <Box>
          <Text pb='3'>Products with low stock</Text>
          <Button colorPalette='purple' variant='surface'>
            Filter
          </Button>
        </Box>
      </Flex>
      <Separator />
      <Center p='5'>
        <Button
          variant='outline'
          _hover={{ colorPalette: 'red' }}
          onClick={handleReset}
        >
          Reset Filters
        </Button>
      </Center>
    </Box>
  )
}
