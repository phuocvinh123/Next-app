'use client'

import { OrderDetail } from '@/components/interfaces/interface'
import {
  Button,
  Card,
  CardBody,
  Heading,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

const OrderSuccess = () => {
  const { id } = useParams()

  const [orderDetails, setOrderDetails] = useState<OrderDetail[]>([])
  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:9002/api/orderDetails/${id}`
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
    fetchOrderDetails()
  }, [id])

  return (
    <div className='container mx-auto my-20'>
      <div className='flex flex-col justify-center items-center'>
        <div className='text-3xl font-medium '>Thông tin đơn hàng</div>
        <div className='flex gap-10 mt-10'>
          <div className='w-[450px] flex flex-col justify-center items-center border-r-2 pr-4'>
            <div className='font-medium text-xl'>Customer information</div>
            <div className='flex flex-col justify-start'>
              {orderDetails &&
                orderDetails.length > 0 &&
                orderDetails[0].order &&
                orderDetails[0].order.customer && (
                  <div className='mt-10 text-lg'>
                    <div>
                      <strong>Full Name:</strong>{' '}
                      {orderDetails[0].order.customer.fullName}
                    </div>
                    <div className='mt-2'>
                      <strong>Date:</strong>{' '}
                      {orderDetails[0].order.customer.date}
                    </div>
                    <div className='mt-2'>
                      <strong>Phone:</strong>{' '}
                      {orderDetails[0].order.customer.phone}
                    </div>
                    <div className='mt-2'>
                      <strong>Email:</strong>{' '}
                      {orderDetails[0].order.customer.email}
                    </div>
                    <div className='mt-2'>
                      <strong>Address:</strong>{' '}
                      {orderDetails[0].order.customer.address}
                    </div>
                    <div className='mt-2'>
                      <strong>Status:</strong> {orderDetails[0].order.status}
                    </div>
                  </div>
                )}
            </div>
          </div>
          <div className='w-[650px] flex flex-col justify-center items-center'>
            <div className='font-medium text-xl'>Product</div>
            {orderDetails.map((od) => (
              <div className='mt-10 w-[650px]' key={od.id}>
                <Card
                  direction={{ base: 'column', sm: 'row' }}
                  overflow='hidden'
                  variant='outline'
                >
                  <Image
                    objectFit='cover'
                    width={40}
                    height={40}
                    src={od.image.url}
                    alt={od.product.title}
                  />

                  <Stack>
                    <CardBody>
                      <Heading size='md'>{od.product.title}</Heading>
                      <Text isTruncated maxW={450} py='2'>
                        Mẫu: {od.color.nameColor}
                      </Text>
                      <Text isTruncated maxW={450} py='2'>
                        Size {od.size}
                      </Text>
                      <div className='flex gap-4'>
                        <Text py='2'>
                          <strong>Quantity:</strong> {od.quantity}
                        </Text>
                        <Text py='2'>
                          <strong>Price:</strong> {od.totalPrice.toFixed(3)} $
                        </Text>
                      </div>
                    </CardBody>
                  </Stack>
                </Card>
              </div>
            ))}
            <div className='mt-10 text-lg'>
              <strong className='text-xl'>Sub Total:</strong>
              {orderDetails &&
                orderDetails.length > 0 &&
                orderDetails[0].order &&
                orderDetails[0].order.subTotal.toFixed(3)}
              $
            </div>
          </div>
        </div>
        <div className='flex gap-20 mt-20'>
          <Button colorScheme='gray'>
            <Link href={'/product'}> Continue Product</Link>
          </Button>
          <Button colorScheme='teal'>
            <Link href={'/history-order'}> View purchase history</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default OrderSuccess
