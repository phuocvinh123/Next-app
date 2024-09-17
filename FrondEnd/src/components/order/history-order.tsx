'use client'

import { useEffect, useState } from 'react'
import { Order } from '@/components/interfaces/interface'
import {
  fetchOrderFailure,
  fetchOrderStart,
  fetchOrderSuccess,
} from '@/components/slice/order-slice'
import { RootState } from '@/components/store/store'
import {
  Image,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import { getCookie } from 'cookies-next'

import { useDispatch, useSelector } from 'react-redux'

const HistoryOrder = () => {
  const dispatch = useDispatch()
  const { items: orders } = useSelector((state: RootState) => state.order)
  const customerId = getCookie('userId')

  const [isClient, setIsClient] = useState(false)

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
              <Th textAlign='center'>Image</Th>
              <Th>Tittle</Th>
              <Th>Decreption</Th>
              <Th isNumeric>Quantity</Th>
            </Tr>
          </Thead>
          <Tbody>
            {orders.length === 0 ? (
              <Text className='text-3xl font-normal text-[#929292]'>
                You have not purchased any products, please click buy to
                continue viewing
              </Text>
            ) : (
              orders.map((order) => (
                <Tr key={order.id}>
                  <Td className='flex justify-center'>
                    <Image
                      src={order.product.image}
                      alt='images'
                      width={40}
                      height={40}
                    />
                  </Td>
                  <Td isTruncated maxW={350}>
                    {' '}
                    {order.product.title}
                  </Td>
                  <Td isTruncated maxW={350}>
                    {' '}
                    {order.product.description}
                  </Td>
                  <Td isNumeric>{order.quantity}</Td>
                </Tr>
              ))
            )}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default HistoryOrder
