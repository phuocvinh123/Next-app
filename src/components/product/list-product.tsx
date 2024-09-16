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
  fetchProductsStart,
  fetchProductsSuccess,
  setSelectedCategory,
} from '@/components/slice/product-slice'

const ListProduct = () => {
  const dispatch = useDispatch()
  const { products, loading, error, selectedCategory } = useSelector(
    (state: RootState) => state.product
  )

  const userId =
    typeof window !== 'undefined'
      ? JSON.parse(localStorage.getItem('user') || '{}').id
      : null

  useEffect(() => {
    const fetchProducts = async () => {
      dispatch(fetchProductsStart())
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
  }, [dispatch, selectedCategory])

  const handleAddToCart = async (productId: number) => {
    const cartData = {
      userId: userId,
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
      toast.success('Thêm sản phẩm thành công')
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <div>
      <div className='flex justify-between'>
        <ListCategory
          setSelectedCategory={(category) =>
            dispatch(setSelectedCategory(category))
          }
          selectedCategory={selectedCategory}
        />
        <ShowCart />
      </div>

      {loading && <Spinner size='xl' />}
      {error && (
        <Alert status='error'>
          <AlertIcon />
          {error}
        </Alert>
      )}
      {products.length === 0 && <Text>No products found.</Text>}
      <div className='flex flex-wrap gap-10'>
        {products.map((product) => (
          <Card key={product.id} maxW='350' mb='6'>
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
