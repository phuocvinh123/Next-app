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
              {/* <div className='absolute w-[31px] h-[15px] -bottom-24 right-56 cursor-pointer'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='32'
                  height='17'
                  viewBox='0 0 32 17'
                  fill='none'
                >
                  <path
                    opacity='0.3'
                    fill-rule='evenodd'
                    clip-rule='evenodd'
                    d='M8.08689 0.916142C8.21994 0.971349 8.34078 1.05226 8.4425 1.15424C8.54449 1.25597 8.6254 1.37681 8.6806 1.50985C8.73581 1.64289 8.76423 1.78552 8.76423 1.92956C8.76423 2.0736 8.73581 2.21623 8.6806 2.34927C8.6254 2.48231 8.54449 2.60316 8.4425 2.70488L3.74066 7.40496H30.6344C30.9248 7.40496 31.2034 7.52033 31.4087 7.7257C31.6141 7.93107 31.7295 8.20961 31.7295 8.50004C31.7295 8.79048 31.6141 9.06902 31.4087 9.27438C31.2034 9.47975 30.9248 9.59513 30.6344 9.59513H3.74059L8.4425 14.2953C8.64813 14.5009 8.76365 14.7798 8.76365 15.0706C8.76365 15.3614 8.64813 15.6403 8.4425 15.8459C8.23688 16.0515 7.95799 16.1671 7.66718 16.1671C7.37638 16.1671 7.09749 16.0515 6.89186 15.8459L0.32135 9.2754C0.21937 9.17367 0.138458 9.05283 0.083252 8.91978C0.0280457 8.78674 -0.000371933 8.64412 -0.000371933 8.50008C-0.000371933 8.35603 0.0280457 8.21341 0.083252 8.08036C0.138458 7.94732 0.21937 7.82648 0.32135 7.72475L6.89186 1.15424C6.99359 1.05226 7.11443 0.971349 7.24747 0.916142C7.38052 0.860936 7.52314 0.83252 7.66718 0.83252C7.81123 0.83252 7.95385 0.860936 8.08689 0.916142Z'
                    fill='black'
                  />
                </svg>
              </div>
              <div className='absolute w-[51px] h-[25px] -bottom-[100px] right-32 cursor-pointer'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='52'
                  height='25'
                  viewBox='0 0 52 25'
                  fill='none'
                >
                  <path
                    fill-rule='evenodd'
                    clip-rule='evenodd'
                    d='M38.5445 0.13633C38.3276 0.226334 38.1306 0.358244 37.9648 0.524505C37.7985 0.690347 37.6666 0.887359 37.5766 1.10426C37.4866 1.32116 37.4402 1.55368 37.4402 1.78852C37.4402 2.02335 37.4866 2.25587 37.5766 2.47277C37.6666 2.68967 37.7985 2.88669 37.9648 3.05253L45.6302 10.7151H1.78533C1.31183 10.7151 0.857724 10.9032 0.52291 11.238C0.188097 11.5728 0 12.0269 0 12.5004C0 12.9739 0.188097 13.4281 0.52291 13.7629C0.857724 14.0977 1.31183 14.2858 1.78533 14.2858H45.6303L37.9648 21.9484C37.6295 22.2836 37.4412 22.7383 37.4412 23.2124C37.4412 23.6865 37.6295 24.1412 37.9648 24.4764C38.3 24.8117 38.7547 25 39.2288 25C39.7029 25 40.1575 24.8117 40.4928 24.4764L51.2047 13.7645C51.371 13.5986 51.5029 13.4016 51.5929 13.1847C51.6829 12.9678 51.7292 12.7353 51.7292 12.5005C51.7292 12.2656 51.6829 12.0331 51.5929 11.8162C51.5029 11.5993 51.371 11.4023 51.2047 11.2365L40.4928 0.524505C40.3269 0.358244 40.1299 0.226334 39.913 0.13633C39.6961 0.046327 39.4636 0 39.2288 0C38.9939 0 38.7614 0.046327 38.5445 0.13633Z'
                    fill='black'
                  />
                </svg>
              </div> */}
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
