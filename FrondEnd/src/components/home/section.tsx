import Image from 'next/image'
import { Rectangle233, Rectangle236 } from '../../../public/page'

export const Section = () => {
  const svgs = new Array(50).fill(0)
  return (
    <div className='mt-28 relative 3xl:max-w-screen-3xl overflow-hidden'>
      <div className='absolute top-10 3xl:max-w-[1920px] w-full'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='1920'
          height='1110'
          viewBox='0 0 1920 1110'
          fill='none'
        >
          <path
            d='M0 0C0 0 584.914 30 960 30C1335.09 30 1920 0 1920 0V1110C1920 1110 1335.09 1080 960 1080C584.914 1080 0 1110 0 1110L0 0Z'
            fill='#7854F7'
          />
        </svg>
      </div>
      <div className='absolute -top-56 right-[300px]'>
        <div className='text-[400px] text-[#FFFFFF] opacity-10 '>w</div>
      </div>
      <div className='absolute -top-56 right-12'>
        <div className='text-[400px] text-[#FFFFFF]  opacity-10 '>O</div>
      </div>
      <div className='absolute -top-56 -right-48'>
        <div className='text-[400px] text-[#FFFFFF]  opacity-10 '>O</div>
      </div>
      <div className='relative 3xl:max-w-[1920px] container mx-auto h-[1190px] flex flex-col md:text-left text-center justify-center items-center'>
        <div className='flex md:flex-row flex-col gap-[70px] 3xl:ml-[345px] relative'>
          <div className='w-[430px] h-[548] relative z-20 md:block hidden'>
            <Image src={Rectangle236} alt='images' width={430} height={548} />
          </div>
          <div className='md:absolute hidden top-36 -left-20'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='65'
              height='65'
              viewBox='0 0 65 65'
              fill='none'
            >
              <circle
                cx='32.5'
                cy='32.5'
                r='30'
                stroke='#FFBA49'
                stroke-width='5'
              />
            </svg>
          </div>
          <div className='md:absolute hidden top-36 -left-20 z-0'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='401'
              height='401'
              viewBox='0 0 65 65'
              fill='none'
            >
              <circle
                cx='32.5'
                cy='32.5'
                r='30'
                stroke='#FFBA49'
                stroke-width='1'
              />
            </svg>
          </div>
          <div className='md:absolute hidden max-w-[250px] md:flex flex-wrap gap-10 -bottom-64 -left-8 z-0'>
            {svgs.map((_, index) => (
              <svg
                key={index}
                xmlns='http://www.w3.org/2000/svg'
                width='9'
                height='9'
                viewBox='0 0 9 9'
                fill='none'
              >
                <circle cx='4.45271' cy='4.44447' r='4.12556' fill='#70C217' />
              </svg>
            ))}
          </div>
          <div className='md:mt-28 mt-2'>
            <div className='max-w-[435px] lg:text-4xl text-2xl leading-normal font-bold text-[#FFF]'>
              Develop
              <br /> Without Limits
            </div>
            <div className='max-w-[480px] lg:text-lg text-md font-normal text-[#FFF] mt-[13px] leading-[30px]'>
              WooCommerce is developer friendly, too. Built with a REST API,
              WooCommerce is scalable and can integrate with virtually any
              service. Design a complex store from scratch, extend a store for a
              client, or simply add a single product to a WordPress site—your
              store, your way.
            </div>
            <button className='rounded-[60px] text-center mt-[39px] bg-[#70C217] text-[#fff] max-w-[256px] px-[26px] py-[22px]'>
              Read the Documentation
            </button>
          </div>
        </div>
        <div className='flex md:flex-row flex-col 3xl:ml-[595px] xl:ml-[350px] gap-[70px] mt-32 relative'>
          <div className='mt-6'>
            <div className='max-w-[435px] lg:text-4xl text-2xl font-bold leading-normal text-[#FFF]'>
              Know our <br />
              Global Community
            </div>
            <div className='max-w-[480px] lg:text-lg text-md font-normal text-[#FFF] mt-[13px] leading-[30px]'>
              WooCommerce is one of the fastest-growing eCommerce communities.
              We’re proud that the helpfulness of the community and a wealth of
              online resources are frequently cited as reasons our users love
              it. There are 80+ meetups worldwide!
            </div>
            <button className='rounded-[60px] text-center mt-[39px] bg-[#70C217] text-[#fff] w-[256px] px-[26px] py-[22px]'>
              Read the Documentation
            </button>
          </div>
          <div className='relative md:block hidden '>
            <div className='w-[430px] h-[548] relative z-10'>
              <Image src={Rectangle233} alt='images' width={430} height={548} />
              <div className='absolute left-32 -top-2'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='65'
                  height='65'
                  viewBox='0 0 65 65'
                  fill='none'
                >
                  <circle
                    cx='32.5'
                    cy='32.5'
                    r='30'
                    stroke='#FFBA49'
                    stroke-width='5'
                  />
                </svg>
              </div>
            </div>
            <div className='absolute -right-28 top-0'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='262'
                height='262'
                viewBox='0 0 65 65'
                fill='none'
              >
                <circle
                  cx='32.5'
                  cy='32.5'
                  r='30'
                  stroke='#FFBA49'
                  stroke-width='1'
                />
              </svg>
            </div>
            <div className='absolute max-w-[450px] flex flex-wrap gap-10 bottom-28 -right-40'>
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
