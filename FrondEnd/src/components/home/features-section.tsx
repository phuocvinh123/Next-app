import Image from 'next/image'
import {
  ApplePay,
  Image16,
  Image17,
  Image18,
  Image19,
  Image20,
  Image22,
  Rectangle223,
  Rectangle224,
  Rectangle225,
  Rectangle226,
  Rectangle227,
  Rectangle228,
} from '../../../public/page'

export const FeaturesSection = () => {
  return (
    <div className='relative mt-10 3xl:max-w-[1920px] container mx-auto'>
      <div className='font-bold md:text-[55px] text-[35px] max-w-[457px] mx-auto text-center text-[#272D4E] leading-[70px] '>
        Your eCommerce made simple
      </div>
      <div className='mt-[68px] flex flex-wrap justify-center items-center gap-5'>
        <div className='flex flex-col items-start justify-center 3xl:ml-[232px] '>
          <div className='w-[430px] h-[293px] flex items-start relative'>
            <Image src={Rectangle223} alt='images' />
            <div className='absolute -left-32 -bottom-20'>
              <Image src={Image16} alt='images' width={282} height={264} />
            </div>
            <div className='absolute top-6 -left-10'>
              <Image src={ApplePay} alt='images' width={68} height={48} />
            </div>
          </div>
          <div className='mt-10 ml-6 text-[36px] font-bold leading-[70px] max-w-[430px] text-[#272D4E]'>
            All You Need to Start
          </div>
          <div className='max-w-[430px] ml-6 mt-2 text-[#94A2B3] text-lg font-normal'>
            Add WooCommerce plugin to any WordPress site and set up a new store
            in minutes.
          </div>
          <div className='mt-4 ml-6 text-[#299EF3] text-xl font-bold leading-6 max-w-[430px] cursor-pointer'>
            Ecommerce for Wordpress ›
          </div>
        </div>
        <div className='mt-[87px] '>
          <div className='w-[430px] h-[293px] relative'>
            <Image src={Rectangle224} alt='images' width={430} height={294} />
            <div className='absolute -top-2 left-14'>
              <Image src={Image17} alt='images' width={105} height={68} />
            </div>
            <div className='absolute top-8 right-10'>
              <Image src={Image18} alt='images' width={105} height={68} />
            </div>
            <div className='absolute bottom-24 left-16'>
              <Image src={Image19} alt='images' width={105} height={69} />
            </div>
            <div className='absolute -bottom-4 left-[40%]'>
              <Image src={Image20} alt='images' width={105} height={69} />
            </div>
            <div className='absolute bottom-20 right-24'>
              <Image src={Image22} alt='images' width={105} height={69} />
            </div>
          </div>
          <div className='mt-4 ml-6 text-[36px] font-bold leading-[70px] max-w-[430px] text-[#272D4E]'>
            Customize and Extend
          </div>
          <div className='max-w-[430px] ml-6 mt-2 text-[#94A2B3] text-lg font-normal'>
            From subscriptions to gym classes to luxury cars, WooCommerce is
            fully customizable.
          </div>
          <div className='mt-4 ml-6 text-[#299EF3] text-xl font-bold leading-6 max-w-[430px] cursor-pointer'>
            Browse Extensions ›
          </div>
        </div>
        <div className='mt-[115px] 3xl:mr-[235px]'>
          <div className='w-[431px] h-[294px] relative'>
            <Image src={Rectangle225} alt='images' width={430} height={293} />
            <div className='absolute -top-4 left-10'>
              <Image src={Rectangle227} alt='images' width={140} height={95} />
            </div>
            <div className='absolute -top-16 right-14'>
              <Image src={Rectangle228} alt='images' width={114} height={77} />
            </div>
            <div className='absolute bottom-16 -right-2'>
              <Image src={Rectangle226} alt='images' width={170} height={116} />
            </div>
          </div>
          <div className='mt-4 ml-6 text-[32px] font-bold leading-[70px] text-[#272D4E] max-w-[430px]'>
            Active Community
          </div>
          <div className='max-w-[430px] ml-6 mt-2 text-[#94A2B3] text-lg font-normal'>
            WooCommerce is one of the fastest-growing eCommerce communities.
          </div>
          <div className='mt-4 ml-6 text-[#299EF3] text-xl font-bold leading-6 max-w-[430px] cursor-pointer'>
            Check our Forums ›
          </div>
        </div>
      </div>
    </div>
  )
}
