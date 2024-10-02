import Image from 'next/image'

const RatingComponent = () => {
  return (
    <div className='container mx-auto my-10'>
      <div className='uppercase text-xl font-normal'>Đánh gía sản phẩm</div>
      <div className='mt-5 mx-4 border-[#f9ede5] bg-[#fffbf8] rounded-sm'>
        <div className='p-12 flex gap-16'>
          <div>
            <div className='flex gap-1 text-[#ee4d2d] items-center'>
              <div className='text-4xl font-medium'>4.9</div>
              <div className='text-xl font-normal mt-3'>trên 5</div>
            </div>
            <div className='flex mt-4'>
              <div>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='1.5em'
                  height='1.5em'
                  viewBox='0 0 64 64'
                >
                  <path
                    fill='#EE4D2D'
                    d='M62 25.2H39.1L32 3l-7.1 22.2H2l18.5 13.7l-7 22.1L32 47.3L50.5 61l-7.1-22.2z'
                  />
                </svg>
              </div>
              <div>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='1.5em'
                  height='1.5em'
                  viewBox='0 0 64 64'
                >
                  <path
                    fill='#EE4D2D'
                    d='M62 25.2H39.1L32 3l-7.1 22.2H2l18.5 13.7l-7 22.1L32 47.3L50.5 61l-7.1-22.2z'
                  />
                </svg>
              </div>
              <div>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='1.5em'
                  height='1.5em'
                  viewBox='0 0 64 64'
                >
                  <path
                    fill='#EE4D2D'
                    d='M62 25.2H39.1L32 3l-7.1 22.2H2l18.5 13.7l-7 22.1L32 47.3L50.5 61l-7.1-22.2z'
                  />
                </svg>
              </div>
              <div>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='1.5em'
                  height='1.5em'
                  viewBox='0 0 64 64'
                >
                  <path
                    fill='#EE4D2D'
                    d='M62 25.2H39.1L32 3l-7.1 22.2H2l18.5 13.7l-7 22.1L32 47.3L50.5 61l-7.1-22.2z'
                  />
                </svg>
              </div>
              <div>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='1.5em'
                  height='1.5em'
                  viewBox='0 0 64 64'
                >
                  <path
                    fill='#EE4D2D'
                    d='M62 25.2H39.1L32 3l-7.1 22.2H2l18.5 13.7l-7 22.1L32 47.3L50.5 61l-7.1-22.2z'
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className='flex gap-4 flex-wrap'>
            <div className='h-12 py-2 px-8 border-[1px] text-xl font-normal hover:text-[#ee4d2d] hover:border-[#ee4d2d] cursor-pointer'>
              Tất cả
            </div>
            <div className='h-12 py-2 px-8 border-[1px] text-xl font-normal hover:text-[#ee4d2d] hover:border-[#ee4d2d] cursor-pointer'>
              5 Sao (1,5k)
            </div>
            <div className='h-12 py-2 px-8 border-[1px] text-xl font-normal hover:text-[#ee4d2d] hover:border-[#ee4d2d] cursor-pointer'>
              4 Sao (1,3k)
            </div>
            <div className='h-12 py-2 px-8 border-[1px] text-xl font-normal hover:text-[#ee4d2d] hover:border-[#ee4d2d] cursor-pointer'>
              3 Sao (16)
            </div>
            <div className='h-12 py-2 px-8 border-[1px] text-xl font-normal hover:text-[#ee4d2d] hover:border-[#ee4d2d] cursor-pointer'>
              2 Sao (4)
            </div>
            <div className='h-12 py-2 px-8 border-[1px] text-xl font-normal hover:text-[#ee4d2d] hover:border-[#ee4d2d] cursor-pointer'>
              1 Sao (12)
            </div>
            <div className='h-12 py-2 px-8 border-[1px] text-xl font-normal hover:text-[#ee4d2d] hover:border-[#ee4d2d] cursor-pointer'>
              Có Bình Luận (691)
            </div>
            <div className='h-12 py-2 px-8 border-[1px] text-xl font-normal hover:text-[#ee4d2d] hover:border-[#ee4d2d] cursor-pointer'>
              Có Hình Ảnh / Video (399)
            </div>
            <div className='h-12 py-2 px-8 border-[1px] text-xl font-normal hover:text-[#ee4d2d] hover:border-[#ee4d2d] cursor-pointer'>
              Trong nước (399)
            </div>
          </div>
        </div>
      </div>
      <div className='mt-4 ml-16'>
        <div className='flex gap-4'>
          <div>
            <Image
              src='https://down-vn.img.susercontent.com/file/vn-11134233-7qukw-li19bt2rxyv51d_tn'
              alt='images'
              width={50}
              height={50}
              className='rounded-full object-cover'
            />
          </div>
          <div>
            <div>eggie2005</div>
            <div className='flex mt-2'>
              <div>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='1.2em'
                  height='1.2em'
                  viewBox='0 0 64 64'
                >
                  <path
                    fill='#EE4D2D'
                    d='M62 25.2H39.1L32 3l-7.1 22.2H2l18.5 13.7l-7 22.1L32 47.3L50.5 61l-7.1-22.2z'
                  />
                </svg>
              </div>
              <div>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='1.2em'
                  height='1.2em'
                  viewBox='0 0 64 64'
                >
                  <path
                    fill='#EE4D2D'
                    d='M62 25.2H39.1L32 3l-7.1 22.2H2l18.5 13.7l-7 22.1L32 47.3L50.5 61l-7.1-22.2z'
                  />
                </svg>
              </div>
              <div>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='1.2em'
                  height='1.2em'
                  viewBox='0 0 64 64'
                >
                  <path
                    fill='#EE4D2D'
                    d='M62 25.2H39.1L32 3l-7.1 22.2H2l18.5 13.7l-7 22.1L32 47.3L50.5 61l-7.1-22.2z'
                  />
                </svg>
              </div>
              <div>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='1.2em'
                  height='1.2em'
                  viewBox='0 0 64 64'
                >
                  <path
                    fill='#EE4D2D'
                    d='M62 25.2H39.1L32 3l-7.1 22.2H2l18.5 13.7l-7 22.1L32 47.3L50.5 61l-7.1-22.2z'
                  />
                </svg>
              </div>
              <div>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='1.2em'
                  height='1.2em'
                  viewBox='0 0 64 64'
                >
                  <path
                    fill='#EE4D2D'
                    d='M62 25.2H39.1L32 3l-7.1 22.2H2l18.5 13.7l-7 22.1L32 47.3L50.5 61l-7.1-22.2z'
                  />
                </svg>
              </div>
            </div>
            <div className='text-[#0000008a] mt-2'>
              2024-05-07 17:14 | Phân loại hàng: FLEXING - XANH NGỌC,Size M
            </div>
            <div className='mt-6 text-lg text-[#000000de] font-medium'>
              Áo xịn xò dữ, hình in to rõ, chất vải mát nhìn mê cực. Còn săn
              được với giá rẻ nữa 10 đỉm kh có nhưng lun 😍😍😍
            </div>
            <div className='flex h-28 mt-4 gap-4'>
              <Image
                src='https://down-vn.img.susercontent.com/file/vn-11134103-7r98o-lv08nw4z3s3d1a@resize_w72_nl.webp'
                alt='images'
                width={100}
                height={60}
                className='object-cover'
              ></Image>
              <Image
                src='https://down-vn.img.susercontent.com/file/vn-11134103-7r98o-lv08nw4z3s3d1a@resize_w72_nl.webp'
                alt='images'
                width={100}
                height={60}
                className='object-cover'
              ></Image>
            </div>
            <div className='mt-4 bg-[#f5f5f5] p-4'>
              <div className='text-xl'>Phản Hồi Của Người Bán</div>
              <div className='mt-6 text-lg'>
                Cảm ơn bạn đã tin và mua hàng hàng tại shop nhé . Nhớ ủng hộ
                nhiều sản phẩm khác bên mình nữa nha , Shop ở 84 võ công tồn
                quận tân phú TP HCM đó nhé
              </div>
            </div>
            <div className='mt-4 ml-4 flex gap-2 items-center'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='2em'
                height='2em'
                viewBox='0 0 24 24'
              >
                <path
                  fill='#cccccc'
                  d='M23 10a2 2 0 0 0-2-2h-6.32l.96-4.57c.02-.1.03-.21.03-.32c0-.41-.17-.79-.44-1.06L14.17 1L7.59 7.58C7.22 7.95 7 8.45 7 9v10a2 2 0 0 0 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73zM1 21h4V9H1z'
                />
              </svg>
              <div className='text-[#cccccc] text-xl'>42</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default RatingComponent
