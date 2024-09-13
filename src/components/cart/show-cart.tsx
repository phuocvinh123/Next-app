import { Cart, ProductDetails } from '@/components/interfaces/interface'
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ShowCart = ({ addCarts }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef<HTMLButtonElement>(null)
  const [cart, setCart] = useState<Cart | null>(null)
  const [productsDetails, setProductsDetails] = useState<ProductDetails[]>([])

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/carts/5')
        const data = await response.json()
        setCart(data)
      } catch (error) {
        console.error('Error fetching cart data', error)
      }
    }
    fetchCart()
  }, [])

  useEffect(() => {
    const fetchProductsDetails = async () => {
      if (cart) {
        const productPromises = cart.products.map(async (product) => {
          const response = await fetch(
            `https://fakestoreapi.com/products/${product.productId}`
          )
          const data = await response.json()
          return { ...data, quantity: product.quantity }
        })
        const products = await Promise.all(productPromises)
        setProductsDetails(products)
      }
    }

    fetchProductsDetails()
  }, [cart])

  return (
    <>
      <Button ref={btnRef} colorScheme='gray' onClick={onOpen}>
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
            stroke-linecap='round'
            stroke-linejoin='round'
            stroke-width='32'
          />
          <circle
            cx='400'
            cy='416'
            r='16'
            fill='none'
            stroke='currentColor'
            stroke-linecap='round'
            stroke-linejoin='round'
            stroke-width='32'
          />
          <path
            fill='none'
            stroke='currentColor'
            stroke-linecap='round'
            stroke-linejoin='round'
            stroke-width='32'
            d='M48 80h64l48 272h256'
          />
          <path
            d='M160 288h249.44a8 8 0 007.85-6.43l28.8-144a8 8 0 00-7.85-9.57H128'
            fill='none'
            stroke='currentColor'
            stroke-linecap='round'
            stroke-linejoin='round'
            stroke-width='32'
          />
        </svg>
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
              {productsDetails.length > 0 &&
                productsDetails.map((productDetail) => (
                  <div className='flex gap-2' key={productDetail.id}>
                    <Box maxW='120px' maxH='5px'>
                      <Image
                        src={productDetail.image}
                        alt='images'
                        width={60}
                        height={40}
                      />
                    </Box>
                    <div>
                      <Text isTruncated maxW='150px' className='font-bold mt-4'>
                        {productDetail.title}
                      </Text>
                      <Text isTruncated maxW='150px' className=' mt-4'>
                        {productDetail.description}
                      </Text>
                      <div className='flex gap-5 mt-10 bg-[#F6F6F6] justify-center items-center p-2 w-[125px] h-[40px]'>
                        <Button>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='8'
                            height='4'
                            viewBox='0 0 8 4'
                            fill='none'
                          >
                            <path
                              fill-rule='evenodd'
                              clip-rule='evenodd'
                              d='M6.1463 0.699463H1.47067C0.825429 0.699463 0.301758 1.22313 0.301758 1.86837C0.301758 2.51361 0.825429 3.03728 1.47067 3.03728H6.1463C6.79154 3.03728 7.31521 2.51361 7.31521 1.86837C7.31521 1.22313 6.79154 0.699463 6.1463 0.699463Z'
                              fill='#222222'
                            ></path>
                          </svg>
                        </Button>
                        <div>{productDetail.quantity}</div>
                        <Button>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='8'
                            height='8'
                            viewBox='0 0 8 8'
                            fill='none'
                          >
                            <path
                              fill-rule='evenodd'
                              clip-rule='evenodd'
                              d='M6.32159 2.69554H5.15268V1.52664C5.15268 0.881398 4.62901 0.357727 3.98378 0.357727C3.33854 0.357727 2.81487 0.881398 2.81487 1.52664V2.69554H1.64596C1.00072 2.69554 0.477051 3.21921 0.477051 3.86445C0.477051 4.50969 1.00072 5.03336 1.64596 5.03336H2.81487V6.20227C2.81487 6.84751 3.33854 7.37118 3.98378 7.37118C4.62901 7.37118 5.15268 6.84751 5.15268 6.20227V5.03336H6.32159C6.96683 5.03336 7.4905 4.50969 7.4905 3.86445C7.4905 3.21921 6.96683 2.69554 6.32159 2.69554Z'
                              fill='#222222'
                            ></path>
                          </svg>
                        </Button>
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
            <Button colorScheme='blue'>Buy now</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default ShowCart
