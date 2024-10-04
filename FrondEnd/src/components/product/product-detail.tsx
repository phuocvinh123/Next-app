/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Divider,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
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
} from '@chakra-ui/react'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { toast } from 'react-toastify'
import ProductSwiper from '@/components/product/product-detail/product-swiper'
import DiscountCode from '@/components/product/product-detail/discount-code'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/components/store/store'
import {
  setColor,
  setCurrentIndex,
  setQuantity,
  setSelectedIndex,
  setSelectedSize,
  setSize,
} from '@/components/slice/variant-slice'
import Denounce from '@/components/product/product-detail/denounce'
import { getCookie } from 'cookies-next'
import Swal from 'sweetalert2'
import ShowCart from '@/components/cart/show-cart'
import { setChange } from '@/components/slice/product-slice'
import {
  addToCartAPI,
  fetchProductDetailRequest,
} from '@/components/saga/variant-saga'
import RatingComponent from '@/components/product/product-detail/rating'

const ProductDetailComponent = () => {
  const { productId } = useParams()
  const customerId = getCookie('customerId')
  const dispatch = useDispatch()
  const {
    variantDto,
    loading,
    currentIndex,
    selectedIndex,
    quantity,
    selectedSize,
    size,
    color,
  } = useSelector((state: RootState) => state.variant)
  const { change } = useSelector((state: RootState) => state.product)
  const [er, setEr] = useState(false)
  const thumbsSwiperRef = useRef<any>(null)
  const router = useRouter()
  const {
    isOpen: isOpenSize,
    onOpen: onOpenSize,
    onClose: onCloseSize,
  } = useDisclosure()

  useEffect(() => {
    if (productId) {
      const id = Array.isArray(productId) ? productId[0] : productId
      dispatch(fetchProductDetailRequest(id))
    }
  }, [dispatch, productId])

  let totalProduct = 0

  if (color) {
    totalProduct = variantDto.reduce((acc: any, variant: { images: any[] }) => {
      const matchingImage = variant.images.find((image) => image.id === color)
      if (matchingImage) {
        return acc + matchingImage.stock.quantity
      }
      return acc
    }, 0)
  } else {
    totalProduct = variantDto.reduce(
      (acc: any, variant: { images: { stock: { quantity: any } }[] }) => {
        return acc + variant.images[0].stock.quantity
      },
      0
    )
  }

  const handleMinus = () => {
    if (quantity <= 1) {
      return toast.warning('Số lượng đã chọn đã ít nhất 1')
    }
    dispatch(setQuantity(quantity - 1))
  }
  const handlePlus = () => {
    if (totalProduct) {
      if (quantity >= totalProduct) {
        return toast.warning('Số lượng đã chọn đã đạt tối đa')
      }
    }
    dispatch(setQuantity(quantity + 1))
  }

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value)
    if (totalProduct && value > totalProduct) {
      toast.warning(
        'Số lượng đã nhập vui lòng nhỏ hơn số lượng sản phẩm có sẵn'
      )
      return
    }
    dispatch(setQuantity(value))
  }

  const prices = variantDto.map((variant) => variant.images[0].price)
  const maxPrice = Math.max(...prices)
  const minPrice = Math.min(...prices)

  const showSuccessNotification = () => {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Sản phẩm đã được thêm vào giỏ hàng',
      showConfirmButton: false,
      timer: 1500,
    })
  }

  const handleAddProduct = async () => {
    if (
      selectedIndex != null &&
      selectedSize != null &&
      selectedIndex > -1 &&
      selectedSize > -1
    ) {
      const productData = {
        color,
        size,
        quantity,
        date: new Date().toISOString(),
        productId,
        customerId,
      }

      try {
        const result = await addToCartAPI(productData)
        console.log(result)
        dispatch(setChange(!change))
        showSuccessNotification()
      } catch (error) {
        console.error('Error adding product:', error)
        toast.warning('sản phẩm trong kho đã đạt tối đa')
      }
    } else {
      setEr(true)
    }
  }

  const handleByNow = async () => {
    if (
      selectedIndex != null &&
      selectedSize != null &&
      selectedIndex > -1 &&
      selectedSize > -1
    ) {
      const productData = {
        color,
        size,
        quantity,
        date: new Date().toISOString(),
        productId,
        customerId,
      }
      try {
        const result = await addToCartAPI(productData)
        console.log(result)
        dispatch(setChange(!change))
        router.push('/order-now')
      } catch (error) {
        console.error('Error adding product:', error)
        toast.warning('sản phẩm trong kho đã đạt tối đa')
      }
    } else {
      setEr(true)
    }
  }
  return (
    <>
      {loading && (
        <div className='fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50'>
          <Spinner size='xl' className='w-16 h-16' />
        </div>
      )}
      <div className='mx-auto container py-10'>
        <div className='flex justify-between'>
          <Breadcrumb>
            <BreadcrumbItem>
              <BreadcrumbLink href='/'>Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink href='#'>
                {' '}
                {variantDto.length > 0
                  ? variantDto[0].variant.product.title
                  : 'Sản phẩm không có'}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <ShowCart />
        </div>

        <div className='mt-5 p-5 flex gap-20'>
          <div className='w-[550px]'>
            <ProductSwiper
              variantDto={variantDto}
              currentIndex={currentIndex}
              setCurrentIndex={(index: any) => dispatch(setCurrentIndex(index))}
              thumbsSwiperRef={thumbsSwiperRef}
            />
          </div>
          <div>
            <div className='h-20 w-[850px] flex items-center overflow-hidden text-ellipsis line-clamp-2 text-3xl font-normal '>
              <span className='text-white bg-[#EE4D2D] rounded-sm px-1 mr-2 text-lg'>
                Yêu thích
              </span>
              <span>
                {variantDto.length > 0
                  ? variantDto[0].variant.product.title
                  : 'Sản phẩm không có'}
              </span>
            </div>
            <div className='flex justify-between'>
              <div className='flex'>
                <div className='flex gap-5 border-r-2 border-[#dbdbdb] pr-7'>
                  <div className='flex gap-5 text-xl text-[#EE4D2D] border-b border-[#EE4D2D] pb-1'>
                    4.9
                  </div>
                  <div className='flex items-center'>
                    <div>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='1.3em'
                        height='1.3em'
                        viewBox='0 0 64 64'
                      >
                        <path
                          fill='#EE4D2D'
                          d='M62 25.2H39.1L32 3l-7.1 22.2H2l18.5 13.7l-7 22.1L32 47.3L50.5 61l-7.1-22.2z'
                        />
                      </svg>
                    </div>
                    <div>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='1.4em'
                        height='1.4em'
                        viewBox='0 0 64 64'
                      >
                        <path
                          fill='#EE4D2D'
                          d='M62 25.2H39.1L32 3l-7.1 22.2H2l18.5 13.7l-7 22.1L32 47.3L50.5 61l-7.1-22.2z'
                        />
                      </svg>
                    </div>
                    <div>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='1.5em'
                        height='1.5em'
                        viewBox='0 0 64 64'
                      >
                        <path
                          fill='#EE4D2D'
                          d='M62 25.2H39.1L32 3l-7.1 22.2H2l18.5 13.7l-7 22.1L32 47.3L50.5 61l-7.1-22.2z'
                        />
                      </svg>
                    </div>
                    <div>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='1.4em'
                        height='1.4em'
                        viewBox='0 0 64 64'
                      >
                        <path
                          fill='#EE4D2D'
                          d='M62 25.2H39.1L32 3l-7.1 22.2H2l18.5 13.7l-7 22.1L32 47.3L50.5 61l-7.1-22.2z'
                        />
                      </svg>
                    </div>
                    <div>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='1.3em'
                        height='1.3em'
                        viewBox='0 0 64 64'
                      >
                        <path
                          fill='#EE4D2D'
                          d='M62 25.2H39.1L32 3l-7.1 22.2H2l18.5 13.7l-7 22.1L32 47.3L50.5 61l-7.1-22.2z'
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className='flex items-center justify-center gap-5 border-r-2 border-[#dbdbdb] pr-7 ml-5'>
                  <div className='text-xl font-medium text-[#dbdcdd] border-b-[0.5px] border-black pb-1'>
                    1,5K
                  </div>
                  <div className='text-xl text-[#767676]'>Đánh giá</div>
                </div>
                <div className='flex items-center justify-center gap-5  ml-5'>
                  <div className='text-xl font-medium '>7,7K</div>
                  <div className='text-xl text-[#767676]'>Đã bán</div>
                </div>
              </div>
              <Denounce />
            </div>
            <div className='bg-[#fafafa] mt-8'>
              <div className='py-10 px-5 flex items-center gap-4'>
                <div className='flex text-center items-center text-[#929292] line-through'>
                  <span className='text-xs '>₫</span>
                  <span className='text-xl'>250.000</span>
                </div>
                <div className='flex text-[#EE4D2D] font-medium'>
                  {selectedIndex != null &&
                  selectedSize != null &&
                  selectedIndex > -1 &&
                  selectedSize > -1 ? (
                    <>
                      <span className='text-xl'>₫</span>
                      <span className='text-3xl'>
                        {variantDto[selectedIndex]?.images[0].price.toFixed(3)}
                      </span>
                    </>
                  ) : (
                    <>
                      <span className='text-xl'>₫</span>
                      <span className='text-3xl'>{minPrice.toFixed(3)}</span>
                      <span className='text-3xl mx-4'>-</span>
                      <span className='text-xl'>₫</span>
                      <span className='text-3xl'>{maxPrice.toFixed(3)}</span>
                    </>
                  )}
                </div>
                <div className='bg-[#EE4D2D] h-6 px-1 rounded-sm text-white'>
                  36% giảm
                </div>
              </div>
            </div>
            <DiscountCode />
            <div className={`${er ? 'bg-[#fff5f5] pb-12 pt-2' : ''}`}>
              <div className='mt-6 flex gap-5'>
                <div className='text-xl mt-2 text-[#757575] w-[110px] font-normal'>
                  {er ? '' : 'Màu sắc'}
                </div>
                <div className='w-full ml-4 h-[230px] flex flex-wrap gap-5 overflow-y-auto '>
                  {variantDto.map((variant: any, index: any) => {
                    const isSelectable = size
                      ? variant.imageSizes.some((v: any) => v.sizeName === size)
                      : true
                    const isColorAvailable =
                      variant.images[0].stock.quantity > 0
                    return (
                      <button
                        key={variant.variant.color.id}
                        className={`relative flex items-center gap-2 border-[1px] p-2 border-solid ${
                          er ? 'bg-white' : ''
                        }
        ${
          selectedIndex === index
            ? 'border-[#ee4d2d] !important text-[#ee4d2d]'
            : ''
        }
        ${
          isSelectable && isColorAvailable
            ? 'hover:border-[#ee4d2d] hover:text-[#ee4d2d] cursor-pointer'
            : 'border-gray-400 text-gray-400 cursor-not-allowed'
        }
      `}
                        onClick={() => {
                          if (isSelectable && isColorAvailable) {
                            if (selectedIndex === index) {
                              dispatch(setSelectedIndex(-1))
                              dispatch(setSize(''))
                            } else {
                              dispatch(setSize(''))
                              if (
                                thumbsSwiperRef.current &&
                                thumbsSwiperRef.current.swiper
                              ) {
                                thumbsSwiperRef.current.swiper.slideToLoop(
                                  index
                                )
                              }
                              dispatch(setSelectedIndex(index))
                              dispatch(setCurrentIndex(index))
                              dispatch(setColor(variant.images[0].id))
                              if (
                                selectedIndex != null &&
                                selectedSize != null
                              ) {
                                setEr(false)
                              }
                            }
                          }
                        }}
                        onMouseEnter={() => {
                          if (
                            isSelectable &&
                            isColorAvailable &&
                            thumbsSwiperRef.current &&
                            thumbsSwiperRef.current.swiper
                          ) {
                            thumbsSwiperRef.current.swiper.slideToLoop(index)
                            setCurrentIndex(index)
                          }
                        }}
                        disabled={!isSelectable || !isColorAvailable}
                      >
                        <Image
                          src={variant.images[0].url}
                          alt='image'
                          width={20}
                          height={20}
                        />
                        <div className='text-xl'>
                          {variant.variant.color.nameColor}
                        </div>
                        <div
                          className={`${
                            selectedIndex === index ? '' : 'hidden'
                          } absolute bottom-0 right-0`}
                        >
                          <div className='w-0 h-0 border-l-[17px] border-l-transparent border-b-[17px] border-b-[#ee4d2d] flex justify-end items-end'></div>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth='3'
                            stroke='white'
                            className='size-3 absolute top-1 right-0'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              d='m4.5 12.75 6 6 9-13.5'
                            />
                          </svg>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
              <div className='mt-6 flex gap-5'>
                <div className='text-xl mt-2 text-[#757575] w-[110px] font-normal'>
                  {er ? '' : 'Size'}
                </div>
                <div>
                  <div className='flex gap-2'>
                    {variantDto.length > 0 ? (
                      Array.from(
                        new Set(
                          variantDto.flatMap((variant: any) =>
                            variant.imageSizes.map((size: any) => size.sizeName)
                          )
                        )
                      ).map((sizeName: any, index) => {
                        const isSelectable = color
                          ? variantDto.some((variant: any) =>
                              variant.imageSizes.some(
                                (size: any) =>
                                  size.sizeName === sizeName &&
                                  size.imageId === color
                              )
                            )
                          : true

                        return (
                          <button
                            key={index}
                            className={`relative text-xl px-5 py-2 
                              ${er ? 'bg-white' : ''}
                              ${
                                selectedSize === index
                                  ? 'border-[#ee4d2d] text-[#ee4d2d]'
                                  : ''
                              } border-[1px] hover:border-[#ee4d2d] hover:text-[#ee4d2d] cursor-pointer ${
                              isSelectable
                                ? ''
                                : 'border-gray-400 text-gray-400 cursor-not-allowed'
                            }`}
                            onClick={() => {
                              if (isSelectable) {
                                if (selectedSize === index) {
                                  dispatch(setSelectedSize(-1))
                                  dispatch(setColor(''))
                                } else {
                                  dispatch(setSelectedSize(index))
                                  dispatch(setSize(sizeName))
                                  if (
                                    selectedIndex != null &&
                                    selectedSize != null
                                  ) {
                                    setEr(false)
                                  }
                                }
                              }
                            }}
                            disabled={!isSelectable}
                          >
                            Size {sizeName}
                            <div
                              className={`${
                                selectedSize === index ? '' : 'hidden'
                              } absolute bottom-0 right-0`}
                            >
                              <div className='w-0 h-0 border-l-[17px] border-l-transparent border-b-[17px] border-b-[#ee4d2d] flex justify-end items-end'></div>
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 24 24'
                                strokeWidth='3'
                                stroke='white'
                                className='size-3 absolute top-1 right-0'
                              >
                                <path
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  d='m4.5 12.75 6 6 9-13.5'
                                />
                              </svg>
                            </div>
                          </button>
                        )
                      })
                    ) : (
                      <div>Không có kích thước nào để hiển thị.</div>
                    )}
                  </div>
                  <div
                    className='flex mt-6 text-xl items-center cursor-pointer'
                    onClick={() => onOpenSize()}
                  >
                    <div>Bảng Quy Đổi Kích Cỡ</div>
                    <div>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth='2'
                        stroke='rgba(0, 0, 0, 0.54)'
                        className='size-6 ml-2'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='m8.25 4.5 7.5 7.5-7.5 7.5'
                        />
                      </svg>
                    </div>
                    <Modal onClose={onCloseSize} isOpen={isOpenSize} size='5xl'>
                      <ModalOverlay />
                      <ModalContent>
                        <ModalCloseButton />
                        <ModalBody>
                          <Text className='text-3xl pt-10'>
                            Bảng Quy Đổi Kích Cỡ
                          </Text>
                          <Text className='text-xl mt-2'>
                            Bảng Quy Đổi Kích Cỡ
                          </Text>
                          <Text className='text-lg text-[#757575]'>
                            Thông số trong Bảng quy đổi kích cỡ này được Người
                            bán cung cấp và có thể sẽ chênh lệch 1-2 cm so với
                            thực tế.
                          </Text>
                          <div className='mt-8 pb-60'>
                            <TableContainer className='border-[1px] border-[#757575]'>
                              <Table variant='striped' colorScheme='gray'>
                                <Thead>
                                  <Tr>
                                    <Th textAlign='center'>Size (Quốc Tế)</Th>
                                    <Th textAlign='center'>Vai (cm)</Th>
                                    <Th textAlign='center'>
                                      Chiều dài áo (cm)
                                    </Th>
                                    <Th textAlign='center'>Eo (cm)</Th>
                                    <Th textAlign='center'>
                                      Chiều dài áo (cm)
                                    </Th>
                                  </Tr>
                                </Thead>
                                <Tbody>
                                  <Tr>
                                    <Td textAlign='center'>M</Td>
                                    <Td textAlign='center'>51</Td>
                                    <Td textAlign='center'>71</Td>
                                    <Td textAlign='center'>55</Td>
                                    <Td textAlign='center'>24</Td>
                                  </Tr>
                                  <Tr>
                                    <Td textAlign='center'>L</Td>
                                    <Td textAlign='center'>52</Td>
                                    <Td textAlign='center'>73</Td>
                                    <Td textAlign='center'>57</Td>
                                    <Td textAlign='center'>25</Td>
                                  </Tr>
                                  <Tr>
                                    <Td textAlign='center'>XL</Td>
                                    <Td textAlign='center'>53</Td>
                                    <Td textAlign='center'>76</Td>
                                    <Td textAlign='center'>59</Td>
                                    <Td textAlign='center'>26</Td>
                                  </Tr>
                                </Tbody>
                              </Table>
                            </TableContainer>
                          </div>
                        </ModalBody>
                      </ModalContent>
                    </Modal>
                  </div>
                </div>
              </div>
              <div className='mt-6 flex items-center gap-5'>
                <div className='text-xl text-[#757575] w-[110px] font-normal'>
                  {er ? '' : 'Số Lượng'}
                </div>
                <div className='flex gap-6 items-center'>
                  <div
                    className={` ${
                      er ? 'bg-white' : ''
                    } flex border justify-center items-center h-10`}
                  >
                    <button
                      className='flex items-center justify-center px-2 h-9 border-r-2 pr-2 cursor-pointer'
                      onClick={() => handleMinus()}
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
                          d='M5 12h14'
                        />
                      </svg>
                    </button>
                    <div className='w-10 flex justify-center items-center overflow-hidden mx-4'>
                      <input
                        className='w-8 text-center focus:outline-none'
                        value={quantity}
                        onChange={(e) => handleInput(e)}
                      />
                    </div>
                    <button
                      className='flex items-center justify-center px-2 h-9 border-l-2 pl-2 cursor-pointer'
                      onClick={() => handlePlus()}
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
                          d='M12 4.5v15m7.5-7.5h-15'
                        />
                      </svg>
                    </button>
                  </div>
                  <div className='text-[#757575] text-xl font-normal'>
                    {totalProduct} sản phẩm có sẵn
                  </div>
                </div>
              </div>
              <div
                className={`${
                  er ? 'mt-5 ml-32 text-xl font-normal' : 'hidden '
                } text-[#ee4d2d]`}
              >
                Vui lòng chọn phân loại hàng
              </div>
            </div>

            <div className='mt-10 flex gap-6'>
              <div className='flex gap-5 px-5 py-3 border-[#ee4d2d] border-[0.5px] bg-[#ffeee8] hover:bg-[#f7e6df] rounded-sm cursor-pointer'>
                <Image
                  src='https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/productdetailspage/0f3bf6e431b6694a9aac.svg'
                  alt='images'
                  width={30}
                  height={30}
                ></Image>
                <button
                  onClick={() => handleAddProduct()}
                  className='text-xl text-[#ee4d2d]'
                >
                  Thêm Vào Giỏ Hàng
                </button>
              </div>
              <button
                className='flex items-center px-16 text-xl py-3 text-white bg-[#ee4d2d] rounded-sm cursor-pointer'
                onClick={() => handleByNow()}
              >
                Mua Ngay
              </button>
            </div>
            <div className='mt-10'>
              <Divider />
            </div>
          </div>
        </div>
      </div>

      <RatingComponent productId={Number(productId)} />
    </>
  )
}

export default ProductDetailComponent
