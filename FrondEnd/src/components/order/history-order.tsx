/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useEffect, useState } from 'react'
import {
  OrderDetail,
  OrderResDTO,
  ShowRating,
} from '@/components/interfaces/interface'
import {
  Button,
  CircularProgress,
  Divider,
  Heading,
  Image,
  Modal,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Text,
  Textarea,
  Tooltip,
  useDisclosure,
} from '@chakra-ui/react'
import { getCookie } from 'cookies-next'

import { toast } from 'react-toastify'

const HistoryOrder = () => {
  const customerId = getCookie('customerId')
  const {
    isOpen: isOpenRating,
    onOpen: onOpenRating,
    onClose: onCloseRating,
  } = useDisclosure()

  const {
    isOpen: isOpenSeeReviews,
    onOpen: onOpenSeeReviews,
    onClose: onCloseSeeReviews,
  } = useDisclosure()

  const [orderResDTO, setOrderResDTO] = useState<OrderResDTO[]>([])
  const [orderDetails, setOrderDetails] = useState<OrderDetail[]>([])
  const [showRating, setShowRating] = useState<ShowRating | undefined>(
    undefined
  )
  const [isClient, setIsClient] = useState(false)
  const [star, setStar] = useState(5)
  const [comment, setComment] = useState('')
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [imageUrl, setImageUrl] = useState<string>('')
  const [change, setChange] = useState(false)
  const [loading, setLoading] = useState(false)
  const [back, setBack] = useState(false)
  const fileInputRef = React.useRef<HTMLInputElement | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedImage(file)
      uploadImage(file)
    }
  }
  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const uploadImage = async (file: File) => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', 'next-app')
    formData.append('cloud_name', 'dxwizprbn')
    formData.append('folder', 'next-app')
    setLoading(true)
    try {
      const response = await fetch(
        'https://api.cloudinary.com/v1_1/dxwizprbn/image/upload',
        {
          method: 'POST',
          body: formData,
        }
      )

      const data = await response.json()
      if (response.ok) {
        setImageUrl(data.secure_url)
        setLoading(false)
      } else {
        console.error(data.error)
        setLoading(false)
      }
    } catch (error) {
      console.error('Có lỗi xảy ra:', error)
      setLoading(false)
    }
  }

  const handleDeleteImage = () => {
    setSelectedImage(null)
    setImageUrl('')
  }

  const handleRatingChange = (event: any) => {
    setStar(Number(event.target.value))
  }

  const getRatingText = (rating: any) => {
    switch (rating) {
      case 1:
        return 'Tệ'
      case 2:
        return 'Không hài lòng'
      case 3:
        return 'Bình thường'
      case 4:
        return 'Hài lòng'
      case 5:
        return 'Tuyệt vời'
      default:
        return ''
    }
  }

  useEffect(() => {
    const fetchOrder = async () => {
      if (customerId) {
        try {
          const response = await fetch(
            `http://localhost:9002/api/orders/${customerId}`
          )
          const data = await response.json()
          setOrderResDTO(data)
        } catch (error) {
          console.log('Failed to fetch order')
        }
      }
    }
    fetchOrder()
  }, [customerId, change])

  const handleShowRating = async (orderId: number) => {
    try {
      const response = await fetch(
        `http://localhost:9002/api/ratings/showRating/${orderId}`
      )

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      const data = await response.json()
      setShowRating(data)
      onOpenSeeReviews()
    } catch (error) {
      console.error('Failed to fetch order:', error)
    }
  }

  const handleOpenRating = (orderId: number) => {
    setSelectedImage(null)
    setImageUrl('')
    setBack(false)
    fetchOrderDetails(orderId)
    onOpenRating()
  }

  const fetchOrderDetails = async (orderId: number) => {
    try {
      const response = await fetch(
        `http://localhost:9002/api/orderDetails/${orderId}`
      )
      if (!response.ok) {
        throw new Error('Failed to fetch order details')
      }
      const data: OrderDetail[] = await response.json()
      setOrderDetails(data)
    } catch (error) {
      console.error('Error fetching order details:', error)
    }
  }
  const handleRating = async (productId: number, orderId: number) => {
    const data = {
      productId,
      customerId,
      orderId,
      date: new Date().toISOString(),
      star,
      comment,
      imageUrl,
    }
    try {
      const response = await fetch('http://localhost:9002/api/ratings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      if (!response.ok) {
        throw new Error('Failed to fetch order details')
      }
      onCloseRating()
      setChange(!change)
      toast.success('Đánh giá sản phẩm thành công')
    } catch (error) {
      console.error('Error fetching order details:', error)
    }
  }

  const handleEdit = (orderId: number) => {
    fetchOrderDetails(orderId)
    onCloseSeeReviews()
    setBack(true)
    onOpenRating()
  }

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) return null

  return (
    <div className='my-10 container mx-auto'>
      <Heading as='h1' size='lg' className='text-center mb-10'>
        Lịch sử đơn hàng
      </Heading>
      {orderResDTO.map((od) => (
        <div key={od.order.id} className='mt-5'>
          <div className='border-[1px] p-4 shadow-sm rounded-bl-lg rounded-br-lg'>
            <div className='flex justify-between'>
              <div className='flex gap-4 items-center'>
                <div className='bg-[#ee4d2d] text-white border-[1px] text-lg px-2 text-center font-medium rounded-md '>
                  Yêu thích
                </div>
                <div className='text-xl font-bold'>Thế giới quần áo letas</div>
                <div className='flex gap-2 items-center bg-[#ee4d2d] px-2 py-1 rounded-sm'>
                  <div>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth='1.5'
                      stroke='#FFFFFF'
                      className='size-6'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155'
                      />
                    </svg>
                  </div>
                  <div className='text-white'>Chat</div>
                </div>
                <div className='flex gap-2 border-[0.5px] border-[#cccccc] px-2 py-1 hover:bg-[#dfdfdf]'>
                  <div>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth='1.5'
                      stroke='currentColor'
                      className='size-6'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z'
                      />
                    </svg>
                  </div>
                  <div> Xem shop</div>
                </div>
              </div>
              <div className='flex gap-4 items-center'>
                {od.order.status === 'PAID' ? (
                  <div className='flex gap-4 items-center'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth='1.5'
                      stroke='#26aa99'
                      className='size-6'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12'
                      />
                    </svg>
                    <div className='text-[#00bfa5] text-lg font-medium'>
                      Giao hàng thành công
                    </div>
                    <Tooltip
                      label={`Cập Nhập Mới Nhất ${od.order.date}`}
                      bg='white'
                      color='black'
                      maxWidth='600px'
                    >
                      <Image
                        src='https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/productdetailspage/be6f27f93268c0f88ded.svg'
                        alt='images'
                        width={18}
                        height={18}
                      ></Image>
                    </Tooltip>
                    |
                  </div>
                ) : (
                  ''
                )}

                <div className='text-[#ee4d2d] font-normal'>
                  {od.order.status === 'PAID'
                    ? 'HOÀN THÀNH'
                    : od.order.status === 'CONFIRMING'
                    ? 'CHỜ XÁC NHẬN'
                    : od.order.status === 'INTRANSIT'
                    ? 'ĐANG VẬN CHUYỂN'
                    : 'ĐÃ HỦY'}
                </div>
              </div>
            </div>
            <div className='my-5'>
              <Divider />
            </div>
            {od.orderDetails.map((dt, index) => (
              <>
                <div className='flex justify-between' key={dt.id}>
                  <div className='flex gap-6'>
                    <div className='w-[101.6px] h-[101.6px]'>
                      <Image src={dt.image.url} alt='images'></Image>
                    </div>
                    <div className='flex flex-col gap-1'>
                      <div className='text-2xl font-normal '>
                        {dt.product.title}
                      </div>
                      <div className='text-lg text-[#0000008a] font-normal'>
                        Phân loại hàng: {dt.color.nameColor},{dt.size}
                      </div>
                      <div className='font-medium text-lg'>x{dt.quantity}</div>
                      <div className='text-[#00bfa5] font-normal border-[#26aa99] border-[0.5px] w-52 px-2'>
                        Trả hàng miễn phí 15 ngày
                      </div>
                    </div>
                  </div>
                  <div className='flex text-center justify-end items-center gap-4 mr-20'>
                    <div className='text-[#929292] line-through flex '>
                      <div className='text-xs mb-1'>₫</div>
                      <div>405.000</div>
                    </div>
                    <div className='flex text-[#ee4d2d] font-medium text-lg'>
                      <div className='text-xs mb-1'>₫</div>
                      <div>
                        {' '}
                        {new Intl.NumberFormat('vi-VN', {
                          minimumFractionDigits: 3,
                          maximumFractionDigits: 3,
                        }).format(dt.totalPrice)}
                      </div>
                    </div>
                  </div>
                </div>
                {od.orderDetails.length > 1 &&
                  index < od.orderDetails.length - 1 && (
                    <div className='my-5'>
                      <Divider />
                    </div>
                  )}
              </>
            ))}
          </div>
          <div className='bg-[#fffefb] border-[1px] shadow-sm rounded-tl-lg rounded-tr-lg p-4'>
            <div className='flex gap-4 items-center justify-end my-4 mr-2'>
              <div className='text-lg font-normal'>Thành tiền:</div>
              <div className='flex items-center text-4xl text-[#ee4d2d] font-normal'>
                <div className='text-lg mb-3'>₫</div>
                <div>
                  {new Intl.NumberFormat('vi-VN', {
                    minimumFractionDigits: 3,
                    maximumFractionDigits: 3,
                  }).format(od.order.subTotal)}
                </div>
              </div>
            </div>
            <div className='flex justify-between'>
              {od.order.status === 'PAID' && !od.order.statusRating ? (
                <div>
                  <div className='text-[#0000008a] flex gap-1'>
                    <div>Đánh giá sản phẩm trước</div>
                    <div className='underline'>10-10-2024</div>
                  </div>
                  <div className='text-[#ee4d2d] '>
                    Đánh giá ngay nhận 300 xu
                  </div>
                </div>
              ) : (
                <div></div>
              )}

              <div className='flex gap-4 my-4'>
                {(od.order.status === 'PAID' || od.order.status === 'CANCEL') &&
                  (!od.order.statusRating ? (
                    <button
                      className='border-[0.5px] bg-[#ee4d2d] px-14 py-2 text-white text-lg rounded-md font-medium hover:bg-[#ee2d2d]'
                      onClick={() => handleOpenRating(od.order.id)}
                    >
                      Đánh Giá
                    </button>
                  ) : (
                    <button className='border-[0.5px] bg-[#ee4d2d] px-14 py-2 text-white text-lg rounded-md font-medium hover:bg-[#ee2d2d]'>
                      Mua Lại
                    </button>
                  ))}

                <button className='border-[0.5px] px-8 py-2 text-lg rounded-md font-normal hover:bg-[#f3f3f3]'>
                  Liên Hệ Người Bán
                </button>
                {od.order.status === 'PAID' &&
                  (!od.order.statusRating ? (
                    <button className='border-[0.5px]  px-14 py-2 text-lg rounded-md font-normal hover:bg-[#f3f3f3]'>
                      Mua Lại
                    </button>
                  ) : (
                    <button
                      className='border-[0.5px]  px-8 py-2 text-lg rounded-md font-normal hover:bg-[#f3f3f3]'
                      onClick={() => handleShowRating(od.order.id)}
                    >
                      Xem Đánh giá
                    </button>
                  ))}
              </div>
            </div>
          </div>
        </div>
      ))}
      <Modal onClose={onCloseRating} isOpen={isOpenRating} size='4xl'>
        <ModalOverlay />
        <ModalContent>
          <div className='flex gap-4 items-center ml-8 mt-8'>
            {back && (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='#cccccc'
                viewBox='0 0 24 24'
                stroke-width='1.5'
                stroke='currentColor'
                className='size-6'
              >
                <path
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  d='M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18'
                />
              </svg>
            )}

            <Text className='text-2xl  '>Đánh giá sản phẩm</Text>
          </div>

          <div className='mt-12 mx-8'>
            {orderDetails.map((od) => (
              <div className='flex gap-4 mb-5' key={od.id}>
                <Image
                  src={od.image.url}
                  alt='images'
                  className='object-cover w-20'
                ></Image>
                <div>
                  <div className='text-xl font-medium'>{od.product.title}</div>
                  <div className='flex gap-1'>
                    <div>
                      Phân loại hàng: {od.color.nameColor}, {od.size}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className='mt-8 text-xl flex gap-16 items-center'>
              <div>Chất lượng sản phẩm</div>
              <div className='flex gap-4'>
                <div className='rating'>
                  <input
                    type='radio'
                    name='rating-2'
                    value='1'
                    className='mask mask-star-2 bg-orange-400'
                    onChange={(e) => handleRatingChange(e)}
                  />
                  <input
                    type='radio'
                    name='rating-2'
                    value='2'
                    className='mask mask-star-2 bg-orange-400'
                    onChange={(e) => handleRatingChange(e)}
                  />
                  <input
                    type='radio'
                    name='rating-2'
                    value='3'
                    className='mask mask-star-2 bg-orange-400'
                    onChange={(e) => handleRatingChange(e)}
                  />
                  <input
                    type='radio'
                    name='rating-2'
                    value='4'
                    className='mask mask-star-2 bg-orange-400'
                    onChange={(e) => handleRatingChange(e)}
                  />
                  <input
                    type='radio'
                    name='rating-2'
                    value='5'
                    className='mask mask-star-2 bg-orange-400'
                    onChange={(e) => handleRatingChange(e)}
                    defaultChecked
                  />
                </div>
                <div>{getRatingText(star)}</div>
              </div>
            </div>
            <div className='mt-4 bg-[#f5f5f5] p-5'>
              <div className='bg-white border px-5 py-3'>
                <div>
                  <Textarea
                    placeholder='Hãy chia sẻ những điều bạn thích về sản phẩm này với những người mua khác nhé.'
                    size='sm'
                    onChange={(e) => setComment(e.target.value)}
                  ></Textarea>
                </div>
                <div className=' mt-4'>
                  <button
                    className='flex gap-4 items-center justify-center border-[#ee4d2d] border-[1px] px-6 py-2 bg-[#fef6f5] w-56 relative'
                    onClick={handleButtonClick}
                  >
                    <div>
                      <svg
                        width='20'
                        height='18'
                        viewBox='0 0 20 18'
                        fill='none'
                      >
                        <path
                          fillRule='evenodd'
                          clipRule='evenodd'
                          d='M6.15377 9.76895C6.15377 11.8927 7.87492 13.6151 9.99992 13.6151C12.1236 13.6151 13.8461 11.8927 13.8461 9.76895C13.8461 7.6446 12.1236 5.9228 9.99992 5.9228C7.87492 5.9228 6.15377 7.6446 6.15377 9.76895ZM5 9.76896C5 7.00771 7.23813 4.76896 10 4.76896C12.7613 4.76896 15 7.00771 15 9.76896C15 12.5296 12.7613 14.769 10 14.769C7.23813 14.769 5 12.5296 5 9.76896ZM1.15385 17.2606C0.489784 17.2606 0 16.7249 0 16.0662V4.12218C0 3.46224 0.489784 2.8459 1.15385 2.8459H4.61538L5.21635 1.73267C5.21635 1.73267 5.75421 0.538208 6.41827 0.538208H13.5817C14.2452 0.538208 14.7837 1.73267 14.7837 1.73267L15.3846 2.8459H18.8462C19.5096 2.8459 20 3.46224 20 4.12218V16.0662C20 16.7249 19.5096 17.2606 18.8462 17.2606H1.15385Z'
                          fill='#EE4D2D'
                        ></path>
                      </svg>
                    </div>
                    <div className='text-[#ee4d2d] font-medium'>
                      Thêm Hình ảnh
                    </div>
                  </button>
                  <input
                    type='file'
                    accept='image/*'
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                    ref={fileInputRef}
                  />
                  {loading ? (
                    <CircularProgress isIndeterminate color='green.300' />
                  ) : (
                    selectedImage && (
                      <div className='flex items-center mt-2'>
                        <Image
                          src={imageUrl}
                          alt='Uploaded'
                          width={20}
                          height={20}
                          className='ml-4 w-12 h-12 object-cover'
                        />
                        <button
                          onClick={handleDeleteImage}
                          className='ml-2 text-red-500'
                        >
                          Xóa
                        </button>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>

          <ModalFooter>
            <Button
              onClick={() => {
                onCloseRating(),
                  setSelectedImage(null),
                  setImageUrl(''),
                  setBack(false)
              }}
              className='mr-5'
            >
              Trở lại
            </Button>
            <Button
              className='mr-2'
              colorScheme='red'
              onClick={() =>
                handleRating(
                  orderDetails[0].product.id,
                  orderDetails[0].order.id
                )
              }
            >
              Hoàn Thành
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal
        onClose={onOpenSeeReviews}
        isOpen={isOpenSeeReviews}
        isCentered
        size='3xl'
      >
        <ModalOverlay />
        <ModalContent>
          {showRating && (
            <div className='px-6 py-8' key={showRating.rating.id}>
              <div className='text-2xl font-medium'>Đánh Giá Shop</div>

              <div className='mt-4 flex gap-4 items-center'>
                <div className='w-20 h-20'>
                  <Image
                    src={showRating.orderDetails[0].product.image}
                    alt='Product Image'
                    width={20}
                    height={20}
                    className='object-cover'
                  />
                </div>
                <div>
                  <div className='text-xl'>
                    {showRating.orderDetails[0].product.title}
                  </div>
                  {showRating.orderDetails.length > 0 && (
                    <div className='text-[#00000042] text-lg font-normal'>
                      Phân loại hàng:{' '}
                      {showRating.orderDetails.map((dt, index) => (
                        <span key={dt.id}>
                          {dt.color.nameColor} ({dt.size})
                          {index < showRating.orderDetails.length - 1
                            ? ', '
                            : ''}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <button
                  className='bg-[#fef6f5] text-[#ee4d2d] border-[#ee4d2d] border-[1px] px-4 h-10 rounded-sm font-medium'
                  onClick={() => handleEdit(showRating.order.id)}
                >
                  Sửa
                </button>
              </div>

              <div className='my-8 ml-20'>
                <Divider />
              </div>

              <div className='flex gap-4 ml-4'>
                <div className='w-[58.4px] h-[58.4px]'>
                  <Image
                    src='https://khoinguonsangtao.vn/wp-content/uploads/2022/11/hinh-anh-anime-nam-toc-trang-mat-xanh.jpg'
                    alt='image'
                    height={58}
                    width={58}
                    className='object-cover rounded-full'
                  />
                </div>
                <div>
                  <div>{showRating.rating.customer.fullName}</div>
                  <div className='flex'>
                    {Array.from({ length: 5 }, (_, index) => (
                      <div key={index}>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          width='1.2em'
                          height='1.2em'
                          viewBox='0 0 64 64'
                          fill={
                            index < (showRating.rating.star || 0)
                              ? '#EE4D2D'
                              : '#ccc'
                          }
                        >
                          <path d='M62 25.2H39.1L32 3l-7.1 22.2H2l18.5 13.7l-7 22.1L32 47.3L50.5 61l-7.1-22.2z' />
                        </svg>
                      </div>
                    ))}
                  </div>
                  <div className='text-[#bbb] mt-2'>
                    {showRating.rating.createAt}
                  </div>
                  <div className='mt-5 text-xl font-normal'>
                    {showRating.rating.comment}
                  </div>
                </div>
              </div>
            </div>
          )}

          <ModalFooter>
            <button
              onClick={onCloseSeeReviews}
              className='px-14 py-3 border-[1px] shadow-md'
            >
              OK
            </button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default HistoryOrder
