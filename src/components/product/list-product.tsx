// components/ListProduct.tsx
'use client'

import ShowCart from '@/components/cart/show-cart'
import { addCart, Product } from '@/components/interfaces/interface'
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
import { useState, useEffect } from 'react'

const ListProduct = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState('')
  const [addCarts, setAddCards] = useState<addCart[]>([])

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      try {
        const url = selectedCategory
          ? `https://fakestoreapi.com/products/category/${selectedCategory}`
          : 'https://fakestoreapi.com/products'
        const response = await fetch(url)

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data: Product[] = await response.json()
        setProducts(data)
      } catch (err) {
        setError('Something went wrong. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [selectedCategory])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const addToCart = async (productId: any) => {
    const cartData = {
      userId: 5,
      date: new Date().toISOString(),
      products: [{ productId: productId, quantity: 1 }],
    }

    try {
      const res = await fetch('https://fakestoreapi.com/carts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cartData),
      })

      if (!res.ok) {
        throw new Error('Network response was not ok')
      }

      const data: addCart = await res.json()
      setAddCards((prevCarts) => [...prevCarts, data])
    } catch (error) {
      console.error('Error:', error)
    }
  }

  useEffect(() => {
    console.log('Updated addCarts:', addCarts)
  }, [addCarts])

  return (
    <div>
      <div className='flex justify-between'>
        <ListCategory
          setSelectedCategory={setSelectedCategory}
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
                  onClick={() => addToCart(product.id)}
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
