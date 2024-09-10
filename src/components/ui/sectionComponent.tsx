import Image from 'next/image'
import { Rectangle233, Rectangle236 } from '../../../public/page'

export const Section = () => {
  const svgs = new Array(50).fill(0)
  return (
    <div className='mt-28 relative'>
      <div className='absolute top-10 w-[1921px] h-[1111px]'>
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
      <div className='absolute -top-72 right-[500px]'>
        <div className='text-[540px] text-[#FFFFFF] font-mono opacity-10 '>
          w
        </div>
      </div>
      <div className='absolute -top-72 right-[200px]'>
        <div className='text-[540px] text-[#FFFFFF] font-mono opacity-10 '>
          O
        </div>
      </div>
      <div className='absolute -top-72 -right-[100px]'>
        <div className='text-[540px] text-[#FFFFFF] font-mono opacity-10 '>
          O
        </div>
      </div>
      <div className='container mx-auto relative w-[1921px] h-[1220px]'>
        <div className='flex gap-7'>
          <div className='w-[430px] h-[548] relative z-20'>
            <Image src={Rectangle236} alt='images' width={430} height={548} />
          </div>
          <div className='absolute top-36 -left-20'>
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
          <div className='absolute top-36 -left-10 z-0'>
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
          <div className='absolute w-[250px] flex flex-wrap gap-10 bottom-96 -left-6 z-0'>
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
          <div className='mt-28'>
            <div className='w-[435px] text-4xl font-bold text-[#FFFFFF]'>
              Develop
              <br /> Without Limits
            </div>
            <div className='w-[480px] text-lg font-normal text-[#FFF] mt-2'>
              WooCommerce is developer friendly, too. Built with a REST API,
              WooCommerce is scalable and can integrate with virtually any
              service. Design a complex store from scratch, extend a store for a
              client, or simply add a single product to a WordPress site—your
              store, your way.
            </div>
            <div className='rounded-3xl text-center mt-8 bg-[#70C217] text-[#fff] w-[256px] p-2'>
              Read the Documentation
            </div>
          </div>
        </div>
        <div className='flex justify-end mr-14 gap-7 mt-5'>
          <div className='mt-14'>
            <div className='w-[435px] text-4xl font-bold text-[#FFFFFF]'>
              Know our <br />
              Global Community
            </div>
            <div className='w-[480px] text-lg font-normal text-[#FFF] mt-2'>
              WooCommerce is one of the fastest-growing eCommerce communities.
              We’re proud that the helpfulness of the community and a wealth of
              online resources are frequently cited as reasons our users love
              it. There are 80+ meetups worldwide!
            </div>
            <div className='rounded-3xl text-center mt-8 bg-[#70C217] text-[#fff] w-[256px] p-2'>
              Read the Documentation
            </div>
          </div>
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
          <div className='absolute -right-10'>
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
          <div className='absolute w-[450px] flex flex-wrap gap-10 bottom-64 -right-24'>
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
        </div>
      </div>
    </div>
  )
}
