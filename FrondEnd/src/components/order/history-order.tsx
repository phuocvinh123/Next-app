/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useEffect, useState } from 'react'
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
              </div>
            </div>
          </div>

          <ModalFooter>
            <Button onClick={onCloseRating} className='mr-5'>
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
