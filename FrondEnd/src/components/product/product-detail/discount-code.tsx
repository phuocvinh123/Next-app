import { Tooltip } from '@chakra-ui/react'
import Image from 'next/image'
import React from 'react'

const DiscountCode = () => {
  return (
    <>
      <div className='mt-6 flex items-center gap-5'>
        <div className='text-xl text-[#757575] w-[110px] font-normal'>
          Mã giám giá của shop
        </div>

        <div className='cursor-pointer flex items-center gap-8'>
          <div className='flex gap-8 flex-shrink overflow-hidden relative w-[550px] h-16'>
            <div className='absolute top-5'>
              <div className='flex gap-8 cursor-pointer '>
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
        <div className='text-xl text-[#08f] cursor-default'>Tìm hiểu thêm</div>
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
              <div className='flex gap-5 text-lg font-medium items-center'>
                <div className='flex gap-5 text-[#636363]'> Vận chuyển tới</div>

                <div className='flex gap-2 items-center cursor-pointer'>
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
              <div className='flex gap-5 text-lg font-medium items-center'>
                <div className='flex gap-5 text-[#636363]'> Phí vận chuyển</div>
                <div className='flex gap-2 items-center cursor-pointer'>
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
    </>
  )
}
export default DiscountCode
