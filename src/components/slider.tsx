/* eslint-disable react/no-unescaped-entities */
'use client'
import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
export default function SimpleSlider() {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 1,
  }
  return (
    <div className='w-[728px] h-[391px]'>
      <Slider {...settings}>
        <div>
          <div className='w-[730px] h-[391px] rounded-[20px] bg-[#FFF]  flex items-center justify-center relative '>
            <p className='w-[566px] text-[26px] font-normal leading-[39px] text-[#94A2B3] text-center relative z-10'>
              No other eCommerce platform allows people to start for free and
              grow their store as their business grows. More importantly,
              WooCommerce doesn't charge you a portion of your profits as your
              business grows!
            </p>
            <div className='absolute z-0 top-5'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='234'
                height='168'
                viewBox='0 0 234 168'
                fill='none'
              >
                <path
                  d='M2.12084 157.412C12.0181 147.059 19.7946 137.412 25.4501 128.471C31.1057 119.529 33.9335 112.235 33.9335 106.588C33.9335 103.294 32.7553 100.235 30.3988 97.4118C28.5136 94.5882 25.4501 91.5294 21.2085 88.2353C14.6103 83.0588 9.42598 77.6471 5.65559 72C1.8852 66.3529 0 58.8235 0 49.4117C0 34.8235 4.47732 23.0588 13.432 14.1176C22.3867 4.70588 33.6979 0 47.3656 0C61.9758 0 73.7583 4.70588 82.713 14.1176C92.139 23.0588 96.8519 34.8235 96.8519 49.4117C96.8519 67.7647 89.0755 88 73.5226 110.118C58.4411 131.765 38.1752 151.059 12.7251 168L2.12084 157.412ZM139.269 157.412C149.166 147.059 156.943 137.412 162.598 128.471C168.254 119.529 171.082 112.235 171.082 106.588C171.082 103.294 169.903 100.235 167.547 97.4118C165.662 94.5882 162.598 91.5294 158.356 88.2353C151.758 83.0588 146.574 77.6471 142.804 72C139.033 66.3529 137.148 58.8235 137.148 49.4117C137.148 34.8235 141.625 23.0588 150.58 14.1176C159.535 4.70588 170.846 0 184.514 0C199.124 0 210.906 4.70588 219.861 14.1176C229.287 23.0588 234 34.8235 234 49.4117C234 67.7647 226.224 88 210.671 110.118C195.589 131.765 175.323 151.059 149.873 168L139.269 157.412Z'
                  fill='#EDF0FD'
                />
              </svg>
            </div>
          </div>
        </div>
        <div>
          <div className='w-[730px] h-[391px] rounded-[20px] bg-[#FFF]  flex items-center justify-center relative  '>
            <p className='w-[566px] text-[26px] font-normal leading-[39px] text-[#94A2B3] text-center relative z-10'>
              No other eCommerce platform allows people to start for free and
              grow their store as their business grows. More importantly,
              WooCommerce doesn't charge you a portion of your profits as your
              business grows!
            </p>
            <div className='absolute z-0 top-5'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='234'
                height='168'
                viewBox='0 0 234 168'
                fill='none'
              >
                <path
                  d='M2.12084 157.412C12.0181 147.059 19.7946 137.412 25.4501 128.471C31.1057 119.529 33.9335 112.235 33.9335 106.588C33.9335 103.294 32.7553 100.235 30.3988 97.4118C28.5136 94.5882 25.4501 91.5294 21.2085 88.2353C14.6103 83.0588 9.42598 77.6471 5.65559 72C1.8852 66.3529 0 58.8235 0 49.4117C0 34.8235 4.47732 23.0588 13.432 14.1176C22.3867 4.70588 33.6979 0 47.3656 0C61.9758 0 73.7583 4.70588 82.713 14.1176C92.139 23.0588 96.8519 34.8235 96.8519 49.4117C96.8519 67.7647 89.0755 88 73.5226 110.118C58.4411 131.765 38.1752 151.059 12.7251 168L2.12084 157.412ZM139.269 157.412C149.166 147.059 156.943 137.412 162.598 128.471C168.254 119.529 171.082 112.235 171.082 106.588C171.082 103.294 169.903 100.235 167.547 97.4118C165.662 94.5882 162.598 91.5294 158.356 88.2353C151.758 83.0588 146.574 77.6471 142.804 72C139.033 66.3529 137.148 58.8235 137.148 49.4117C137.148 34.8235 141.625 23.0588 150.58 14.1176C159.535 4.70588 170.846 0 184.514 0C199.124 0 210.906 4.70588 219.861 14.1176C229.287 23.0588 234 34.8235 234 49.4117C234 67.7647 226.224 88 210.671 110.118C195.589 131.765 175.323 151.059 149.873 168L139.269 157.412Z'
                  fill='#EDF0FD'
                />
              </svg>
            </div>
          </div>
        </div>
        <div>
          <div className='w-[730px] h-[391px] rounded-[20px] bg-[#FFF] flex items-center justify-center relative '>
            <p className='w-[566px] text-[26px] font-normal leading-[39px] text-[#94A2B3] text-center relative z-10'>
              No other eCommerce platform allows people to start for free and
              grow their store as their business grows. More importantly,
              WooCommerce doesn't charge you a portion of your profits as your
              business grows!
            </p>
            <div className='absolute z-0 top-5'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='234'
                height='168'
                viewBox='0 0 234 168'
                fill='none'
              >
                <path
                  d='M2.12084 157.412C12.0181 147.059 19.7946 137.412 25.4501 128.471C31.1057 119.529 33.9335 112.235 33.9335 106.588C33.9335 103.294 32.7553 100.235 30.3988 97.4118C28.5136 94.5882 25.4501 91.5294 21.2085 88.2353C14.6103 83.0588 9.42598 77.6471 5.65559 72C1.8852 66.3529 0 58.8235 0 49.4117C0 34.8235 4.47732 23.0588 13.432 14.1176C22.3867 4.70588 33.6979 0 47.3656 0C61.9758 0 73.7583 4.70588 82.713 14.1176C92.139 23.0588 96.8519 34.8235 96.8519 49.4117C96.8519 67.7647 89.0755 88 73.5226 110.118C58.4411 131.765 38.1752 151.059 12.7251 168L2.12084 157.412ZM139.269 157.412C149.166 147.059 156.943 137.412 162.598 128.471C168.254 119.529 171.082 112.235 171.082 106.588C171.082 103.294 169.903 100.235 167.547 97.4118C165.662 94.5882 162.598 91.5294 158.356 88.2353C151.758 83.0588 146.574 77.6471 142.804 72C139.033 66.3529 137.148 58.8235 137.148 49.4117C137.148 34.8235 141.625 23.0588 150.58 14.1176C159.535 4.70588 170.846 0 184.514 0C199.124 0 210.906 4.70588 219.861 14.1176C229.287 23.0588 234 34.8235 234 49.4117C234 67.7647 226.224 88 210.671 110.118C195.589 131.765 175.323 151.059 149.873 168L139.269 157.412Z'
                  fill='#EDF0FD'
                />
              </svg>
            </div>
          </div>
        </div>
      </Slider>
    </div>
  )
}
