import { Order, OrderDetail } from '@/components/interfaces/interface'
import {
  fetchOrderFailure,
  fetchOrderStart,
  fetchOrderSuccess,
  setChange,
  setSelectedStatus,
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
  Select,
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
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const AdminOrder = () => {
  const dispatch = useDispatch()
  const {
    items: orders,
    selectedStatus,
    change,
  } = useSelector((state: RootState) => state.order)
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
      dispatch(fetchOrderStart())
      try {
        const response = await fetch(
          selectedStatus
            ? `http://localhost:9002/api/orders/status/${selectedStatus}`
            : `http://localhost:9002/api/orders`
        )
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const data: Order[] = await response.json()
        dispatch(fetchOrderSuccess(data))
      } catch (error) {
        dispatch(fetchOrderFailure('Error fetching order data'))
      }
    }
    fetchOrder()
  }, [dispatch, selectedStatus])

  const handleOpen = (orderId: number) => {
    fetchOrderDetails(orderId)
    onOpen()
  }

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSelectedStatus(e.target.value))
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

  const handleStatus = async (status: string, orderId: number) => {
    const data = {
      status: status,
      orderId: orderId,
    }

    try {
      const res = await fetch('http://localhost:9002/api/carts/addCart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        throw new Error('Network response was not ok')
      }
      dispatch(setChange(!change))
      toast.success('Thêm sản phẩm thành công')
    } catch (error) {
      console.error('Error:', error)
    }
  }

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) return null

  return (
    <div className='bg-white mr-12 p-4 w-[1440px]'>
      <div className='mt-5 w-[250px]'>
        <Select
          placeholder='Tất cả'
          value={selectedStatus || ''}
          onChange={handleChange}
        >
          <option value='CONFIRMING'>CONFIRMING</option>
          <option value='INTRANSIT'>INTRANSIT</option>
          <option value='PAID'>PAID</option>
          <option value='CANCEL'>CANCEL</option>
        </Select>
      </div>
      <div>
        <TableContainer className='mt-10'>
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
                    <Td textAlign='center' w={200}>
                      <Select
                        value={order.status}
                        onChange={(e) => handleStatus(e.target.value, order.id)}
                        bg={statusColors[order.status as OrderStatus] || 'gray'}
                        color='black'
                        textAlign='center'
                        isDisabled={
                          order.status === 'PAID' || order.status === 'CANCEL'
                        }
                      >
                        <option
                          value='CONFIRMING'
                          disabled={
                            order.status === 'CONFIRMING' ||
                            order.status === 'INTRANSIT'
                          }
                        >
                          Confirming
                        </option>
                        <option
                          value='INTRANSIT'
                          disabled={order.status === 'INTRANSIT'}
                        >
                          In Transit
                        </option>
                        <option value='PAID'>Paid</option>
                        <option value='CANCEL'>Cancel</option>
                      </Select>
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
    </div>
  )
}
export default AdminOrder
