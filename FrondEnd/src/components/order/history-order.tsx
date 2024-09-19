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
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react'
import { getCookie } from 'cookies-next'

import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

const HistoryOrder = () => {
  const dispatch = useDispatch()
  const { items: orders } = useSelector((state: RootState) => state.order)
  const customerId = getCookie('customerId')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [orderDetails, setOrderDetails] = useState<OrderDetail[]>([])
  const [isClient, setIsClient] = useState(false)
  const router = useRouter()
  useEffect(() => {
    if (!customerId) {
      toast.error('Please login to perform the next functions..')
      router.push('/login')
    }
  }, [])

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
    onOpen()
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
              <Th>#</Th>
              <Th textAlign='center'>Full Name</Th>
              <Th>Date Order</Th>
              <Th textAlign='center'>Status</Th>
              <Th textAlign='center'>Total Product</Th>
              <Th isNumeric>Sub Total</Th>
              <Th>Xem chi tiết</Th>
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
                    >
                      {order.status}
                    </Button>
                  </Td>
                  <Td textAlign='center'>{order.totalProduct}</Td>
                  <Td isNumeric>{order.subTotal} $</Td>
                  <Td>
                    <Button onClick={() => handleOpen(order.id)}>
                      Chi tiết
                    </Button>
                  </Td>
                </Tr>
              ))
            )}
          </Tbody>
        </Table>
      </TableContainer>

      <Modal isOpen={isOpen} onClose={onClose}>
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
                      src={detail.product.image}
                      alt={detail.product.title}
                    />
                  </div>

                  <Stack>
                    <CardBody>
                      <Heading size='md'>{detail.product.title}</Heading>
                      <Text isTruncated maxW={300} py='2'>
                        {detail.product.description}
                      </Text>
                      <div className='flex justify-between'>
                        <Text py='2'>
                          <strong>Quantity:</strong> {detail.quantity}
                        </Text>
                        <Text py='2'>
                          <strong>Price:</strong> {detail.totalPrice} $
                        </Text>
                      </div>
                    </CardBody>
                  </Stack>
                </Card>
              </div>
            ))}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default HistoryOrder
