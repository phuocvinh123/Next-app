export const CtaSection = () => {
  return (
    <div className='max-w-[1920px] py-[78px] bg-[#5F37EF] relative z-20  flex justify-center items-center '>
      <div className='flex md:flex-row flex-col gap-[61px] items-center justify-center text-[#FFF] 3xl:max-w-[1129px] container mx-auto'>
        <div className='w-[855px] h-[105px]  text-white xl:text-4xl text-2xl md:text-left text-center'>
          <span className='font-normal leading-[52.50px]'>
            WooCommerce - the{' '}
          </span>
          <span className=' font-bold leading-[52.50px]'>
            most customizable eCommerce platform
          </span>
          <span className=' font-normal leading-[52.50px]'> for building </span>
          <span className=' font-bold leading-[52.50px]'>
            your online business
          </span>
          <span className=' font-normal leading-[52.50px]'>.</span>
        </div>
        <button className='rounded-[60px] h-[72px] w-[207px] border-[#FFF] border-2 flex items-center justify-center text-lg  font-bold leading-normal'>
          GET STARTED
        </button>
      </div>

      <div className='absolute -bottom-6 right-44 '>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='89'
          height='88'
          viewBox='0 0 89 88'
          fill='none'
        >
          <path
            d='M86.5 44C86.5 66.8933 67.7227 85.5 44.5 85.5C21.2773 85.5 2.5 66.8933 2.5 44C2.5 21.1067 21.2773 2.5 44.5 2.5C67.7227 2.5 86.5 21.1067 86.5 44Z'
            stroke='#FFBA49'
            stroke-width='5'
          />
        </svg>
      </div>
    </div>
  )
}
