export const CtaSection = () => {
  return (
    <div className='w-[1920px] h-[261px] bg-[#5F37EF] relative z-20 -mt-9 flex justify-center items-center '>
      <div className='container mx-auto'>
        <div className='flex gap-20 items-center justify-center text-[#FFF]'>
          <div className='w-[855px] text-[36px] font-normal leading-[52px]'>
            WooCommerce - the most customizable eCommerce platform for building
            your online business.
          </div>
          <div className='rounded-[60px] h-[72px] w-[207px] border-[#FFF] border-2 flex items-center justify-center'>
            GET STARTED
          </div>
        </div>
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
