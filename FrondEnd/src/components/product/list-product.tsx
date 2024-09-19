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
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Modal,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  Select,
} from '@chakra-ui/react'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { RootState } from '@/components/store/store'
import {
  fetchProductsEnd,
  fetchProductsFailure,
  fetchProductsStart,
  fetchProductsSuccess,
  setChange,
  setSelectedCategory,
} from '@/components/slice/product-slice'
import { getCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import axios from 'axios'
import Swal from 'sweetalert2'

const schema = yup.object().shape({
  title: yup.string().required('Tên không được để trống'),
  description: yup.string().required('Mô tả không được để trống'),
  price: yup.number().required('Giá tiền không được để trống'),
  image: yup.string().required('Link ảnh không được để trống'),
  category: yup.string().required('Loại sản phẩm không được để trống'),
})

const ListProduct = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const dispatch = useDispatch()
  const { products, loading, error, selectedCategory, change } = useSelector(
    (state: RootState) => state.product
  )
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  })
  const customerId = getCookie('customerId')
  const roleCustomer = getCookie('roleCustomer')
  const router = useRouter()

  useEffect(() => {
    if (!customerId) {
      toast.error('Please login to perform the next functions..')
      router.push('/login')
    }
  }, [])

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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const createProduct = async (data: any) => {
    dispatch(fetchProductsStart())
    try {
      const res = await axios.post(
        'http://localhost:9002/api/products/create',
        data
      )
      if (res.status === 200) {
        toast.success('Tạo sản phẩm thành công')
        dispatch(setChange(!change))
        reset()
        onClose()
        dispatch(fetchProductsEnd())
      } else {
        throw new Error('Product creation failed')
      }
    } catch (error) {
      toast.error('Tạo sản phẩm thất bại!')
      console.error('Error creating product:', error)
      dispatch(fetchProductsEnd())
    }
  }

  const handleDeleteProduct = async (productId: number) => {
    Swal.fire({
      title: 'Bạn có chắc chắn?',
      text: 'Hành động này không thể hoàn tác!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Vâng, xóa nó!',
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(
            `http://localhost:9002/api/products/${productId}`,
            { method: 'DELETE' }
          )
          if (!res.ok) {
            throw new Error('Network response was not ok')
          }
          dispatch(setChange(!change))
          Swal.fire('Đã xóa!', 'Sản phẩm của bạn đã bị xóa.', 'success')
          dispatch(fetchProductsEnd())
        } catch (error) {
          console.error('Error:', error)
          toast.error('Có lỗi xảy ra khi xóa sản phẩm')
        }
      }
    })
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
          {roleCustomer == 'ADMIN' && (
            <Button onClick={onOpen}>Add Product</Button>
          )}

          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Product Information</ModalHeader>
              <ModalCloseButton />

              <form onSubmit={handleSubmit(createProduct)}>
                <ModalBody>
                  <FormControl isInvalid={Boolean(errors.title)}>
                    <FormLabel>Title</FormLabel>
                    <Input type='text' id='title' {...register('title')} />
                    <Text color='red.500'>{errors.title?.message}</Text>
                  </FormControl>
                  <FormControl isInvalid={Boolean(errors.description)}>
                    <FormLabel>Description</FormLabel>
                    <Input
                      type='text'
                      id='description'
                      {...register('description')}
                    />
                    <Text color='red.500'>{errors.description?.message}</Text>
                  </FormControl>
                  <FormControl>
                    <FormLabel>Category</FormLabel>
                    <Select {...register('category')}>
                      <option value='electronics'>Electronics</option>
                      <option value='jewelery'>Jewelery</option>
                      <option value="men's clothing">Men's Clothing</option>
                      <option value="women's clothing">Women's Clothing</option>
                    </Select>
                  </FormControl>
                  <FormControl isInvalid={Boolean(errors.price)}>
                    <FormLabel>Price</FormLabel>
                    <Input type='number' id='price' {...register('price')} />
                    <Text color='red.500'>{errors.price?.message}</Text>
                  </FormControl>
                  <FormControl isInvalid={Boolean(errors.image)}>
                    <FormLabel>Image</FormLabel>
                    <Input type='text' id='image' {...register('image')} />
                    <Text color='red.500'>{errors.image?.message}</Text>
                  </FormControl>
                </ModalBody>
                <ModalFooter>
                  <Button colorScheme='blue' mr={3} onClick={onClose}>
                    Close
                  </Button>
                  <Button type='submit' variant='ghost'>
                    Submit
                  </Button>
                </ModalFooter>
              </form>
            </ModalContent>
          </Modal>
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
            {roleCustomer == 'ADMIN' && (
              <div
                className='absolute group-hover:bg-red-600 group-hover:rounded-full cursor-pointer'
                onClick={() => handleDeleteProduct(product.id)}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='1em'
                  height='1em'
                  viewBox='0 0 40 40'
                >
                  <path
                    fill='white'
                    d='M21.499 19.994L32.755 8.727a1.064 1.064 0 0 0-.001-1.502c-.398-.396-1.099-.398-1.501.002L20 18.494L8.743 7.224c-.4-.395-1.101-.393-1.499.002a1.05 1.05 0 0 0-.309.751c0 .284.11.55.309.747L18.5 19.993L7.245 31.263a1.064 1.064 0 0 0 .003 1.503c.193.191.466.301.748.301h.006c.283-.001.556-.112.745-.305L20 21.495l11.257 11.27c.199.198.465.308.747.308a1.06 1.06 0 0 0 1.061-1.061c0-.283-.11-.55-.31-.747z'
                  />
                </svg>
              </div>
            )}

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
