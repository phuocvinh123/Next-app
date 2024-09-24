'use client'
import { SendEmail } from '@/components/interfaces/interface'
import PageGination from '@/components/pagegination/pages'
import {
  fetchItemsFailure,
  fetchItemsStart,
  fetchItemsSuccess,
  setCurrentPage,
  setPageSize,
} from '@/components/slice/page-slice'
import { RootState } from '@/components/store/store'
import {
  Button,
  Select,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const AdminSendEmail = () => {
  const dispatch = useDispatch()
  const { currentPage, pageSize, totalItems } = useSelector(
    (state: RootState) => state.pagination
  )
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null)
  const [sendEmail, setSendEmail] = useState<SendEmail[]>([])
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStatus(e.target.value)
  }

  useEffect(() => {
    const fetchOrder = async () => {
      dispatch(fetchItemsStart())
      try {
        const response = await fetch(
          selectedStatus
            ? `http://localhost:9002/api/sendEmail/${selectedStatus}?page=${
                currentPage - 1
              }&size=${pageSize}`
            : `http://localhost:9002/api/sendEmail?page=${
                currentPage - 1
              }&size=${pageSize}`
        )
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const data = await response.json()
        setSendEmail(data.content)
        dispatch(
          fetchItemsSuccess({
            totalItems: data.totalElements,
          })
        )
      } catch (error) {
        dispatch(fetchItemsFailure('error.message'))
      }
    }
    fetchOrder()
  }, [selectedStatus, currentPage, pageSize, dispatch])

  return (
    <div className='bg-white mr-12 p-4 w-[1440px] mb-10'>
      <div className='mt-5 w-[250px]'>
        <Select
          placeholder='Tất cả'
          value={selectedStatus || ''}
          onChange={handleChange}
        >
          <option value='sent'>Sent</option>
          <option value='cancel'>Cancel</option>
        </Select>
      </div>
      <div className='mt-14'>
        <TableContainer>
          <Table variant='simple'>
            <Thead>
              <Tr>
                <Th textAlign='center'>#</Th>
                <Th>Full Name</Th>
                <Th>Email</Th>
                <Th>Email content</Th>
                <Th textAlign='center'>Status</Th>
                <Th textAlign='center'>Count</Th>
              </Tr>
            </Thead>
            <Tbody>
              {sendEmail &&
                sendEmail.map((send) => (
                  <Tr key={send.id}>
                    <Td textAlign='center'>{send.id}</Td>
                    <Td>{send.customer.fullName}</Td>
                    <Td>{send.toEmail}</Td>
                    <Td>{send.subject}</Td>
                    <Td textAlign='center'>
                      <Button
                        w={100}
                        backgroundColor={
                          send.statusEmail === 'cancel'
                            ? 'red.400'
                            : 'green.400'
                        }
                        colorScheme='green'
                      >
                        {send.statusEmail}
                      </Button>
                    </Td>
                    <Td textAlign='center'>{send.retryCount}</Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </TableContainer>
      </div>
      <div className='mt-12 flex justify-end mr-5'>
        <PageGination
          currentPage={currentPage}
          pageSize={pageSize}
          totalItems={totalItems}
          setPage={(page) => dispatch(setCurrentPage(page))}
          setPageSize={(size) => dispatch(setPageSize(size))}
        />
      </div>
    </div>
  )
}

export default AdminSendEmail
