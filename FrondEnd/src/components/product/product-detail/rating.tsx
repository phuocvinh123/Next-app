'use client'
import { Rating } from '@/components/interfaces/interface'
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Radio,
  RadioGroup,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import axios from 'axios'
import Image from 'next/image'
import { useEffect, useState } from 'react'

interface RatingComponentProps {
  productId: number
}

const RatingComponent: React.FC<RatingComponentProps> = ({ productId }) => {
  const [rating, setRating] = useState<Rating[]>([])
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [value, setValue] = useState('')
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(
          `http://localhost:9002/api/ratings/${productId}`
        )
        const data = await response.json()
        setRating(data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchOrder()
  }, [productId])

  const handleLike = async (ratingId: number, liked: boolean) => {
    try {
      const response = await axios.get(
        `http://localhost:9002/api/ratings/${
          liked ? 'unlike' : 'like'
        }/${ratingId}`
      )
      const updatedData = response.data

      setRating((prev) =>
        prev.map((r) =>
          r.id === ratingId
            ? { ...r, likes: updatedData.likes, liked: updatedData.liked }
            : r
        )
      )
    } catch (error) {
      console.error('Error toggling likes:', error)
    }
  }
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
              {Array.from({ length: 5 }, (_, index) => (
                <div key={index}>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='1.5em'
                    height='1.5em'
                    viewBox='0 0 64 64'
                    fill='#EE4D2D'
                  >
                    <path d='M62 25.2H39.1L32 3l-7.1 22.2H2l18.5 13.7l-7 22.1L32 47.3L50.5 61l-7.1-22.2z' />
                  </svg>
                </div>
              ))}
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
        {rating.map((r) => (
          <div className='flex gap-4' key={r.id}>
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
              <div>{r.fullName}</div>
              <div className='flex mt-2'>
                {Array.from({ length: 5 }, (_, index) => (
                  <div key={index}>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='1.5em'
                      height='1.5em'
                      viewBox='0 0 64 64'
                      fill={index < (r.star || 0) ? '#EE4D2D' : '#ccc'}
                    >
                      <path d='M62 25.2H39.1L32 3l-7.1 22.2H2l18.5 13.7l-7 22.1L32 47.3L50.5 61l-7.1-22.2z' />
                    </svg>
                  </div>
                ))}
              </div>
              <div className='text-[#0000008a] mt-2'>
                {r.createAt} | Phân loại hàng: FLEXING - XANH NGỌC,Size M
              </div>
              <div className='mt-6 text-lg text-[#000000de] font-medium'>
                {r.comment}
              </div>
              {r.imageRatings.length > 0 && (
                <div className='flex h-28 mt-4 gap-4'>
                  {r.imageRatings.map((i) => (
                    <Image
                      src={r.imageRatings[0].urlImage}
                      alt='images'
                      width={100}
                      height={60}
                      key={i.id}
                      className='object-cover'
                    ></Image>
                  ))}
                </div>
              )}

              {r.repComment ? (
                <div className='mt-4 bg-[#f5f5f5] p-4'>
                  <div className='text-xl'>Phản Hồi Của Người Bán</div>
                  <div className='mt-6 text-lg'>
                    Cảm ơn bạn đã tin và mua hàng hàng tại shop nhé . Nhớ ủng hộ
                    nhiều sản phẩm khác bên mình nữa nha , Shop ở 84 võ công tồn
                    quận tân phú TP HCM đó nhé
                  </div>
                </div>
              ) : (
                ''
              )}
              <div className='flex justify-between'>
                <div className='mt-4  flex gap-2 items-center'>
                  <button onClick={() => handleLike(r.id, r.liked)}>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='2em'
                      height='2em'
                      viewBox='0 0 24 24'
                      className='cursor-pointer'
                    >
                      <path
                        fill={r.liked ? '#ee4d2d' : '#cccccc'}
                        d='M23 10a2 2 0 0 0-2-2h-6.32l.96-4.57c.02-.1.03-.21.03-.32c0-.41-.17-.79-.44-1.06L14.17 1L7.59 7.58C7.22 7.95 7 8.45 7 9v10a2 2 0 0 0 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73zM1 21h4V9H1z'
                      />
                    </svg>
                  </button>
                  <div className='text-[#cccccc] text-xl'> {r.likes}</div>
                </div>

                <Popover size='sm' placement='left'>
                  <PopoverTrigger>
                    <button>
                      <svg
                        width='4px'
                        height='16px'
                        viewBox='0 0 4 16'
                        version='1.1'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <defs></defs>
                        <g stroke='none' strokeWidth='1' fillRule='evenodd'>
                          <g
                            transform='translate(-1301.000000, -550.000000)'
                            fill='#CCCCCC'
                          >
                            <g transform='translate(155.000000, 92.000000)'>
                              <g transform='translate(40.000000, 184.000000)'>
                                <g transform='translate(0.000000, 161.000000)'>
                                  <g>
                                    <g transform='translate(50.000000, 2.000000)'>
                                      <path d='M1058,122.2 C1056.895,122.2 1056,123.096 1056,124.2 C1056,125.306 1056.895,126.202 1058,126.202 C1059.104,126.202 1060,125.306 1060,124.2 C1060,123.096 1059.104,122.2 1058,122.2 M1058,116.6 C1056.895,116.6 1056,117.496 1056,118.6 C1056,119.706 1056.895,120.602 1058,120.602 C1059.104,120.602 1060,119.706 1060,118.6 C1060,117.496 1059.104,116.6 1058,116.6 M1058,111 C1056.895,111 1056,111.896 1056,113 C1056,114.106 1056.895,115.002 1058,115.002 C1059.104,115.002 1060,114.106 1060,113 C1060,111.896 1059.104,111 1058,111'></path>
                                    </g>
                                  </g>
                                </g>
                              </g>
                            </g>
                          </g>
                        </g>
                      </svg>
                    </button>
                  </PopoverTrigger>
                  <PopoverContent width='auto' mt={14}>
                    <PopoverBody
                      fontSize='xl'
                      p={2}
                      cursor='pointer'
                      onClick={onOpen}
                    >
                      Báo cáo
                    </PopoverBody>
                  </PopoverContent>
                </Popover>

                <Modal onClose={onClose} isOpen={isOpen} isCentered size='xl'>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalCloseButton />
                    <ModalBody>
                      <Text className='text-3xl mt-6'>
                        Báo Cáo Đánh Giá Này
                      </Text>
                      <Text className='mt-4 text-xl'>
                        Vui lòng chọn lý do báo cáo
                      </Text>
                      <div className='mt-8 '>
                        <RadioGroup onChange={setValue} value={value}>
                          <Stack>
                            <div className=''>
                              <Radio size='lg' value='1' colorScheme='red'>
                                Đánh giá thô tục phản cảm
                              </Radio>
                            </div>
                            <div className='mt-4'>
                              <Radio size='lg' value='2' colorScheme='red'>
                                Chứa hình ảnh phản cảm, khỏa thân, khiêu dâm
                              </Radio>
                            </div>
                            <div className='mt-4'>
                              <Radio size='lg' value='3' colorScheme='red'>
                                Đánh giá trùng lặp (thông tin rác)
                              </Radio>
                            </div>
                            <div className='mt-4'>
                              <Radio size='lg' value='4' colorScheme='red'>
                                Chứa thông tin cá nhân
                              </Radio>
                            </div>
                            <div className='mt-4'>
                              <Radio size='lg' value='5' colorScheme='red'>
                                Quảng cáo trái phép
                              </Radio>
                            </div>
                            <div className='mt-4'>
                              <Radio size='lg' value='6' colorScheme='red'>
                                Đánh giá không chính xác / gây hiểu lầm (ví dụ
                                như: đánh giá và sản phẩm không khớp, ...)
                              </Radio>
                            </div>
                            <div className='mt-4'>
                              <Radio size='lg' value='7' colorScheme='red'>
                                Vi phạm khác
                              </Radio>
                            </div>
                            {value == '7' && (
                              <Input
                                placeholder='Vui lòng mô ta chi tiết vi phạm ( bắt buộc)'
                                border='#00000017'
                                focusBorderColor='transparent'
                                paddingTop={4}
                                paddingBottom={4}
                              />
                            )}
                          </Stack>
                        </RadioGroup>
                      </div>
                    </ModalBody>
                    <ModalFooter>
                      <Button
                        colorScheme='teal'
                        variant='ghost'
                        onClick={() => {
                          onClose(), setValue('')
                        }}
                        width='150px'
                      >
                        Hủy
                      </Button>
                      <Button
                        colorScheme={value === '' ? 'red' : undefined}
                        bg={value !== '' ? '#ee4d2d' : '#facac0'}
                        isDisabled={value === ''}
                        onClick={() => {
                          onClose()
                          setValue('')
                        }}
                        ml={4}
                        width='150px'
                      >
                        Gửi
                      </Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
export default RatingComponent
