import { Cart } from '@/components/interfaces/interface'
import {
  fetchCartFailure,
  fetchCartStart,
  fetchCartSuccess,
} from '@/components/slice/cart-slice'
import { RootState } from '@/components/store/store'
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Image,
  Text,
  useDisclosure,
} from '@chakra-ui/react'

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCookie } from 'cookies-next'
import {
  handleDeleteCart,
  handleMinusCart,
  handlePlusCart,
} from '@/components/utils/cartUtils'
import { useRouter } from 'next/navigation'

const ShowCart = ({}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef<HTMLButtonElement>(null)
  const [shouldFetchCart, setShouldFetchCart] = useState(false)
  const dispatch = useDispatch()
  const { items: carts } = useSelector((state: RootState) => state.cart)
  const { change } = useSelector((state: RootState) => state.product)
  const userId = getCookie('userId')

  useEffect(() => {
    const fetchCart = async () => {
      if (userId) {
        dispatch(fetchCartStart())
        try {
          const response = await fetch(
            `http://localhost:9002/api/carts/${userId}`
          )
          const data: Cart[] = await response.json()
          dispatch(fetchCartSuccess(data))
        } catch (error) {
          dispatch(fetchCartFailure('Error fetching cart data'))
        }
      }
    }
    fetchCart()
  }, [isOpen, dispatch, userId, shouldFetchCart, change])

  const router = useRouter()

  const handleByNow = () => {
    router.push('/order-now')
  }

  const totalPrice = carts
    .reduce((acc, cart) => acc + cart.product.price * cart.quantity, 0)
    .toFixed(2)

  return (
    <>
      <Button ref={btnRef} colorScheme='gray' onClick={onOpen}>
        <div className='relative'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='ionicon size-6'
            viewBox='0 0 512 512'
          >
            <circle
              cx='176'
              cy='416'
              r='16'
              fill='none'
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='32'
            />
            <circle
              cx='400'
              cy='416'
              r='16'
              fill='none'
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='32'
            />
            <path
              fill='none'
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='32'
              d='M48 80h64l48 272h256'
            />
            <path
              d='M160 288h249.44a8 8 0 007.85-6.43l28.8-144a8 8 0 00-7.85-9.57H128'
              fill='none'
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='32'
            />
          </svg>
          {carts.length > 0 ? (
            <div className='absolute w-6 h-6 rounded-full bg-red-600 text-white -top-4 -right-7'>
              {carts?.length || 0}
            </div>
          ) : null}
        </div>
      </Button>
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Cart</DrawerHeader>
          <DrawerBody>
            <div className='flex flex-col gap-4'>
              {carts.length > 0 &&
                carts.map((cart) => (
                  <div className='flex gap-2 relative' key={cart.id}>
                    <div
                      className='absolute top-0 -left-4 cursor-pointer hover:bg-red-600 hover:rounded-full'
                      onClick={() =>
                        handleDeleteCart(cart.id, setShouldFetchCart)
                      }
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
                      <div className='flex items-center'>
                        <Image
                          src={cart.product.image}
                          alt='images'
                          width={60}
                          height={40}
                        />
                      </div>
                    </Box>
                    <div>
                      <Text isTruncated maxW='150px' className='font-bold mt-4'>
                        {cart.product.title}
                      </Text>
                      <Text isTruncated maxW='150px' className=' mt-4'>
                        {cart.product.description}
                      </Text>
                      <div className='flex gap-5 mt-4 bg-[#F6F6F6] justify-center items-center p-2 w-[125px] h-[40px]'>
                        <Button
                          onClick={() =>
                            handleMinusCart(cart.id, setShouldFetchCart)
                          }
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
                          onClick={() =>
                            handlePlusCart(cart.id, setShouldFetchCart)
                          }
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
                      <div className='flex gap-5 mt-4'>
                        <div className='font-bold'>Price:</div>
                        <Text isTruncated maxW='150px'>
                          {cart.product.price * cart.quantity} $
                        </Text>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </DrawerBody>

          <DrawerFooter>
            <Button variant='outline' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme='blue' onClick={() => handleByNow()}>
              Buy now ({totalPrice} $)
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default ShowCart
