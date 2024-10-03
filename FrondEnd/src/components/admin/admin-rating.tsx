/* eslint-disable @typescript-eslint/no-explicit-any */
import { RatingDTO } from '@/components/interfaces/interface'
import {
  Button,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Portal,
  Select,
  Table,
  TableContainer,
  Tbody,
  Td,
  Textarea,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const RatingAdmin = () => {
  const [rating, setRating] = useState<RatingDTO[]>([])
  const [repComment, setRepComment] = useState('')
  const [selected, setSelected] = useState('')
  const [change, setChange] = useState(false)
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(
          selected
            ? `http://localhost:9002/api/ratings/status/${selected}`
            : `http://localhost:9002/api/ratings`
        )
        const data = await response.json()
        setRating(data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchOrder()
  }, [change, selected])

  const handleRepComment = async (ratingId: number) => {
    if (repComment) {
      const data = {
        ratingId,
        repComment,
      }
      try {
        const response = await fetch(
          'http://localhost:9002/api/ratings/repComment',
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          }
        )

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(
            `Failed to update rating: ${errorData.message || 'Unknown error'}`
          )
        }
        const updatedRating: RatingDTO = await response.json()
        setRating((prevRatings) =>
          prevRatings.map((r) =>
            r.id === updatedRating.id ? updatedRating : r
          )
        )
        setChange(!change)
        toast.success('rep comment successfully')
      } catch (error) {
        console.error('Error updating rating:', error)
      }
    } else {
      toast.warning('Vui nhập để rep comment')
    }
  }

  const handlechange = (e: any) => {
    setSelected(e.target.value)
  }

  const handleStatus = async (status: string, ratingId: number) => {
    const data = {
      status: status,
      ratingId: ratingId,
    }
    try {
      const res = await fetch(
        'http://localhost:9002/api/ratings/changeStatus',
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      )

      if (!res.ok) {
        throw new Error('Network response was not ok')
      }
      setChange(!change)
      toast.success('Thay đổi trạng thái thành công')
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <div className='bg-white mr-12 p-4 w-[1440px] mb-10'>
      <div className='mt-5 w-[250px]'>
        <Select
          placeholder='Tất cả'
          value={selected || ''}
          onChange={handlechange}
        >
          <option value='PENDING'>PENDING</option>
          <option value='APPROVED'>APPROVED</option>
          <option value='CANCEL'>CANCEL</option>
        </Select>
      </div>
      <div className='mt-14 mb-5'>
        <TableContainer>
          <Table variant='simple'>
            <Thead>
              <Tr>
                <Th textAlign='center'>#</Th>
                <Th textAlign='center'>Full Name</Th>
                <Th textAlign='center' w={150}>
                  Product
                </Th>
                <Th textAlign='center'>Date</Th>
                <Th textAlign='center'>Comment</Th>
                <Th textAlign='center'>Star</Th>
                <Th textAlign='center'>Status</Th>
                <Th textAlign='center'>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {rating.map((r) => (
                <Tr key={r.id}>
                  <Td textAlign='center'>{r.id}</Td>
                  <Td textAlign='center'>{r.customer.fullName}</Td>
                  <Td textAlign='center' isTruncated w={150}>
                    {r.product.title}
                  </Td>
                  <Td textAlign='center'>{r.createAt}</Td>
                  <Td textAlign='center'>{r.comment}</Td>
                  <Td textAlign='center'>
                    <div className='flex'>
                      {Array.from({ length: 5 }, (_, index) => (
                        <div key={index}>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='1em'
                            height='1em'
                            viewBox='0 0 64 64'
                            fill={index < (r.star || 0) ? '#EE4D2D' : '#ccc'}
                          >
                            <path d='M62 25.2H39.1L32 3l-7.1 22.2H2l18.5 13.7l-7 22.1L32 47.3L50.5 61l-7.1-22.2z' />
                          </svg>
                        </div>
                      ))}
                    </div>
                  </Td>
                  <Td textAlign='center'>
                    <Select
                      value={r.erating}
                      onChange={(e) => handleStatus(e.target.value, r.id)}
                      color='black'
                      textAlign='center'
                      isDisabled={
                        r.erating === 'APPROVED' || r.erating === 'CANCEL'
                      }
                      bg={
                        r.erating === 'APPROVED'
                          ? 'green.200'
                          : r.erating === 'PENDING'
                          ? 'yellow.200'
                          : r.erating === 'CANCEL'
                          ? 'red.200'
                          : 'gray.200'
                      }
                      borderColor={
                        r.erating === 'APPROVED'
                          ? 'green.500'
                          : r.erating === 'PENDING'
                          ? 'yellow.500'
                          : r.erating === 'CANCEL'
                          ? 'red.500'
                          : 'gray.500'
                      }
                    >
                      <option
                        value='PENDING'
                        disabled={r.erating === 'PENDING'}
                      >
                        PENDING
                      </option>
                      <option value='APPROVED'>APPROVED</option>
                      <option value='CANCEL' disabled={r.erating === 'CANCEL'}>
                        CANCEL
                      </option>
                    </Select>
                  </Td>
                  {r.repComment ? (
                    <Td textAlign='center'>Replied</Td>
                  ) : (
                    <Td textAlign='center'>
                      <Popover>
                        <PopoverTrigger>
                          <div className='cursor-pointer'>rep comment</div>
                        </PopoverTrigger>
                        <Portal>
                          <PopoverContent>
                            <PopoverBody>
                              <Textarea
                                onChange={(e) => setRepComment(e.target.value)}
                              ></Textarea>
                              <Button
                                colorScheme='blue'
                                className='mt-4'
                                onClick={() => {
                                  handleRepComment(r.id), setRepComment('')
                                }}
                              >
                                Rep
                              </Button>
                            </PopoverBody>
                          </PopoverContent>
                        </Portal>
                      </Popover>
                    </Td>
                  )}
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </div>
    </div>
  )
}
export default RatingAdmin
