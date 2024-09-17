import Image from 'next/image'
import { Image24 } from '../../../public/page'

export const PeopleSection = () => {
  const svgs = new Array(30).fill(0)
  return (
    <div className='3xl:max-w-[1920px] max-w-full  mt-6 relative overflow-hidden'>
      <div className='flex flex-col justify-center items-center'>
        <div className='text-center sm:text-[55px] text-2xl font-bold leading-[70px] text-[#272D4E] mt-10'>
          Supported by real people
        </div>
        <div className='text-center w-[660px] text-[#94A2B3] text-lg font-normal mt-[31px]'>
          Our team of Happiness Engineers works remotely from 58 countries
          providing customer support across multiple time zones.
        </div>
        <div className='relative '>
          <div className='relative z-20 max-w-screen-3xl'>
            <Image src={Image24} alt='images' width={1311} height={293} />
            <div className='absolute -right-6 top-0'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='43'
                height='43'
                viewBox='0 0 43 43'
                fill='none'
              >
                <circle
                  cx='21.4998'
                  cy='21.5'
                  r='19'
                  stroke='#FFBA49'
                  stroke-width='5'
                />
              </svg>
            </div>
            <div className='absolute -left-36 top-0'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='62'
                height='62'
                viewBox='0 0 62 62'
                fill='none'
              >
                <circle
                  cx='30.8674'
                  cy='30.8677'
                  r='28.0887'
                  transform='rotate(16.0891 30.8674 30.8677)'
                  stroke='#FFBA49'
                  stroke-width='5'
                />
              </svg>
            </div>
            <div className='absolute -left-24 bottom-16'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='34'
                height='34'
                viewBox='0 0 34 34'
                fill='none'
              >
                <circle
                  cx='16.9998'
                  cy='17'
                  r='14.5'
                  stroke='#FFBA49'
                  stroke-width='5'
                />
              </svg>
            </div>
          </div>
          <div className='absolute xl:top-24 lg:top-20 md:top-12 top-2 xl:-left-28 lg:-left-64 md:-left-96 -right-[550px] z-10 '>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='1544'
              height='379'
              viewBox='0 0 1544 379'
              fill='none'
            >
              <g filter='url(#filter0_d_1_138)'>
                <path
                  d='M52.9998 222.044C52.9998 208.407 59.9575 195.757 71.9127 189.196C139.127 152.312 383.443 35 772 35C1160.56 35 1404.87 152.312 1472.09 189.196C1484.04 195.757 1491 208.407 1491 222.044V268C1491 290.091 1473.09 308 1451 308H92.9998C70.9084 308 52.9998 290.091 52.9998 268V222.044Z'
                  fill='#EEEEEE'
                />
              </g>
              <defs>
                <filter
                  id='filter0_d_1_138'
                  x='0.146038'
                  y='0.146282'
                  width='1543.71'
                  height='378.707'
                  filterUnits='userSpaceOnUse'
                  color-interpolation-filters='sRGB'
                >
                  <feFlood flood-opacity='0' result='BackgroundImageFix' />
                  <feColorMatrix
                    in='SourceAlpha'
                    type='matrix'
                    values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
                    result='hardAlpha'
                  />
                  <feOffset dy='18' />
                  <feGaussianBlur stdDeviation='26.4269' />
                  <feColorMatrix
                    type='matrix'
                    values='0 0 0 0 0.845 0 0 0 0 0.892895 0 0 0 0 0.975 0 0 0 0.5 0'
                  />
                  <feBlend
                    mode='normal'
                    in2='BackgroundImageFix'
                    result='effect1_dropShadow_1_138'
                  />
                  <feBlend
                    mode='normal'
                    in='SourceGraphic'
                    in2='effect1_dropShadow_1_138'
                    result='shape'
                  />
                </filter>
              </defs>
            </svg>
          </div>
        </div>
        <div className='absolute w-[300px] md:flex hidden flex-wrap gap-10 -bottom-32 left-12 z-0'>
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
        <div className='absolute w-[300px] md:flex hidden flex-wrap gap-10 -bottom-8 right-12 z-0'>
          {svgs.map((_, index) => (
            <svg
              key={index}
              xmlns='http://www.w3.org/2000/svg'
              width='9'
              height='9'
              viewBox='0 0 9 9'
              fill='none'
            >
              <circle cx='4.45271' cy='4.44447' r='4.12556' fill='#EF4358' />
            </svg>
          ))}
        </div>
      </div>
    </div>
  )
}
