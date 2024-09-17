'use client'

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchCustomerFailure,
  fetchCustomerStart,
  fetchCustomerSuccess,
} from '@/components/slice/customer-slice'
import { RootState } from '@/components/store/store'
import { getCookies } from 'cookies-next'
import {
  Box,
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
} from '@chakra-ui/react'

import {
  handleDeleteCart,
  handleMinusCart,
  handlePlusCart,
} from '@/components/utils/cartUtils'
import {
  fetchCartFailure,
  fetchCartStart,
  fetchCartSuccess,
} from '@/components/slice/cart-slice'
import { Cart } from '@/components/interfaces/interface'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

const BuyOrder = () => {
  const [shouldFetchCart, setShouldFetchCart] = useState(false)
  const dispatch = useDispatch()
  const {
    item: customers,
    loading,
    error,
  } = useSelector((state: RootState) => state.customer)
  const { items: carts } = useSelector((state: RootState) => state.cart)
  const cookies = getCookies()
  const customerId = cookies.userId
  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)
  const [fullName, setFullName] = useState(customers?.fullName || '')
  const [phone, setPhone] = useState(customers?.phone || '')
  const [address, setAddress] = useState(customers?.address || '')
  const [change, setChange] = useState(false)

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
  const router = useRouter()
  const handleBack = () => {
    router.push('/product')
  }

  const handleOrderNow = async () => {
    const orderData = {
      customerId: customerId,
      date: new Date().toISOString(),
    }

    try {
      const res = await fetch('http://localhost:9002/api/orders/orderNow', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      })

      if (!res.ok) {
        throw new Error('Network response was not ok')
      }
      setShouldFetchCart((prev) => !prev)
      toast.success('Order has been placed successfully')
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const totalPrice = carts
    .reduce((acc, cart) => acc + cart.product.price * cart.quantity, 0)
    .toFixed(2)

  return (
    <>
      {loading && (
        <div className='fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50'>
          <Spinner size='xl' className='w-16 h-16' />
        </div>
      )}

      <div className=' my-20 ml-96 '>
        <div className='text-5xl text-purple font-medium'>Thanh Toán</div>
        {loading && <div>Loading...</div>}
        {error && <div className='text-red-500'>{error}</div>}

        <div className='flex gap-2 items-center mt-10 text-red-400'>
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
        {customers && (
          <div className='flex gap-2 mt-10 font-normal text-xl items-center text-center'>
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
        )}

        <div className='mt-20 font-normal text-xl'>Sản phẩm</div>
        <div className='flex flex-col gap-10'>
          {carts.length === 0 ? (
            <Text fontSize='3xl' color='gray.500'>
              Chưa có sản phẩm trong giỏ hàng
            </Text>
          ) : (
            carts.map((cart) => (
              <div className='mt-10 flex gap-16 relative ' key={cart.id}>
                <div
                  className='absolute top-0 -left-4 cursor-pointer hover:bg-red-600 hover:rounded-full'
                  onClick={() => handleDeleteCart(cart.id, setShouldFetchCart)}
                >
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
                      d='m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
                    />
                  </svg>
                </div>
                <Box maxW='120px' maxH='5px'>
                  <Image
                    src={cart.product.image}
                    alt='images'
                    width={60}
                    height={40}
                  />
                </Box>
                <div className='flex flex-col mt-10'>
                  <Text isTruncated maxW='450px' className='font-bold mt-4'>
                    {cart.product.title}
                  </Text>
                  <Text isTruncated maxW='450px' className=' mt-4'>
                    {cart.product.description}
                  </Text>
                </div>
                <div className='flex gap-5 mt-16 bg-[#F6F6F6] justify-center items-center p-2 w-[125px] h-[40px]'>
                  <Button
                    onClick={() => handleMinusCart(cart.id, setShouldFetchCart)}
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='8'
                      height='4'
                      viewBox='0 0 8 4'
                      fill='none'
                    >
                      <path
                        fillRule='evenodd'
                        clipRule='evenodd'
                        d='M6.1463 0.699463H1.47067C0.825429 0.699463 0.301758 1.22313 0.301758 1.86837C0.301758 2.51361 0.825429 3.03728 1.47067 3.03728H6.1463C6.79154 3.03728 7.31521 2.51361 7.31521 1.86837C7.31521 1.22313 6.79154 0.699463 6.1463 0.699463Z'
                        fill='#222222'
                      ></path>
                    </svg>
                  </Button>
                  <div>{cart.quantity}</div>
                  <Button
                    onClick={() => handlePlusCart(cart.id, setShouldFetchCart)}
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='8'
                      height='8'
                      viewBox='0 0 8 8'
                      fill='none'
                    >
                      <path
                        fillRule='evenodd'
                        clipRule='evenodd'
                        d='M6.32159 2.69554H5.15268V1.52664C5.15268 0.881398 4.62901 0.357727 3.98378 0.357727C3.33854 0.357727 2.81487 0.881398 2.81487 1.52664V2.69554H1.64596C1.00072 2.69554 0.477051 3.21921 0.477051 3.86445C0.477051 4.50969 1.00072 5.03336 1.64596 5.03336H2.81487V6.20227C2.81487 6.84751 3.33854 7.37118 3.98378 7.37118C4.62901 7.37118 5.15268 6.84751 5.15268 6.20227V5.03336H6.32159C6.96683 5.03336 7.4905 4.50969 7.4905 3.86445C7.4905 3.21921 6.96683 2.69554 6.32159 2.69554Z'
                        fill='#222222'
                      ></path>
                    </svg>
                  </Button>
                </div>
                <Text isTruncated maxW='450px' className=' mt-[70px]'>
                  {cart.product.price * cart.quantity} $
                </Text>
              </div>
            ))
          )}

          <div className='mt-20'>
            <Text fontSize='2xl' className='font-bold'>
              Tổng tiền: {totalPrice} $
            </Text>
          </div>
          <div className='mt-10 flex gap-10'>
            <Button className='w-56' onClick={() => handleBack()}>
              continue shopping
            </Button>
            {carts.length === 0 ? null : (
              <Button
                colorScheme='green'
                className='w-56'
                onClick={() => handleOrderNow()}
              >
                Order now
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default BuyOrder
