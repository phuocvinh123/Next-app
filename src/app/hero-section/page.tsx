import Image from 'next/image'
import { Bitmap, Image15, PayPalLogo, StripeLogo } from '../../../public/page'

export const HeroSection = () => {
  const svgs = new Array(50).fill(0)
  return (
    <>
      <div className='absolute w-[250px] flex flex-wrap gap-10 top-[500px] right-[-30px] z-0'>
        {svgs.map((_, index) => (
          <svg
            key={index}
            xmlns='http://www.w3.org/2000/svg'
            width='9'
            height='9'
            viewBox='0 0 9 9'
            fill='none'
          >
            <circle cx='4.45271' cy='4.44447' r='4.12556' fill='#29AAF3' />
          </svg>
        ))}
      </div>
      <div className='absolute w-[450px] flex flex-wrap gap-10 top-72 right-96 z-0'>
        {svgs.map((_, index) => (
          <svg
            key={index}
            xmlns='http://www.w3.org/2000/svg'
            width='9'
            height='9'
            viewBox='0 0 9 9'
            fill='none'
          >
            <circle cx='4.45271' cy='4.44447' r='4.12556' fill='#29AAF3' />
          </svg>
        ))}
      </div>
      <div className='absolute w-[250px] flex flex-wrap gap-10 top-40 right-40 z-0'>
        {svgs.map((_, index) => (
          <svg
            key={index}
            xmlns='http://www.w3.org/2000/svg'
            width='9'
            height='9'
            viewBox='0 0 9 9'
            fill='none'
          >
            <circle cx='4.45271' cy='4.44447' r='4.12556' fill='#29AAF3' />
          </svg>
        ))}
      </div>
      <div className='absolute top-44 right-[450px]  z-10'>
        <Image
          src={Image15}
          alt='images'
          width={345}
          height={206}
          className='rounded-2xl relative'
        />
      </div>
      <div className='absolute top-72 -right-52 z-[9]'>
        <div className='flex bg-[#FFF] w-[907px] h-[421px]'>
          <Image
            src={Bitmap}
            alt='images'
            width={453}
            height={421}
            className='rounded-2xl'
          />
          <div className='absolute bottom-8 -left-10 z-10'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='77'
              height='77'
              viewBox='0 0 77 77'
              fill='none'
            >
              <rect
                x='0.813965'
                y='0.653931'
                width='75.6353'
                height='75.6353'
                rx='37.7902'
                fill='#FFBA49'
              />
              <path
                fill-rule='evenodd'
                clip-rule='evenodd'
                d='M28.0137 28.6162H53.0715C53.3676 28.6172 53.6591 28.6896 53.9212 28.8274C54.1833 28.9653 54.4082 29.1643 54.5769 29.4077C54.7456 29.6511 54.853 29.9316 54.89 30.2254C54.927 30.5192 54.8926 30.8176 54.7895 31.0952L49.2888 45.7639C49.0192 46.4771 48.3353 46.952 47.5707 46.952H32.9021C32.1631 46.952 31.4939 46.5065 31.2097 45.8244L22.513 24.949H18.2334V21.2819H22.5111C23.2355 21.2802 23.9441 21.4937 24.547 21.8952C25.1499 22.2967 25.62 22.8682 25.8978 23.5372L28.0137 28.6162ZM42.07 39.6177H45.7371V35.9505H42.07V32.2834H38.4028V35.9505H34.7356V39.6177H38.4028V43.2849H42.07V39.6177ZM33.8188 54.2863C35.3378 54.2863 36.5692 53.0549 36.5692 51.5359C36.5692 50.0169 35.3378 48.7855 33.8188 48.7855C32.2998 48.7855 31.0684 50.0169 31.0684 51.5359C31.0684 53.0549 32.2998 54.2863 33.8188 54.2863ZM46.6538 54.2863C48.1728 54.2863 49.4042 53.0549 49.4042 51.5359C49.4042 50.0169 48.1728 48.7855 46.6538 48.7855C45.1349 48.7855 43.9035 50.0169 43.9035 51.5359C43.9035 53.0549 45.1349 54.2863 46.6538 54.2863Z'
                fill='white'
              />
            </svg>
          </div>
          <div className='absolute -bottom-20 right-72 z-10'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='99'
              height='69'
              viewBox='0 0 99 69'
              fill='none'
            >
              <rect
                x='0.717285'
                y='0.442078'
                width='98.1275'
                height='68.4611'
                rx='31.3552'
                fill='#EF4358'
              />
              <path
                d='M48.8819 52.3609C49.4024 52.6389 50.0557 52.6371 50.5762 52.3592C64.7601 44.7396 65.7674 29.8529 65.755 25.62C65.7537 25.2798 65.6532 24.9473 65.4657 24.6634C65.2783 24.3795 65.0122 24.1563 64.6999 24.0214L50.4487 17.7083C50.2219 17.6084 49.9767 17.5569 49.7289 17.5572C49.481 17.5575 49.236 17.6096 49.0094 17.7101L34.8573 24.0231C34.5496 24.1582 34.2873 24.3788 34.1014 24.6588C33.9156 24.9388 33.8142 25.2663 33.8093 25.6023C33.7491 29.8139 34.5971 44.7325 48.8819 52.3609ZM43.9002 32.0711L47.9596 36.1305L55.5597 28.5304L58.0629 31.0337L47.9596 41.137L41.397 34.5743L43.9002 32.0711Z'
                fill='white'
              />
            </svg>
          </div>
          <div className='absolute bg-[#70C217] text-[#FFF] text-center rounded-2xl p-2 w-28 z-10 -top-4 right-[480px]'>
            SALE
          </div>
          <div className='absolute z-10 w-[406px] h-[248px] bg-[#FFFFFF] rounded-[23px] -bottom-32 left-24 p-10'>
            <div className='flex gap-4 justify-between items-center border-b-2 border-[#E5EFFF] pb-4'>
              <div className='w-28'>
                <Image src={StripeLogo} alt='images' width={79} height={32} />
              </div>
              <div className='text-[#94A2B3] text-[12px] font-normal text-center'>
                Stripe gateway
              </div>
              <label className='inline-flex items-center cursor-pointer'>
                <input
                  type='checkbox'
                  value=''
                  className='sr-only peer'
                  checked
                />
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-[#70C217] rounded-full peer dark:bg-gray-700 peer-checked:bg-[#70C217] peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600"></div>
              </label>
            </div>
            <div className='flex gap-4 justify-between items-center border-b-2 border-[#95a4bd] pb-4 mt-5'>
              <div className='w-28'>
                <Image src={PayPalLogo} alt='images' width={79} height={32} />
              </div>
              <div className='text-[#94A2B3] text-[12px] font-normal text-center'>
                Paypal payments
              </div>
              <label className='inline-flex items-center cursor-pointer'>
                <input
                  type='checkbox'
                  value=''
                  className='sr-only peer'
                  checked
                />
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-[#70C217] rounded-full peer dark:bg-gray-700 peer-checked:bg-[#70C217] peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600"></div>
              </label>
            </div>
            <div className='flex gap-4 justify-between items-center mt-5'>
              <div className='w-28 flex justify-center items-center'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='30'
                  height='29'
                  viewBox='0 0 30 29'
                  fill='none'
                >
                  <path
                    d='M28.4152 12.7334C29.5077 12.7334 29.9637 11.3104 29.0763 10.6545L15.5745 0.696883C15.3817 0.553656 15.1489 0.47644 14.9099 0.47644C14.6708 0.47644 14.438 0.553656 14.2452 0.696883L0.743373 10.6545C-0.144021 11.3068 0.31205 12.7334 1.40803 12.7334H3.59647V26.1392H1.05096C0.895397 26.1392 0.768121 26.2683 0.768121 26.426V28.2899C0.768121 28.4476 0.895397 28.5767 1.05096 28.5767H28.7688C28.9243 28.5767 29.0516 28.4476 29.0516 28.2899V26.426C29.0516 26.2683 28.9243 26.1392 28.7688 26.1392H26.2233V12.7334H28.4152ZM10.2784 26.1392H6.14198V12.7334H10.2784V26.1392ZM16.9604 26.1392H12.824V12.7334H16.9604V26.1392ZM23.6777 26.1392H19.5059V12.7334H23.6777V26.1392Z'
                    fill='#0D3883'
                  />
                </svg>
              </div>
              <div className='text-[#94A2B3] text-[12px] font-normal text-center'>
                Paypal payments
              </div>
              <label className='inline-flex items-center cursor-pointer'>
                <input type='checkbox' value='' className='sr-only peer' />
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-[#70C217] rounded-full peer dark:bg-gray-700 peer-checked:bg-[#70C217] peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600"></div>
              </label>
            </div>
          </div>
          <div className='m-10'>
            <div className='flex gap-4'>
              <div className='font-bold'>SHOES</div>
              <div>Adidas Originals</div>
            </div>
            <div className='font-bold text-[29px] mt-5'>
              Adidas Originals <br /> OG Sneakers
            </div>
            <div className='flex gap-3 mt-10'>
              <div className='rounded-md bg-[#F6F6F6] p-3 '>7</div>
              <div className='rounded-md bg-[#F6F6F6] p-3'>7.5</div>
              <div className='rounded-md bg-[#F6F6F6] p-3'>8</div>
              <div className='rounded-md bg-[#F6F6F6] p-3'>8.5</div>
              <div className='rounded-md bg-[#F6F6F6] p-3'>9</div>
            </div>
            <div className='flex gap-4 mt-5'>
              <div>
                <div className='text-[#7854F7] text-[23px] font-medium'>
                  $344
                </div>
                <div className='text-end'>$560</div>
              </div>

              <div className='flex gap-5 bg-[#F6F6F6] justify-center items-center p-2 w-[125px] h-[40px]'>
                <div>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='8'
                    height='4'
                    viewBox='0 0 8 4'
                    fill='none'
                  >
                    <path
                      fill-rule='evenodd'
                      clip-rule='evenodd'
                      d='M6.1463 0.699463H1.47067C0.825429 0.699463 0.301758 1.22313 0.301758 1.86837C0.301758 2.51361 0.825429 3.03728 1.47067 3.03728H6.1463C6.79154 3.03728 7.31521 2.51361 7.31521 1.86837C7.31521 1.22313 6.79154 0.699463 6.1463 0.699463Z'
                      fill='#222222'
                    />
                  </svg>
                </div>
                <div>1</div>
                <div>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='8'
                    height='8'
                    viewBox='0 0 8 8'
                    fill='none'
                  >
                    <path
                      fill-rule='evenodd'
                      clip-rule='evenodd'
                      d='M6.32159 2.69554H5.15268V1.52664C5.15268 0.881398 4.62901 0.357727 3.98378 0.357727C3.33854 0.357727 2.81487 0.881398 2.81487 1.52664V2.69554H1.64596C1.00072 2.69554 0.477051 3.21921 0.477051 3.86445C0.477051 4.50969 1.00072 5.03336 1.64596 5.03336H2.81487V6.20227C2.81487 6.84751 3.33854 7.37118 3.98378 7.37118C4.62901 7.37118 5.15268 6.84751 5.15268 6.20227V5.03336H6.32159C6.96683 5.03336 7.4905 4.50969 7.4905 3.86445C7.4905 3.21921 6.96683 2.69554 6.32159 2.69554Z'
                      fill='#222222'
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className='mt-5 text-[#FFF] bg-[#7854F7] p-4 text-center'>
              Add to cart
            </div>
          </div>
        </div>
      </div>

      <div className='relative container mx-auto mt-32'>
        <div className="w-[818px] text-[#272d4e] text-[85px] font-semibold font-['Circular Std'] leading-[95px]">
          Building exactly the eCommerce website you want.
        </div>
        <div className='text-[18px] text-[#94A2B3] font-light mt-3'>
          WooCommerce is a customizable, open-source eCommerce platform built on
          WordPress.
          <br /> Get started quickly and make your way.
        </div>
        <div className='flex  items-center gap-3 mt-5'>
          <div className='rounded-[60px] bg-[#7854F7] p-4 text-white font-medium text-[18px]'>
            Start a New Store
          </div>
          <div className='text-[#94A2B3] text-[18px] font-normal'>or</div>
          <div className='text-[#299EF3] text-[18px] font-medium'>
            Customize & Extend ›
          </div>
        </div>
      </div>
    </>
  )
}
