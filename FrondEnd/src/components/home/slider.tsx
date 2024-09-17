'use client'

/* eslint-disable react/no-unescaped-entities */
import React, { useRef, useState } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const Slide = () => (
  <div className='max-w-[730px] h-[391px] rounded-[20px] bg-[#FFF] flex items-center justify-center relative'>
    <p className='max-w-[566px] sm:text-[26px] text-lg font-normal leading-[39px] text-[#94A2B3] text-center relative z-10'>
      No other eCommerce platform allows people to start for free and grow their
      store as their business grows. More importantly, WooCommerce doesn't
      charge you a portion of your profits as your business grows!
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
)

export default function SimpleSlider() {
  const sliderRef = useRef<Slider | null>(null)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isEnd, setIsEnd] = useState(false)

  const settings = {
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    arrows: false,
    beforeChange: (current: number, next: number) => {
      setCurrentSlide(next)
      setIsEnd(next === 2)
    },
  }

  return (
    <div className='max-w-[728px] h-[391px] cursor-pointer relative'>
      <Slider ref={sliderRef} {...settings}>
        <Slide />
        <Slide />
        <Slide />
      </Slider>

      <button
        className={`absolute -bottom-[120px] right-56 scale-150 ${
          currentSlide === 0 ? 'opacity-30 scale-90' : 'opacity-100 scale-100'
        }`}
        onClick={() => sliderRef.current?.slickPrev()}
        disabled={currentSlide === 0}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='52'
          height='25'
          viewBox='0 0 52 25'
          fill='none'
        >
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M8.08689 0.916142C8.21994 0.971349 8.34078 1.05226 8.4425 1.15424C8.54449 1.25597 8.6254 1.37681 8.6806 1.50985C8.73581 1.64289 8.76423 1.78552 8.76423 1.92956C8.76423 2.0736 8.73581 2.21623 8.6806 2.34927C8.6254 2.48231 8.54449 2.60316 8.4425 2.70488L3.74066 7.40496H30.6344C30.9248 7.40496 31.2034 7.52033 31.4087 7.7257C31.6141 7.93107 31.7295 8.20961 31.7295 8.50004C31.7295 8.79048 31.6141 9.06902 31.4087 9.27438C31.2034 9.47975 30.9248 9.59513 30.6344 9.59513H3.74059L8.4425 14.2953C8.64813 14.5009 8.76365 14.7798 8.76365 15.0706C8.76365 15.3614 8.64813 15.6403 8.4425 15.8459C8.23688 16.0515 7.95799 16.1671 7.66718 16.1671C7.37638 16.1671 7.09749 16.0515 6.89186 15.8459L0.32135 9.2754C0.21937 9.17367 0.138458 9.05283 0.083252 8.91978C0.0280457 8.78674 -0.000371933 8.64412 -0.000371933 8.50008C-0.000371933 8.35603 0.0280457 8.21341 0.083252 8.08036C0.138458 7.94732 0.21937 7.82648 0.32135 7.72475L6.89186 1.15424C6.99359 1.05226 7.11443 0.971349 7.24747 0.916142C7.38052 0.860936 7.52314 0.83252 7.66718 0.83252C7.81123 0.83252 7.95385 0.860936 8.08689 0.916142Z'
            fill='black'
          />
        </svg>
      </button>
      <button
        className={`absolute -bottom-[116px] right-36 ${
          isEnd ? 'opacity-30 scale-90' : 'opacity-100 scale-100'
        }`}
        onClick={() => sliderRef.current?.slickNext()}
        disabled={isEnd}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='52'
          height='25'
          viewBox='0 0 52 25'
          fill='none'
        >
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M38.5445 0.13633C38.3276 0.226334 38.1306 0.358244 37.9648 0.524505C37.7985 0.690347 37.6666 0.887359 37.5766 1.10426C37.4866 1.32116 37.4402 1.55368 37.4402 1.78852C37.4402 2.02335 37.4866 2.25587 37.5766 2.47277C37.6666 2.68967 37.7985 2.88669 37.9648 3.05253L45.6302 10.7151H1.78533C1.31183 10.7151 0.857724 10.9032 0.52291 11.238C0.188097 11.5728 0 12.0269 0 12.5004C0 12.9739 0.188097 13.4281 0.52291 13.7629C0.857724 14.0977 1.31183 14.2858 1.78533 14.2858H45.6303L37.9648 21.9484C37.6295 22.2836 37.4412 22.7383 37.4412 23.2124C37.4412 23.6865 37.6295 24.1412 37.9648 24.4764C38.3 24.8117 38.7547 25 39.2288 25C39.7029 25 40.1575 24.8117 40.4928 24.4764L51.2047 13.7645C51.371 13.5986 51.5029 13.4016 51.5929 13.1847C51.6829 12.9678 51.7292 12.7353 51.7292 12.5005C51.7292 12.2656 51.6829 12.0331 51.5929 11.8162C51.5029 11.5993 51.371 11.4023 51.2047 11.2365L40.4928 0.524505C40.3269 0.358244 40.1299 0.226334 39.913 0.13633C39.6961 0.046327 39.4636 0 39.2288 0C38.9939 0 38.7614 0.046327 38.5445 0.13633Z'
            fill='black'
          />
        </svg>
      </button>
    </div>
  )
}
