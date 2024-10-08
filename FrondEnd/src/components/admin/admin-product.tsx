/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
'use client'

import {
  fetchProductsEnd,
  fetchProductsStart,
  fetchProductsSuccess,
  setChange,
} from '@/components/slice/product-slice'
import { RootState } from '@/components/store/store'
import {
  Alert,
  AlertIcon,
  Button,
  FormControl,
  FormLabel,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
  Input,
} from '@chakra-ui/react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
import PageGination from '@/components/pagegination/pages'
import {
  fetchItemsSuccess,
  setCurrentPage,
  setPageSize,
} from '@/components/slice/page-slice'
import { Product } from '@/components/interfaces/interface'

const schema = yup.object().shape({
  title: yup.string().required('Tên không được để trống'),
  description: yup.string().required('Mô tả không được để trống'),
  price: yup.number().required('Giá tiền không được để trống'),
  image: yup.string().required('Link ảnh không được để trống'),
  category: yup.string().required('Loại sản phẩm không được để trống'),
})

const AdminProduct = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  })
  const dispatch = useDispatch()
  const { products, loading, error, change } = useSelector(
    (state: RootState) => state.product
  )
  const { currentPage, pageSize, totalItems } = useSelector(
    (state: RootState) => state.pagination
  )
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [isClient, setIsClient] = useState(false)
  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchProductsStart())
      try {
        const res = await axios.get(
          `http://localhost:9002/api/products?page=${
            currentPage - 1
          }&size=${pageSize}`
        )
        const data = res.data
        dispatch(
          fetchItemsSuccess({
            totalItems: data.totalElements,
          })
        )
        dispatch(fetchProductsSuccess(data.content))
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }

    fetchData()
  }, [dispatch, change, currentPage, pageSize])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const createOrUpdateProduct = async (data: any) => {
    dispatch(fetchProductsStart())
    try {
      if (editingProduct) {
        const res = await axios.put(
          `http://localhost:9002/api/products/edit/${editingProduct.id}`,
          data
        )
        if (res.status === 200) {
          toast.success('Cập nhật sản phẩm thành công')
        }
      } else {
        const res = await axios.post(
          'http://localhost:9002/api/products/create',
          data
        )
        if (res.status === 200) {
          toast.success('Tạo sản phẩm thành công')
        }
      }
      setEditingProduct(null)
      dispatch(setChange(!change))
      reset()
      onClose()
      dispatch(fetchProductsEnd())
    } catch (error) {
      toast.error('Có lỗi xảy ra!')
      console.error('Error:', error)
      dispatch(fetchProductsEnd())
    }
  }

  const openEditModal = (product: any) => {
    setEditingProduct(product)
    reset()
    setValue('title', product.title)
    setValue('description', product.description)
    setValue('price', product.price)
    setValue('image', product.image)
    setValue('category', product.category)
    onOpen()
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

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) return null

  return (
    <>
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
      <div className='bg-white mr-12 p-4 w-[1440px]'>
        <div>
          <TableContainer>
            <Button
              onClick={() => {
                onOpen(), reset(), setEditingProduct(null)
              }}
              colorScheme='green'
              className='my-5'
            >
              Add Product
            </Button>

            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>
                  {editingProduct ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm'}
                </ModalHeader>
                <ModalCloseButton />

                <form onSubmit={handleSubmit(createOrUpdateProduct)}>
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
                        <option value="women's clothing">
                          Women's Clothing
                        </option>
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
                    <Button
                      colorScheme='blue'
                      mr={3}
                      onClick={() => {
                        onClose()
                        reset()
                      }}
                    >
                      Close
                    </Button>
                    <Button type='submit' variant='ghost'>
                      {editingProduct ? 'Cập nhật' : 'Thêm'}
                    </Button>
                  </ModalFooter>
                </form>
              </ModalContent>
            </Modal>

            <Table variant='simple'>
              <Thead>
                <Tr>
                  <Th>#</Th>
                  <Th textAlign='center' w={250}>
                    Image
                  </Th>
                  <Th w={150}>Title</Th>
                  <Th w={250}>Description</Th>
                  <Th w={200}>Category</Th>
                  <Th isNumeric>Price</Th>
                  <Th textAlign='center'>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {products.length > 0 &&
                  products.map((p) => (
                    <Tr key={p.id}>
                      <Td>{p.id}</Td>
                      <Td textAlign='center'>
                        <Image src={p.image} alt='img' width={60} height={40} />
                      </Td>
                      <Td
                        maxWidth='150px'
                        whiteSpace='nowrap'
                        overflow='hidden'
                        textOverflow='ellipsis'
                      >
                        {p.title}
                      </Td>
                      <Td
                        maxWidth='250px'
                        whiteSpace='nowrap'
                        overflow='hidden'
                        textOverflow='ellipsis'
                      >
                        {p.description}
                      </Td>
                      <Td>{p.category}</Td>
                      <Td isNumeric>{p.price} $</Td>
                      <Td textAlign='center'>
                        <Button
                          colorScheme='yellow'
                          onClick={() => openEditModal(p)}
                        >
                          Edit
                        </Button>
                        <Button
                          ml={10}
                          colorScheme='red'
                          onClick={() => handleDeleteProduct(p.id)}
                        >
                          Delete
                        </Button>
                      </Td>
                    </Tr>
                  ))}
              </Tbody>
            </Table>
          </TableContainer>
        </div>
        <div>
          <div className='mt-12 flex justify-end mr-5'>
            <PageGination
              currentPage={currentPage}
              pageSize={pageSize}
              totalItems={totalItems}
              setPage={(page) => dispatch(setCurrentPage(page))}
              setPageSize={(size) => dispatch(setPageSize(size))}
            />
          </div>
        </div>
      </div>
    </>
  )
}
export default AdminProduct
