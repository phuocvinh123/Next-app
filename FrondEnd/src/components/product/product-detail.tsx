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
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tooltip,
  Tr,
  useDisclosure,
} from '@chakra-ui/react'
import { useParams } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'
import 'swiper/swiper-bundle.css'
import { FreeMode, Navigation, Thumbs } from 'swiper/modules'
import Image from 'next/image'
import { Swiper as SwiperType } from 'swiper/types'
import { Images } from '@/components/interfaces/interface'

const ProductDetailComponent = () => {
  const { productId } = useParams()
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null)
  const [images, setImages] = useState<Images[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const swiperRef = useRef<any>(null)
  const thumbsSwiperRef = useRef<any>(null)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const {
    isOpen: isOpenSize,
    onOpen: onOpenSize,
    onClose: onCloseSize,
  } = useDisclosure()
  const {
    isOpen: isOpenImages,
    onOpen: onOpenImages,
    onClose: onCloseImages,
  } = useDisclosure()
  const [quantity, setQuantity] = useState(1)
  const [selectdeSize, setSelectedSize] = useState<number | null>(null)

  useEffect(() => {
    const fetchProductsDetail = async () => {
      try {
        const url = `http://localhost:9002/api/products/images/${productId}`
        const response = await fetch(url)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        setImages(data)
      } catch (err) {
        console.log('Something went wrong. Please try again.')
      }
    }

    fetchProductsDetail()
  }, [productId])

  const handleMinus = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1))
  }

  const handlePlus = () => {
    setQuantity((prevQuantity) => prevQuantity + 1)
  }

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value)
    setQuantity(value)
  }

  // const images = Array.from(
  //   { length: 5 },
  //   (_, index) => `https://swiperjs.com/demos/images/nature-${index + 1}.jpg`
  // )
  const openImageModal = (index: number) => {
    console.log(index + 1)

    setCurrentIndex(index + 1)
    onOpenImages()
  }

  return (
    <div className='mx-auto container py-10'>
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink href='/'>Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink href='#'>
            {' '}
            {images.length > 0 ? images[0].product.title : 'Sản phẩm không có'}
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <div className='mt-5 p-5 flex gap-20'>
        <div className='w-[550px]'>
          <Swiper
            ref={thumbsSwiperRef}
            loop={true}
            spaceBetween={10}
            watchSlidesProgress={true}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[FreeMode, Navigation, Thumbs]}
            onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex)}
            className='mySwiper2'
          >
            {images.map((image, index) => (
              <SwiperSlide
                key={image.id}
                className='h-[450px]'
                onClick={() => openImageModal(index)}
              >
                <Image
                  src={image.url}
                  alt='images'
                  width={450}
                  height={450}
                  objectFit='cover'
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <Modal isOpen={isOpenImages} onClose={onCloseImages} size='5xl'>
            <ModalOverlay />
            <ModalContent>
              <ModalBody display='flex' flexDirection='column'>
                <div className='flex gap-5'>
                  <div className='w-[616px] h-[616px]'>
                    <Swiper
                      ref={swiperRef}
                      style={
                        {
                          '--swiper-navigation-color': '#fff',
                          '--swiper-pagination-color': '#fff',
                        } as React.CSSProperties
                      }
                      initialSlide={currentIndex - 1}
                      slidesPerView={1}
                      spaceBetween={10}
                      loop={true}
                      navigation={true}
                      watchSlidesProgress={true}
                      modules={[FreeMode, Navigation, Thumbs]}
                      onSlideChange={(swiper) => {
                        setCurrentIndex(swiper.activeIndex + 1)
                      }}
                      className='mySwiper3'
                    >
                      {images.map((image) => (
                        <SwiperSlide key={image.id}>
                          <Image
                            src={image.url}
                            alt='Current'
                            width={516}
                            height={516}
                            objectFit='cover'
                          />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                  <div>
                    <div className='line-clamp-2 text-2xl font-medium mt-8'>
                      {images.length > 0
                        ? images[0].product.title
                        : 'Không có tên sản ph'}
                    </div>
                    <div className='flex gap-2 flex-wrap mt-5'>
                      {images.map((image) => (
                        <div
                          key={image.id}
                          className={`w-[100px] h-[100px] border-2 ${
                            currentIndex === image.id
                              ? 'border-red-500'
                              : 'border-transparent'
                          }`}
                        >
                          <Image
                            src={image.url}
                            alt='image'
                            width={100}
                            height={120}
                            onClick={() => {
                              if (
                                swiperRef.current &&
                                swiperRef.current.swiper
                              ) {
                                swiperRef.current.swiper.slideTo(image.id - 1)
                              }
                              setCurrentIndex(image.id)
                            }}
                            className='cursor-pointer'
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </ModalBody>
            </ModalContent>
          </Modal>

          <Swiper
            style={
              {
                '--swiper-navigation-color': '#fff',
                '--swiper-pagination-color': '#fff',
              } as React.CSSProperties
            }
            onSwiper={setThumbsSwiper}
            loop={true}
            spaceBetween={10}
            slidesPerView={5}
            freeMode={true}
            navigation={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className='mySwiper mt-5'
          >
            {images.map((image, index) => (
              <SwiperSlide
                key={image.id}
                onClick={() => openImageModal(index)}
                onMouseEnter={() => {
                  if (
                    thumbsSwiperRef.current &&
                    thumbsSwiperRef.current.swiper
                  ) {
                    thumbsSwiperRef.current.swiper.slideToLoop(index)
                  }
                  setCurrentIndex(index)
                }}
              >
                <Image alt='images' src={image.url} width={82} height={82} />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className='mt-8 flex items-center'>
            <div className='flex gap-4 items-center h-10 border-r-2 border-[#e8e8e8] pr-10'>
              <div className='text-2xl font-normal'>Chia sẻ: </div>
              <div>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='2em'
                  height='2em'
                  viewBox='0 0 256 256'
                >
                  <defs>
                    <radialGradient
                      id='logosMessenger0'
                      cx='19.247%'
                      cy='99.465%'
                      r='108.96%'
                      fx='19.247%'
                      fy='99.465%'
                    >
                      <stop offset='0%' stop-color='#09f' />
                      <stop offset='60.975%' stop-color='#a033ff' />
                      <stop offset='93.482%' stop-color='#ff5280' />
                      <stop offset='100%' stop-color='#ff7061' />
                    </radialGradient>
                  </defs>
                  <path
                    fill='url(#logosMessenger0)'
                    d='M128 0C55.894 0 0 52.818 0 124.16c0 37.317 15.293 69.562 40.2 91.835c2.09 1.871 3.352 4.493 3.438 7.298l.697 22.77c.223 7.262 7.724 11.988 14.37 9.054L84.111 243.9a10.22 10.22 0 0 1 6.837-.501c11.675 3.21 24.1 4.92 37.052 4.92c72.106 0 128-52.818 128-124.16S200.106 0 128 0'
                  />
                  <path
                    fill='#fff'
                    d='m51.137 160.47l37.6-59.653c5.98-9.49 18.788-11.853 27.762-5.123l29.905 22.43a7.68 7.68 0 0 0 9.252-.027l40.388-30.652c5.39-4.091 12.428 2.36 8.82 8.085l-37.6 59.654c-5.981 9.489-18.79 11.852-27.763 5.122l-29.906-22.43a7.68 7.68 0 0 0-9.25.027l-40.39 30.652c-5.39 4.09-12.427-2.36-8.818-8.085'
                  />
                </svg>
              </div>
              <div>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='2em'
                  height='2em'
                  viewBox='0 0 256 256'
                >
                  <path
                    fill='#1877f2'
                    d='M256 128C256 57.308 198.692 0 128 0S0 57.308 0 128c0 63.888 46.808 116.843 108 126.445V165H75.5v-37H108V99.8c0-32.08 19.11-49.8 48.348-49.8C170.352 50 185 52.5 185 52.5V84h-16.14C152.959 84 148 93.867 148 103.99V128h35.5l-5.675 37H148v89.445c61.192-9.602 108-62.556 108-126.445'
                  />
                  <path
                    fill='#fff'
                    d='m177.825 165l5.675-37H148v-24.01C148 93.866 152.959 84 168.86 84H185V52.5S170.352 50 156.347 50C127.11 50 108 67.72 108 99.8V128H75.5v37H108v89.445A129 129 0 0 0 128 256a129 129 0 0 0 20-1.555V165z'
                  />
                </svg>
              </div>
              <div>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='2em'
                  height='2em'
                  viewBox='0 0 256 256'
                >
                  <path
                    fill='#cb1f27'
                    d='M0 128.002c0 52.414 31.518 97.442 76.619 117.239c-.36-8.938-.064-19.668 2.228-29.393c2.461-10.391 16.47-69.748 16.47-69.748s-4.089-8.173-4.089-20.252c0-18.969 10.994-33.136 24.686-33.136c11.643 0 17.268 8.745 17.268 19.217c0 11.704-7.465 29.211-11.304 45.426c-3.207 13.578 6.808 24.653 20.203 24.653c24.252 0 40.586-31.149 40.586-68.055c0-28.054-18.895-49.052-53.262-49.052c-38.828 0-63.017 28.956-63.017 61.3c0 11.152 3.288 19.016 8.438 25.106c2.368 2.797 2.697 3.922 1.84 7.134c-.614 2.355-2.024 8.025-2.608 10.272c-.852 3.242-3.479 4.401-6.409 3.204c-17.884-7.301-26.213-26.886-26.213-48.902c0-36.361 30.666-79.961 91.482-79.961c48.87 0 81.035 35.364 81.035 73.325c0 50.213-27.916 87.726-69.066 87.726c-13.819 0-26.818-7.47-31.271-15.955c0 0-7.431 29.492-9.005 35.187c-2.714 9.869-8.026 19.733-12.883 27.421a127.9 127.9 0 0 0 36.277 5.249c70.684 0 127.996-57.309 127.996-128.005C256.001 57.309 198.689 0 128.005 0C57.314 0 0 57.309 0 128.002'
                  />
                </svg>
              </div>
              <div>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='2em'
                  height='2em'
                  viewBox='0 0 256 256'
                >
                  <g fill='none'>
                    <rect width='256' height='256' fill='#fff' rx='60' />
                    <rect width='256' height='256' fill='#1d9bf0' rx='60' />
                    <path
                      fill='#fff'
                      d='M199.572 91.411c.11 1.587.11 3.174.11 4.776c0 48.797-37.148 105.075-105.075 105.075v-.03A104.54 104.54 0 0 1 38 184.677q4.379.525 8.79.533a74.15 74.15 0 0 0 45.865-15.839a36.98 36.98 0 0 1-34.501-25.645a36.8 36.8 0 0 0 16.672-.636c-17.228-3.481-29.623-18.618-29.623-36.198v-.468a36.7 36.7 0 0 0 16.76 4.622c-16.226-10.845-21.228-32.432-11.43-49.31a104.8 104.8 0 0 0 76.111 38.582a36.95 36.95 0 0 1 10.683-35.283c14.874-13.982 38.267-13.265 52.249 1.601a74.1 74.1 0 0 0 23.451-8.965a37.06 37.06 0 0 1-16.234 20.424A73.5 73.5 0 0 0 218 72.282a75 75 0 0 1-18.428 19.13'
                    />
                  </g>
                </svg>
              </div>
            </div>
            <div className='flex items-center justify-center gap-4 ml-10'>
              <div>
                <svg width='24' height='20'>
                  <path
                    d='M19.469 1.262c-5.284-1.53-7.47 4.142-7.47 4.142S9.815-.269 4.532 1.262C-1.937 3.138.44 13.832 12 19.333c11.559-5.501 13.938-16.195 7.469-18.07z'
                    stroke='#FF424F'
                    strokeWidth='1.5'
                    fill='none'
                    fillRule='evenodd'
                    strokeLinejoin='round'
                  ></path>
                </svg>
              </div>

              <div className='text-xl font-normal'>Đã thích (5,2K)</div>
            </div>
          </div>
        </div>
        <div>
          <div className='h-20 w-[850px] flex items-center overflow-hidden text-ellipsis line-clamp-2 text-3xl font-normal '>
            <span className='text-white bg-[#EE4D2D] rounded-sm px-1 mr-2 text-lg'>
              Yêu thích
            </span>
            <span>
              {images.length > 0
                ? images[0].product.title
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
                  <div className='mt-1'>
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
                  <div className='mt-2'>
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
                  <div className='mt-1'>
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
            <div className='text-xl text-[#767676] text-center'>Tố cáo</div>
          </div>
          <div className='bg-[#fafafa] mt-8'>
            <div className='py-10 px-5 flex items-center gap-4'>
              <div className='flex text-center items-center text-[#929292] line-through'>
                <span className='text-xs '>₫</span>
                <span className='text-xl'>250.000</span>
              </div>
              <div className='flex text-[#EE4D2D] font-medium'>
                <span className='text-xl'>₫</span>
                <span className='text-3xl'>159.000</span>
                <span className='text-3xl mx-4'>-</span>
                <span className='text-xl'>₫</span>
                <span className='text-3xl'>170.000</span>
              </div>
              <div className='bg-[#EE4D2D] h-6 px-1 rounded-sm text-white'>
                36% giảm
              </div>
            </div>
          </div>
          <div className='mt-6 flex items-center gap-5'>
            <div className='text-xl text-[#757575] w-[110px] font-normal'>
              Mã giám giá của shop
            </div>
            <div className='flex gap-8 flex-shrink overflow-hidden relative w-[550px] h-16'>
              <div className='absolute top-5'>
                <div className='flex gap-8 '>
                  <div className='ml-2 relative'>
                    <div className='absolute w-2 h-8 -left-1 '>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='-0.5 -0.5 4 16'
                        className='flex-none h-full -mr-px'
                      >
                        <path
                          d='M4 0h-3q-1 0 -1 1a1.2 1.5 0 0 1 0 3v0.333a1.2 1.5 0 0 1 0 3v0.333a1.2 1.5 0 0 1 0 3v0.333a1.2 1.5 0 0 1 0 3q0 1 1 1h3'
                          strokeWidth='1'
                          transform=''
                          stroke='#fbebed'
                          fill='#fbebed'
                        ></path>
                      </svg>
                    </div>
                    <div className='bg-[#fbebed] px-2 py-1 text-[#EE4D2D] font-semibold w-[92px]'>
                      Giảm ₫10k
                    </div>
                    <div className='absolute w-2 h-8 top-0 -right-2 '>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='-0.5 -0.5 4 16'
                        className='rotate-180 flex-none h-full -ml-px'
                      >
                        <path
                          d='M4 0h-3q-1 0 -1 1a1.2 1.5 0 0 1 0 3v0.333a1.2 1.5 0 0 1 0 3v0.333a1.2 1.5 0 0 1 0 3v0.333a1.2 1.5 0 0 1 0 3q0 1 1 1h3'
                          strokeWidth='1'
                          transform=''
                          stroke='#fbebed'
                          fill='#fbebed'
                        ></path>
                      </svg>
                    </div>
                  </div>
                  <div className='relative'>
                    <div className='absolute w-2 h-8 -left-1 '>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='-0.5 -0.5 4 16'
                        className='flex-none h-full -mr-px'
                      >
                        <path
                          d='M4 0h-3q-1 0 -1 1a1.2 1.5 0 0 1 0 3v0.333a1.2 1.5 0 0 1 0 3v0.333a1.2 1.5 0 0 1 0 3v0.333a1.2 1.5 0 0 1 0 3q0 1 1 1h3'
                          strokeWidth='1'
                          transform=''
                          stroke='#fbebed'
                          fill='#fbebed'
                        ></path>
                      </svg>
                    </div>
                    <div className='bg-[#fbebed] px-2 py-1 text-[#EE4D2D] font-semibold w-[92px]'>
                      Giảm ₫15k
                    </div>
                    <div className='absolute w-2 h-8 top-0 -right-2 '>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='-0.5 -0.5 4 16'
                        className='rotate-180 flex-none h-full -ml-px'
                      >
                        <path
                          d='M4 0h-3q-1 0 -1 1a1.2 1.5 0 0 1 0 3v0.333a1.2 1.5 0 0 1 0 3v0.333a1.2 1.5 0 0 1 0 3v0.333a1.2 1.5 0 0 1 0 3q0 1 1 1h3'
                          strokeWidth='1'
                          transform=''
                          stroke='#fbebed'
                          fill='#fbebed'
                        ></path>
                      </svg>
                    </div>
                  </div>
                  <div className='relative'>
                    <div className='absolute w-2 h-8 -left-1 '>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='-0.5 -0.5 4 16'
                        className='flex-none h-full -mr-px'
                      >
                        <path
                          d='M4 0h-3q-1 0 -1 1a1.2 1.5 0 0 1 0 3v0.333a1.2 1.5 0 0 1 0 3v0.333a1.2 1.5 0 0 1 0 3v0.333a1.2 1.5 0 0 1 0 3q0 1 1 1h3'
                          strokeWidth='1'
                          transform=''
                          stroke='#fbebed'
                          fill='#fbebed'
                        ></path>
                      </svg>
                    </div>
                    <div className='bg-[#fbebed] px-2 py-1 text-[#EE4D2D] font-semibold w-[92px]'>
                      10% Giảm
                    </div>
                    <div className='absolute w-2 h-8 top-0 -right-2 '>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='-0.5 -0.5 4 16'
                        className='rotate-180 flex-none h-full -ml-px'
                      >
                        <path
                          d='M4 0h-3q-1 0 -1 1a1.2 1.5 0 0 1 0 3v0.333a1.2 1.5 0 0 1 0 3v0.333a1.2 1.5 0 0 1 0 3v0.333a1.2 1.5 0 0 1 0 3q0 1 1 1h3'
                          strokeWidth='1'
                          transform=''
                          stroke='#fbebed'
                          fill='#fbebed'
                        ></path>
                      </svg>
                    </div>
                  </div>
                  <div className='relative'>
                    <div className='absolute w-2 h-8 -left-1 '>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='-0.5 -0.5 4 16'
                        className='flex-none h-full -mr-px'
                      >
                        <path
                          d='M4 0h-3q-1 0 -1 1a1.2 1.5 0 0 1 0 3v0.333a1.2 1.5 0 0 1 0 3v0.333a1.2 1.5 0 0 1 0 3v0.333a1.2 1.5 0 0 1 0 3q0 1 1 1h3'
                          strokeWidth='1'
                          transform=''
                          stroke='#fbebed'
                          fill='#fbebed'
                        ></path>
                      </svg>
                    </div>
                    <div className='bg-[#fbebed] px-2 py-1 text-[#EE4D2D] font-semibold w-[96px]'>
                      Giảm ₫20k
                    </div>
                    <div className='absolute w-2 h-8 top-0 -right-2 '>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='-0.5 -0.5 4 16'
                        className='rotate-180 flex-none h-full -ml-px'
                      >
                        <path
                          d='M4 0h-3q-1 0 -1 1a1.2 1.5 0 0 1 0 3v0.333a1.2 1.5 0 0 1 0 3v0.333a1.2 1.5 0 0 1 0 3v0.333a1.2 1.5 0 0 1 0 3q0 1 1 1h3'
                          strokeWidth='1'
                          transform=''
                          stroke='#fbebed'
                          fill='#fbebed'
                        ></path>
                      </svg>
                    </div>
                  </div>
                  <div className='relative'>
                    <div className='absolute w-2 h-8 -left-1 '>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='-0.5 -0.5 4 16'
                        className='flex-none h-full -mr-px'
                      >
                        <path
                          d='M4 0h-3q-1 0 -1 1a1.2 1.5 0 0 1 0 3v0.333a1.2 1.5 0 0 1 0 3v0.333a1.2 1.5 0 0 1 0 3v0.333a1.2 1.5 0 0 1 0 3q0 1 1 1h3'
                          strokeWidth='1'
                          transform=''
                          stroke='#fbebed'
                          fill='#fbebed'
                        ></path>
                      </svg>
                    </div>
                    <div className='bg-[#fbebed] px-2 py-1 text-[#EE4D2D] font-semibold w-[92px]'>
                      Giảm ₫10k
                    </div>
                    <div className='absolute w-2 h-8 top-0 -right-2 '>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='-0.5 -0.5 4 16'
                        className='rotate-180 flex-none h-full -ml-px'
                      >
                        <path
                          d='M4 0h-3q-1 0 -1 1a1.2 1.5 0 0 1 0 3v0.333a1.2 1.5 0 0 1 0 3v0.333a1.2 1.5 0 0 1 0 3v0.333a1.2 1.5 0 0 1 0 3q0 1 1 1h3'
                          strokeWidth='1'
                          transform=''
                          stroke='#fbebed'
                          fill='#fbebed'
                        ></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='flex gap-2 items-center'>
              <div className='text-xl text-[#EE4D2D]'>Xem tất cả</div>
              <div className='border rounded-full bg-[#EE4D2D]'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='white'
                  className='size-4'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='m19.5 8.25-7.5 7.5-7.5-7.5'
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className='mt-6 flex items-center gap-5'>
            <div className='text-xl text-[#757575] w-[110px] font-normal'>
              Chính sách trả hàng
            </div>
            <div className='flex gap-2'>
              <Image
                src='https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/productdetailspage/b69402e4275f823f7d47.svg'
                alt='images'
                width={20}
                height={20}
              ></Image>
              <div className='text-xl text-[#555]'>Trả hàng 15 ngày</div>
            </div>
            <div className='text-xl text-[#757575]'>Đổi ý miễn phí</div>
            <Tooltip
              hasArrow
              label='Miễn phí Trả hàng trong 15 ngày nếu Đổi ý (hàng trả phải còn nguyên seal, tem, hộp sản phẩm), áp dụng cho một số sản phẩm nhất định. Ngoài ra, tại thời điểm nhận hàng, bạn có thể đồng kiểm và được trả hàng miễn phí. '
              bg='white'
              color='black'
              maxWidth='600px'
            >
              <Image
                src='https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/productdetailspage/be6f27f93268c0f88ded.svg'
                alt='images'
                width={18}
                height={18}
              ></Image>
            </Tooltip>
          </div>
          <div className='mt-6 flex items-center gap-5'>
            <div className='text-xl text-[#757575] w-[110px] font-normal'>
              Deal sốc
            </div>
            <div className='text-[#EE4D2D] bg-[#fbebed] font-medium py-1 px-2 text-lg'>
              Mua để nhận quà
            </div>
          </div>
          <div className='mt-6 flex items-center gap-5'>
            <div className='text-xl text-[#757575] w-[110px] font-normal'>
              Bảo Hiểm
            </div>
            <div className='flex items-center gap-2'>
              <div className='text-xl font-normal'>Bảo hiểm thời trang</div>
              <div className='bg-[#ee4d2d] rounded-tl-md rounded-tr-md rounded-br-md text-white font-medium h-[16px] leading-[16px] ml-1 px-[5px] text-sm'>
                Mới
              </div>
            </div>
            <div className='text-xl text-[#08f] cursor-default'>
              Tìm hiểu thêm
            </div>
          </div>
          <div className='mt-6 flex gap-5'>
            <div className='text-xl text-[#757575] w-[110px] font-normal '>
              Vận chuyển
            </div>
            <div>
              <div className='flex items-center gap-2'>
                <Image
                  src='https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/productdetailspage/d9e992985b18d96aab90.png'
                  alt='images'
                  width={30}
                  height={30}
                ></Image>
                <div className='font-medium'>Miễn phí vận chuyển</div>
              </div>
              <div className='mt-4 flex gap-5'>
                <div className='mt-2'>
                  <Image
                    src='https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/productdetailspage/baa823ac1c58392c2031.svg'
                    alt='image'
                    width={20}
                    height={20}
                  ></Image>
                </div>
                <div>
                  <div className='flex gap-5 text-xl font-medium items-center'>
                    <div className='flex gap-5 text-[#757575]'>
                      {' '}
                      Vận chuyển tới
                    </div>

                    <div className='flex gap-2'>
                      <div>Phước Lý 12</div>
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
                          d='m19.5 8.25-7.5 7.5-7.5-7.5'
                        />
                      </svg>
                    </div>
                  </div>
                  <div className='flex gap-5 text-xl font-medium items-center'>
                    <div className='flex gap-5 text-[#757575]'>
                      {' '}
                      Phí vận chuyển
                    </div>
                    <div className='flex gap-2'>
                      <div className='flex item'>
                        <span className='text-xs'>₫</span>
                        <span>0</span>
                      </div>
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
                          d='m19.5 8.25-7.5 7.5-7.5-7.5'
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='mt-6 flex gap-5'>
            <div className='text-xl mt-2 text-[#757575] w-[110px] font-normal'>
              Màu sắc
            </div>
            <div className='w-full ml-4 h-[230px] flex flex-wrap gap-5 overflow-y-auto '>
              {images.map((image, index) => (
                <button
                  key={image.id}
                  className={`relative flex items-center gap-2 border-[1px] p-2 border-solid 
   ${
     selectedIndex === index ? 'border-[#ee4d2d] !important text-[#ee4d2d]' : ''
   }
      hover:border-[#ee4d2d] hover:text-[#ee4d2d] cursor-pointer`}
                  onClick={() => {
                    if (
                      thumbsSwiperRef.current &&
                      thumbsSwiperRef.current.swiper
                    ) {
                      thumbsSwiperRef.current.swiper.slideToLoop(index)
                    }
                    setSelectedIndex(index)
                    setCurrentIndex(index)
                  }}
                  onMouseEnter={() => {
                    if (
                      thumbsSwiperRef.current &&
                      thumbsSwiperRef.current.swiper
                    ) {
                      thumbsSwiperRef.current.swiper.slideToLoop(index)
                    }
                    setCurrentIndex(index)
                  }}
                >
                  <Image src={image.url} alt='image' width={20} height={20} />
                  <div className='text-xl'>{image.color.nameColor}</div>
                  <div
                    className={`${
                      selectedIndex === index ? '' : 'hidden'
                    } absolute bottom-0 right-0`}
                  >
                    <div className=' w-0 h-0 border-l-[17px] border-l-transparent border-b-[17px] border-b-[#ee4d2d] flex justify-end items-end'></div>
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
              ))}
            </div>
          </div>
          <div className='mt-6 flex gap-5'>
            <div className='text-xl mt-2 text-[#757575] w-[110px] font-normal'>
              Size
            </div>
            <div>
              <div className='flex gap-2'>
                {images.length > 0 && images[0].size ? (
                  images[0].size.map((size, index) => (
                    <div
                      key={size.id}
                      className={`relative text-xl px-5 py-2  ${
                        selectdeSize === index
                          ? 'border-[#ee4d2d] text-[#ee4d2d]'
                          : ''
                      }  border-[1px] hover:border-[1px] hover:border-[#ee4d2d] hover:text-[#ee4d2d] cursor-pointer`}
                      onClick={() => setSelectedSize(index)}
                    >
                      Size {size.sizeName}
                      <div
                        className={`${
                          selectdeSize === index ? '' : 'hidden'
                        } absolute bottom-0 right-0`}
                      >
                        <div className=' w-0 h-0 border-l-[17px] border-l-transparent border-b-[17px] border-b-[#ee4d2d] flex justify-end items-end'></div>
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
                    </div>
                  ))
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
                      <Text className='text-xl mt-2'>Bảng Quy Đổi Kích Cỡ</Text>
                      <Text className='text-lg text-[#757575]'>
                        Thông số trong Bảng quy đổi kích cỡ này được Người bán
                        cung cấp và có thể sẽ chênh lệch 1-2 cm so với thực tế.
                      </Text>
                      <div className='mt-8 pb-60'>
                        <TableContainer className='border-[1px] border-[#757575]'>
                          <Table variant='striped' colorScheme='gray'>
                            <Thead>
                              <Tr>
                                <Th textAlign='center'>Size (Quốc Tế)</Th>
                                <Th textAlign='center'>Vai (cm)</Th>
                                <Th textAlign='center'>Chiều dài áo (cm)</Th>
                                <Th textAlign='center'>Eo (cm)</Th>
                                <Th textAlign='center'>Chiều dài áo (cm)</Th>
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
              Số Lượng
            </div>
            <div className='flex gap-6 items-center'>
              <div className='flex border justify-center items-center h-10'>
                <div
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
                </div>
                <div className='w-10 flex justify-center items-center overflow-hidden mx-4'>
                  <input
                    className='w-8 text-center focus:outline-none'
                    value={quantity}
                    onChange={(e) => handleInput(e)}
                  />
                </div>
                <div
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
                </div>
              </div>
              <div className='text-[#757575] text-xl font-normal'>
                3650 sản phẩm có sẵn
              </div>
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
              <div className='text-xl text-[#ee4d2d]'>Thêm Vào Giỏ Hàng</div>
            </div>
            <div className='flex items-center px-16 text-xl py-3 text-white bg-[#ee4d2d] rounded-sm cursor-pointer '>
              Mua Ngay
            </div>
          </div>
          <div className='mt-10'>
            <Divider />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailComponent
