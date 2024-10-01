/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react'
import Image from 'next/image'
import { useRef, useState } from 'react'
import { Swiper as SwiperType } from 'swiper/types'
import { FreeMode, Navigation, Thumbs } from 'swiper/modules'
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'
import 'swiper/swiper-bundle.css'
import { ProductSwiperProps } from '@/components/interfaces/interface'
import React from 'react'

const ProductSwiper: React.FC<ProductSwiperProps> = ({
  variantDto,
  currentIndex,
  setCurrentIndex,
  thumbsSwiperRef,
}) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null)
  const swiperRef = useRef<SwiperRef | null>(null)
  const {
    isOpen: isOpenImages,
    onOpen: onOpenImages,
    onClose: onCloseImages,
  } = useDisclosure()

  const openImageModal = (index: number) => {
    setCurrentIndex(index + 1)
    onOpenImages()
  }

  return (
    <>
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
        {variantDto.map((variant, index) => (
          <SwiperSlide
            key={variant.variant.product.id}
            className='h-[450px]'
            onClick={() => openImageModal(index)}
          >
            <Image
              src={variant.images[0].url}
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
                  initialSlide={currentIndex ? currentIndex - 1 : 0}
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
                  {variantDto.map((variant) => (
                    <SwiperSlide key={variant.images[0].id}>
                      <Image
                        src={variant.images[0].url}
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
                  {variantDto.length > 0
                    ? variantDto[0].variant.product.title
                    : 'Không có tên sản phẩm'}
                </div>
                <div className='flex gap-2 flex-wrap mt-5'>
                  {variantDto.map((variant) => (
                    <div
                      key={variant.images[0].id}
                      className={`w-[100px] h-[100px] border-2 ${
                        currentIndex === variant.images[0].id
                          ? 'border-red-500'
                          : 'border-transparent'
                      }`}
                    >
                      <Image
                        src={variant.images[0].url}
                        alt='image'
                        width={100}
                        height={120}
                        onClick={() => {
                          if (swiperRef.current && swiperRef.current.swiper) {
                            swiperRef.current.swiper.slideTo(
                              variant.images[0].id - 1
                            )
                          }
                          setCurrentIndex(variant.images[0].id)
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
        {variantDto.map((variant, index) => (
          <SwiperSlide
            key={variant.variant.product.id}
            onClick={() => openImageModal(index)}
            onMouseEnter={() => {
              if (thumbsSwiperRef.current && thumbsSwiperRef.current.swiper) {
                thumbsSwiperRef.current.swiper.slideToLoop(index)
              }
              setCurrentIndex(index)
            }}
          >
            <Image
              alt='images'
              src={variant.images[0].url}
              width={82}
              height={82}
            />
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
                  <stop offset='0%' stopColor='#09f' />
                  <stop offset='60.975%' stopColor='#a033ff' />
                  <stop offset='93.482%' stopColor='#ff5280' />
                  <stop offset='100%' stopColor='#ff7061' />
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
    </>
  )
}
export default ProductSwiper
