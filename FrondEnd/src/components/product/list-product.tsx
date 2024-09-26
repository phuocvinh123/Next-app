/* eslint-disable react/no-unescaped-entities */
'use client'

import { useSelector, useDispatch } from 'react-redux'
import ShowCart from '@/components/cart/show-cart'
import { ListCategory } from '@/components/product/list-category'
import {
  Card,
  CardBody,
  CardFooter,
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
import Link from 'next/link'

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
      <div className='flex flex-wrap gap-10 '>
        {products.map((product) => (
          <Link key={product.id} href={`/product-detail/${product.id}`}>
            <Card
              key={product.id}
              w={250}
              h={450}
              mb='6'
              className='relative group hover:border-[0.5px] border-[white] border-[0.5px] hover:border-[#EE4D2D] cursor-pointer'
            >
              <div className='absolute -bottom-[50px] left-1/2 w-[250px] transform -translate-x-1/2  hidden group-hover:flex group-hover:opacity-100 px-5 text-lg font-bold text-[#dfe6e9] bg-[#EE4D2D] py-3  cursor-pointer'>
                Tìm sản phẩm tương tự
              </div>
              <div className='absolute right-0 px-1 text-[#f2692d] bg-[#feeeea] '>
                <Text>{product.discount?.percentDecrease}</Text>
              </div>
              <CardBody>
                <div className='relative'>
                  <Image
                    src={product.image}
                    height={250}
                    alt={product.title}
                    borderRadius='lg'
                    display='block'
                    mx='auto'
                  />
                  <div className='absolute -bottom-2 -right-2 bg-[#bdbdbd] text-white px-1'>
                    <Text>Ad</Text>
                  </div>
                  {product.discount?.images ? (
                    <div className='absolute -bottom-4 -left-5'>
                      <Image
                        src={product.discount?.images}
                        alt='images'
                      ></Image>
                    </div>
                  ) : null}
                </div>

                <Stack mt='6' spacing='3'>
                  <div className='h-14 w-[200px] inline-block overflow-hidden text-ellipsis line-clamp-2 text-xl  font-semibold '>
                    {product.discount?.favourite && (
                      <span className='text-white bg-[#EE4D2D] rounded-sm px-1 mr-2 text-lg'>
                        Yêu thích
                      </span>
                    )}
                    {product.title}
                  </div>
                  <div className=' h-6 text-center flex gap-4'>
                    {product.discount?.cheapChampion ? (
                      <div className='w-[80px] text-[#EE4D2D] border-[0.5px] border-[#EE4D2D] '>
                        {' '}
                        Rẻ vô dịch
                      </div>
                    ) : null}

                    {product.discount?.reduce ? (
                      <div className='relative w-28'>
                        <div className='absolute w-2 h-6 -left-1 '>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='-0.5 -0.5 4 16'
                            className='flex-none h-full -mr-px'
                          >
                            <path
                              d='M4 0h-3q-1 0 -1 1a1.2 1.5 0 0 1 0 3v0.333a1.2 1.5 0 0 1 0 3v0.333a1.2 1.5 0 0 1 0 3v0.333a1.2 1.5 0 0 1 0 3q0 1 1 1h3'
                              stroke-width='1'
                              transform=''
                              stroke='#F69113'
                              fill='#F69113'
                            ></path>
                          </svg>
                        </div>
                        <Text className='bg-[#F69113] text-white'>
                          Giảm ₫{product.discount?.reduce}
                        </Text>
                        <div className='absolute w-2 h-6 top-0 -right-2 '>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='-0.5 -0.5 4 16'
                            className='rotate-180 flex-none h-full -ml-px'
                          >
                            <path
                              d='M4 0h-3q-1 0 -1 1a1.2 1.5 0 0 1 0 3v0.333a1.2 1.5 0 0 1 0 3v0.333a1.2 1.5 0 0 1 0 3v0.333a1.2 1.5 0 0 1 0 3q0 1 1 1h3'
                              stroke-width='1'
                              transform=''
                              stroke='#F69113'
                              fill='#F69113'
                            ></path>
                          </svg>
                        </div>
                      </div>
                    ) : null}
                  </div>
                  <div className='flex justify-between items-center'>
                    <div className='flex items-center text-[#EE4D2D]'>
                      <span className='text-xs font-medium mr-px '>₫</span>
                      <Text fontSize='2xl'>{product.price}</Text>
                    </div>
                    <div className='text-lg font-normal'>
                      <Text>Đã bán {product.discount?.sold}</Text>
                    </div>
                  </div>
                </Stack>
              </CardBody>

              <div className='hidden'>
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
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default ListProduct
