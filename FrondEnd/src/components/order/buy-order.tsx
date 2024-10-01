'use client'

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchCustomerFailure,
  fetchCustomerStart,
  fetchCustomerSuccess,
} from '@/components/slice/customer-slice'
import { RootState } from '@/components/store/store'
import { getCookie } from 'cookies-next'
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  Image,
  Spinner,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from '@chakra-ui/react'
import {
  fetchCartFailure,
  fetchCartStart,
  fetchCartSuccess,
} from '@/components/slice/cart-slice'
import { Cart, Order } from '@/components/interfaces/interface'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import Swal from 'sweetalert2'

const BuyOrder = () => {
  const [isClient, setIsClient] = useState(false)
  const [shouldFetchCart, setShouldFetchCart] = useState(false)
  const dispatch = useDispatch()
  const {
    item: customers,
    loading,
    error,
  } = useSelector((state: RootState) => state.customer)
  const { items: carts } = useSelector((state: RootState) => state.cart)
  const customerId = getCookie('customerId')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)
  const [fullName, setFullName] = useState(customers?.fullName || '')
  const [phone, setPhone] = useState(customers?.phone || '')
  const [address, setAddress] = useState(customers?.address || '')
  const [change, setChange] = useState(false)

  const router = useRouter()

  useEffect(() => {
    const fetchCustomer = async () => {
      dispatch(fetchCustomerStart())
      try {
        const url = `http://localhost:9002/api/customers/${customerId}`
        const response = await fetch(url)

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        setFullName(data.fullName)
        setPhone(data.phone)
        setAddress(data.address)
        dispatch(fetchCustomerSuccess(data))
      } catch (err) {
        dispatch(
          fetchCustomerFailure('Something went wrong. Please try again.')
        )
      }
    }
    if (customerId) {
      fetchCustomer()
    }
  }, [customerId, dispatch, change])

  const handleSave = async () => {
    const updatedCustomer = { customerId, fullName, phone, address }
    try {
      const res = await fetch('http://localhost:9002/api/customers/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedCustomer),
      })

      if (!res.ok) {
        throw new Error('Failed to update customer info')
      }

      const updatedData = await res.json()
      dispatch(fetchCustomerSuccess(updatedData))
      setChange((prev) => !prev)
      toast.success('Customer info updated successfully!')
      onClose()
    } catch (error) {
      toast.error('Failed to update customer info')
    }
  }

  const totalPrice = carts
    .reduce((acc, cart) => acc + cart.image.price * cart.quantity, 0)
    .toFixed(3)

  useEffect(() => {
    const fetchCart = async () => {
      if (customerId) {
        dispatch(fetchCartStart())
        try {
          const response = await fetch(
            `http://localhost:9002/api/carts/${customerId}`
          )
          const data: Cart[] = await response.json()
          dispatch(fetchCartSuccess(data))
        } catch (error) {
          dispatch(fetchCartFailure('Error fetching cart data'))
        }
      }
    }
    fetchCart()
  }, [dispatch, customerId, shouldFetchCart])

  const handleBack = () => {
    router.push('/order-now')
  }

  const handleOrderNow = async () => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Yes, place the order!',
      reverseButtons: true,
    })

    if (result.isConfirmed) {
      const orderData = {
        customerId: customerId,
        date: new Date().toISOString(),
        subTotal: totalPrice,
      }
      dispatch(fetchCustomerStart())
      try {
        const res = await fetch(
          'http://localhost:9002/api/orderDetails/addOrderDetails',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(orderData),
          }
        )
        if (!res.ok) {
          throw new Error('Network response was not ok')
        }

        Swal.fire({
          title: 'Order Placed!',
          text: 'Your order has been placed successfully.',
          icon: 'success',
        })
        const data: Order = await res.json()
        setShouldFetchCart((prev) => !prev)
        router.push(`/order-success/${data.id}`)
      } catch (error) {
        console.error('Error:', error)
        Swal.fire({
          title: 'Error!',
          text: 'There was an error placing your order.',
          icon: 'error',
        })
        dispatch(fetchCustomerFailure('Error fetching data'))
      }
    }
  }

  const isEmpty = (value: string | null) => value == null || value.trim() === ''

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

      <div className=' my-20 container mx-auto '>
        <div className='text-5xl text-purple font-medium ml-20'>Thanh Toán</div>
        {loading && <div>Loading...</div>}
        {error && <div className='text-red-500'>{error}</div>}

        <div className='flex gap-2 items-center mt-10 text-red-400 ml-20'>
          <div>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              className='size-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z'
              />
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z'
              />
            </svg>
          </div>
          <div className='text-2xl font-normal text-center'>
            Địa chỉ nhận hàng
          </div>
        </div>
        {customers &&
        (isEmpty(customers.fullName) ||
          isEmpty(customers.phone) ||
          isEmpty(customers.address)) ? (
          <div className='flex justify-center items-center mt-10'>
            <div className=' font-normal text-xl text-center'>
              Xin nhập thông tin để đặt đơn hàng.
            </div>
            <div
              className='text-sm text-[#4080ee] ml-2 cursor-pointer text-center'
              onClick={onOpen}
            >
              Tại đây
            </div>
            <Modal
              initialFocusRef={initialRef}
              finalFocusRef={finalRef}
              isOpen={isOpen}
              onClose={onClose}
            >
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Địa chỉ mới</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                  <FormControl>
                    <FormLabel>fullName</FormLabel>
                    <Input
                      ref={initialRef}
                      placeholder='fullName'
                      onChange={(e) => setFullName(e.target.value)}
                      value={fullName}
                    />
                  </FormControl>

                  <FormControl mt={4}>
                    <FormLabel>Phone</FormLabel>
                    <Input
                      placeholder='phone'
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </FormControl>

                  <FormControl mt={4}>
                    <FormLabel>Address</FormLabel>
                    <Input
                      placeholder='address'
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </FormControl>
                </ModalBody>

                <ModalFooter>
                  <Button
                    colorScheme='blue'
                    mr={3}
                    onClick={() => handleSave()}
                  >
                    Save
                  </Button>
                  <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </div>
        ) : (
          customers && (
            <div className='flex gap-2 mt-10 font-normal text-xl items-center text-center ml-20'>
              <div className='font-bold'>{customers.fullName}</div>
              <div className='font-bold'>{customers.phone}</div>
              <div className='text-base'>{customers.address}</div>
              <div>
                <div
                  className='text-sm text-[#4080ee] ml-2 cursor-pointer'
                  onClick={onOpen}
                >
                  Thay đổi
                </div>
                <Modal
                  initialFocusRef={initialRef}
                  finalFocusRef={finalRef}
                  isOpen={isOpen}
                  onClose={onClose}
                >
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>Địa chỉ mới</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                      <FormControl>
                        <FormLabel>fullName</FormLabel>
                        <Input
                          ref={initialRef}
                          placeholder='fullName'
                          onChange={(e) => setFullName(e.target.value)}
                          value={fullName}
                        />
                      </FormControl>

                      <FormControl mt={4}>
                        <FormLabel>Phone</FormLabel>
                        <Input
                          placeholder='phone'
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </FormControl>

                      <FormControl mt={4}>
                        <FormLabel>Address</FormLabel>
                        <Input
                          placeholder='address'
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                        />
                      </FormControl>
                    </ModalBody>

                    <ModalFooter>
                      <Button
                        colorScheme='blue'
                        mr={3}
                        onClick={() => handleSave()}
                      >
                        Save
                      </Button>
                      <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
              </div>
            </div>
          )
        )}

        <div className='mt-20 font-normal text-xl ml-20'>Sản phẩm</div>
        <div className='flex flex-col gap-10'>
          <TableContainer className='mt-20'>
            <Table variant='simple'>
              <Thead>
                <Tr>
                  <Th textAlign='center'>Image</Th>
                  <Th>Title</Th>
                  <Th>Description</Th>
                  <Th textAlign='center'>Color</Th>
                  <Th textAlign='center'> Size</Th>
                  <Th textAlign='center'>Quantity</Th>
                  <Th isNumeric>Total Price</Th>
                </Tr>
              </Thead>
              <Tbody>
                {carts.length === 0 ? (
                  <Text className='text-3xl font-normal text-[#929292]'>
                    You have not purchased any products, please click buy to
                    continue viewing
                  </Text>
                ) : (
                  carts.map((cart) => (
                    <Tr key={cart.id}>
                      <Td className='flex justify-center'>
                        <Image
                          src={cart.image.url}
                          alt='images'
                          width={40}
                          height={40}
                        />
                      </Td>
                      <Td isTruncated maxW={350}>
                        {cart.product.title}
                      </Td>
                      <Td isTruncated maxW={350}>
                        {cart.product.description}
                      </Td>
                      <Td textAlign='center'>{cart.color.nameColor}</Td>
                      <Td textAlign='center'>{cart.size}</Td>
                      <Td textAlign='center'>{cart.quantity}</Td>
                      <Td isNumeric>
                        {(cart.image.price * cart.quantity).toFixed(3)} $
                      </Td>
                    </Tr>
                  ))
                )}
              </Tbody>
            </Table>
          </TableContainer>
          <div className='mt-20'>
            <Text fontSize='2xl' className='font-bold'>
              Tổng tiền: {totalPrice} $
            </Text>
          </div>
          <div className='mt-10 flex gap-10'>
            <Button className='w-56' onClick={() => handleBack()}>
              Back
            </Button>
            {customers &&
              (isEmpty(customers.fullName) ||
              isEmpty(customers.phone) ||
              isEmpty(customers.address) ? (
                <div className='font-normal text-xl text-center'>
                  Xin nhập thông tin phía trên để tiếp tục đặt đơn hàng.
                </div>
              ) : (
                carts.length > 0 && (
                  <Button
                    colorScheme='green'
                    className='w-56'
                    onClick={() => handleOrderNow()}
                  >
                    Order now
                  </Button>
                )
              ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default BuyOrder
