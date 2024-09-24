/* eslint-disable react/no-unescaped-entities */
'use client'

import { useSelector, useDispatch } from 'react-redux'
import ShowCart from '@/components/cart/show-cart'
import { ListCategory } from '@/components/product/list-category'
import {
  Card,
  CardBody,
  CardFooter,
  Heading,
  Stack,
  Text,
  Image,
  Divider,
  ButtonGroup,
  Button,
  Spinner,
  Alert,
  AlertIcon,
} from '@chakra-ui/react'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { RootState } from '@/components/store/store'
import {
  fetchProductsFailure,
  fetchProductsSuccess,
  setChange,
  setSelectedCategory,
} from '@/components/slice/product-slice'
import { getCookie } from 'cookies-next'

const ListProduct = () => {
  const dispatch = useDispatch()
  const { products, loading, error, selectedCategory, change } = useSelector(
    (state: RootState) => state.product
  )
  const customerId = getCookie('customerId')

  useEffect(() => {
    const fetchProducts = async () => {
      // dispatch(fetchProductsStart())
      try {
        const url = `http://localhost:9002/api/products/${selectedCategory}`
        const response = await fetch(url)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        dispatch(fetchProductsSuccess(data))
      } catch (err) {
        dispatch(
          fetchProductsFailure('Something went wrong. Please try again.')
        )
      }
    }

    fetchProducts()
  }, [dispatch, selectedCategory, change])

  const handleAddToCart = async (productId: number) => {
    const cartData = {
      customerId: customerId,
      date: new Date().toISOString(),
      productId: productId,
    }

    try {
      const res = await fetch('http://localhost:9002/api/carts/addCart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cartData),
      })

      if (!res.ok) {
        throw new Error('Network response was not ok')
      }
      dispatch(setChange(!change))
      toast.success('Thêm sản phẩm thành công')
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <div>
      <div className='flex justify-between'>
        <div className='flex gap-10'>
          <ListCategory
            setSelectedCategory={(category) =>
              dispatch(setSelectedCategory(category))
            }
            selectedCategory={selectedCategory}
          />
        </div>

        <ShowCart />
      </div>

      {loading && (
        <div className='fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50'>
          <Spinner size='xl' className='w-16 h-16' />
        </div>
      )}
      {error && (
        <Alert status='error'>
          <AlertIcon />
          {error}
        </Alert>
      )}
      {products.length === 0 && <Text>No products found.</Text>}
      <div className='flex flex-wrap gap-10'>
        {products.map((product) => (
          <Card key={product.id} maxW='350' mb='6' className='relative group'>
            <CardBody>
              <Image
                src={product.image}
                height={250}
                alt={product.title}
                borderRadius='lg'
                display='block'
                mx='auto'
              />
              <Stack mt='6' spacing='3'>
                <Heading size='md'>{product.title}</Heading>
                <Text isTruncated maxW='full'>
                  {product.description}
                </Text>
                <Text color='blue.600' fontSize='2xl'>
                  ${product.price}
                </Text>
              </Stack>
            </CardBody>
            <Divider />
            <CardFooter>
              <ButtonGroup spacing='6'>
                <Button
                  variant='solid'
                  colorScheme='blue'
                  onClick={() => handleAddToCart(product.id)}
                >
                  Add to cart
                </Button>
              </ButtonGroup>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default ListProduct
