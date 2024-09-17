import Image from 'next/image'
import {
  Ellipse10,
  Ellipse11,
  Ellipse14,
  Ellipse15,
  Ellipse26,
  Ellipse27,
  Ellipse28,
  Ellipse29,
  Ellipse30,
  Ellipse5,
  Ellipse6,
  Ellipse9,
} from '../../../public/page'
import SimpleSlider from '@/components/home/slider'

/* eslint-disable react/no-unescaped-entities */
export const TestimonialSection = () => {
  const svgs = new Array(50).fill(0)
  return (
    <div className='bg-testimonial-background 3xl:max-w-[1920px] sm:h-[1009px] h-[890px] w-full overflow-hidden'>
      <div className='3xl:mt-[220px] mt-20 flex flex-col '>
        <div className='text-center sm:text-[55px] text-4xl font-bold leading-[70px] text-[#272D4E]'>
          Trusted by Agencies
          <br /> & Store Owners
        </div>
        <div className='flex items-center justify-center min-h-[calc(60vh-20px)] relative'>
          <div className='absolute -top-8 3xl:left-96 xl:left-52 left-4 lg:block hidden'>
            <Image
              src={Ellipse15}
              alt='images'
              width={136}
              height={136}
              className='relative z-10'
            ></Image>
            <div className='absolute top-10 z-0'>
              <Image
                src={Ellipse14}
                alt='images'
                width={124}
                height={124}
              ></Image>
            </div>
          </div>
          <div className='absolute -top-2 3xl:right-[440px] xl:right-56 right-16 lg:block hidden'>
            <Image
              src={Ellipse29}
              alt='images'
              width={94}
              height={94}
              className='relative z-10'
            ></Image>
            <div className='absolute top-2 z-0'>
              <Image
                src={Ellipse10}
                alt='images'
                width={84}
                height={84}
              ></Image>
            </div>
          </div>
          <div className='absolute top-48 3xl:left-[102px] left-0 lg:block hidden'>
            <Image
              src={Ellipse27}
              alt='images'
              width={93}
              height={93}
              className='relative z-10'
            ></Image>
            <div className='absolute top-6 z-0'>
              <Image src={Ellipse9} alt='images' width={93} height={93}></Image>
            </div>
          </div>
          <div className='absolute top-48 3xl:right-60 xl:right-40 right-0 lg:block hidden'>
            <Image
              src={Ellipse28}
              alt='images'
              width={154}
              height={154}
              className='relative z-10'
            ></Image>
            <div className='absolute top-6 z-0'>
              <Image
                src={Ellipse5}
                alt='images'
                width={130}
                height={130}
              ></Image>
            </div>
          </div>
          <div className='absolute bottom-0 3xl:left-64 xl:left-40 left-8 lg:block hidden'>
            <Image
              src={Ellipse26}
              alt='images'
              width={105}
              height={105}
              className='relative z-10'
            ></Image>
            <div className='absolute top-8 z-0'>
              <Image src={Ellipse6} alt='images' width={97} height={97}></Image>
            </div>
          </div>
          <div className='absolute -bottom-8 3xl:right-[400px] xl:right-56 right-8 lg:block hidden'>
            <Image
              src={Ellipse30}
              alt='images'
              width={89}
              height={89}
              className='relative z-10'
            ></Image>
            <div className='absolute top-8 z-0'>
              <Image
                src={Ellipse11}
                alt='images'
                width={79}
                height={79}
              ></Image>
            </div>
          </div>
          <div className='relative'>
            <div className='sm:max-w-[730px] max-w-[425px] mt-20 z-30 relative'>
              <SimpleSlider />
            </div>
            <div className='absolute sm:w-[678px]  w-[373px] h-[363px] rounded-[20px] bg-[#FFF] shadow-[0px_18px_52.85px_0px_#D7E4F980] -bottom-6 left-6 z-10'></div>
            <div className='absolute sm:w-[618px] w-[313px] h-[313px] rounded-[20px] bg-[#FFF] shadow-[0px_18px_52.85px_0px_#D7E4F980] -bottom-12 left-12 z-[9]'></div>
            <div className='absolute w-[450px] flex flex-wrap gap-10 top-10 -right-32  z-0'>
              {svgs.map((_, index) => (
                <svg
                  key={index}
                  xmlns='http://www.w3.org/2000/svg'
                  width='9'
                  height='9'
                  viewBox='0 0 9 9'
                  fill='none'
                >
                  <circle
                    cx='4.45271'
                    cy='4.44447'
                    r='4.12556'
                    fill='#EF4358'
                  />
                </svg>
              ))}
            </div>
            <div className='absolute w-[450px] flex flex-wrap gap-10 -bottom-32 -left-32 z-0'>
              {svgs.map((_, index) => (
                <svg
                  key={index}
                  xmlns='http://www.w3.org/2000/svg'
                  width='9'
                  height='9'
                  viewBox='0 0 9 9'
                  fill='none'
                >
                  <circle
                    cx='4.45271'
                    cy='4.44447'
                    r='4.12556'
                    fill='#70C217'
                  />
                </svg>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
