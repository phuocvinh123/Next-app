/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useEffect, useState } from 'react'
import { Order, OrderDetail } from '@/components/interfaces/interface'
import {
  fetchOrderFailure,
  fetchOrderStart,
  fetchOrderSuccess,
} from '@/components/slice/order-slice'
import { RootState } from '@/components/store/store'
import {
  Button,
  Card,
  CardBody,
  Heading,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Textarea,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react'
import { getCookie } from 'cookies-next'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const HistoryOrder = () => {
  const dispatch = useDispatch()
  const { items: orders } = useSelector((state: RootState) => state.order)
  const customerId = getCookie('customerId')
  const {
    isOpen: isOpenDetail,
    onOpen: onOpenDetail,
    onClose: onCloseDetail,
  } = useDisclosure()

  const {
    isOpen: isOpenRating,
    onOpen: onOpenRating,
    onClose: onCloseRating,
  } = useDisclosure()

  const [orderDetails, setOrderDetails] = useState<OrderDetail[]>([])
  const [isClient, setIsClient] = useState(false)
  const [star, setStar] = useState(5)
  const [comment, setComment] = useState('')
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [imageUrl, setImageUrl] = useState<string>('')
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
      } else {
        console.error(data.error)
      }
    } catch (error) {
      console.error('Có lỗi xảy ra:', error)
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
        dispatch(fetchOrderStart())
        try {
          const response = await fetch(
            `http://localhost:9002/api/orders/${customerId}`
          )
          const data: Order[] = await response.json()
          dispatch(fetchOrderSuccess(data))
        } catch (error) {
          dispatch(fetchOrderFailure('Error fetching order data'))
        }
      }
    }
    fetchOrder()
  }, [customerId, dispatch])

  const handleOpen = (orderId: number) => {
    fetchOrderDetails(orderId)
    onOpenDetail()
  }

  const handleOpenRating = (orderId: number) => {
    setSelectedImage(null)
    setImageUrl('')
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
  enum OrderStatus {
    CONFIRMING = 'CONFIRMING',
    INTRANSIT = 'INTRANSIT',
    PAID = 'PAID',
    CANCEL = 'CANCEL',
  }
  const statusColors: Record<OrderStatus, string> = {
    [OrderStatus.CONFIRMING]: 'yellow',
    [OrderStatus.INTRANSIT]: 'blue',
    [OrderStatus.PAID]: 'green',
    [OrderStatus.CANCEL]: 'red',
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
      toast.success('Đánh giá sản phẩm thành công')
    } catch (error) {
      console.error('Error fetching order details:', error)
    }
  }

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) return null

  return (
    <div className='my-10 container mx-auto'>
      <TableContainer className='mt-20'>
        <Table variant='simple'>
          <Thead>
            <Tr>
              <Th textAlign='center'>#</Th>
              <Th textAlign='center'>Full Name</Th>
              <Th>Date Order</Th>
              <Th textAlign='center'>Status</Th>
              <Th textAlign='center'>Total Product</Th>
              <Th isNumeric>Sub Total</Th>
              <Th textAlign='center'>Xem chi tiết</Th>
            </Tr>
          </Thead>
          <Tbody>
            {orders.length === 0 ? (
              <Text className='text-xl font-normal text-[#929292]'>
                You have not purchased any products, please click buy to
                continue viewing.
              </Text>
            ) : (
              orders.map((order, index) => (
                <Tr key={order.id}>
                  <Td textAlign='center'>{index + 1}</Td>
                  <Td textAlign='center'>{order.customer.fullName}</Td>

                  <Td>{order.date}</Td>
                  <Td textAlign='center'>
                    <Button
                      colorScheme={
                        statusColors[order.status as OrderStatus] || 'gray'
                      }
                      w={100}
                    >
                      {order.status}
                    </Button>
                  </Td>
                  <Td textAlign='center'>{order.totalProduct}</Td>
                  <Td isNumeric>{order.subTotal.toFixed(3)} $</Td>
                  <Td className='flex gap-4 items-center justify-center'>
                    <Button onClick={() => handleOpen(order.id)}>
                      Chi tiết
                    </Button>
                    {order.statusRating === false &&
                      order.status === 'PAID' && (
                        <Button
                          colorScheme='red'
                          onClick={() => handleOpenRating(order.id)}
                        >
                          Đánh giá
                        </Button>
                      )}
                  </Td>
                </Tr>
              ))
            )}
          </Tbody>
        </Table>
      </TableContainer>

      <Modal isOpen={isOpenDetail} onClose={onCloseDetail}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Information</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {orderDetails &&
              orderDetails.length > 0 &&
              orderDetails[0].order &&
              orderDetails[0].order.customer && (
                <div>
                  <Text>
                    <strong>Name: </strong>
                    {orderDetails[0].order.customer.fullName}
                  </Text>
                  <Text>
                    <strong>Phone: </strong>
                    {orderDetails[0].order.customer.phone}
                  </Text>
                  <Text>
                    <strong>Address: </strong>
                    {orderDetails[0].order.customer.address}
                  </Text>
                </div>
              )}

            <Text pt='3'>
              <strong className='text-xl'>Sản phẩm</strong>
            </Text>

            {orderDetails.map((detail) => (
              <div key={detail.id} className='mt-5'>
                <Card
                  direction={{ base: 'column', sm: 'row' }}
                  overflow='hidden'
                  variant='outline'
                >
                  <div className='flex items-center ml-2 '>
                    <Image
                      objectFit='cover'
                      src={detail.image?.url}
                      alt={detail.product.title}
                    />
                  </div>

                  <Stack>
                    <CardBody>
                      <Heading size='md'>{detail.product.title}</Heading>
                      <Text isTruncated maxW={300} py='2'>
                        Mẫu: {detail.color?.nameColor}
                      </Text>
                      <Text isTruncated maxW={300} py='2'>
                        Size {detail?.size}
                      </Text>
                      <div className='flex justify-between flex-wrap'>
                        <Text py='2'>
                          <strong>Quantity:</strong> {detail.quantity}
                        </Text>
                        <Text py='2'>
                          <strong>Price:</strong> {detail.totalPrice.toFixed(3)}{' '}
                          $
                        </Text>
                      </div>
                    </CardBody>
                  </Stack>
                </Card>
              </div>
            ))}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onCloseDetail}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal onClose={onCloseRating} isOpen={isOpenRating} size='4xl'>
        <ModalOverlay />
        <ModalContent>
          <Text className='text-2xl ml-8 mt-8 '>Đánh giá sản phẩm</Text>
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
                  {selectedImage && (
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
                  )}
                </div>
              </div>
            </div>
          </div>

          <ModalFooter>
            <Button
              onClick={() => {
                onCloseRating(), setSelectedImage(null), setImageUrl('')
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
    </div>
  )
}

export default HistoryOrder
