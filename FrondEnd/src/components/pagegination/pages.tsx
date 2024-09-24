import { Select } from '@chakra-ui/react'

interface PageGinationProps {
  currentPage: number
  pageSize: number
  totalItems: number
  setPage: (page: number) => void
  setPageSize: (size: number) => void
}

const PageGination = ({
  currentPage,
  pageSize,
  totalItems,
  setPage,
  setPageSize,
}: PageGinationProps) => {
  const totalPages = Math.ceil(totalItems / pageSize)

  return (
    <div className='flex gap-5 items-center'>
      <div
        onClick={() => currentPage > 1 && setPage(currentPage - 1)}
        className={`cursor-pointer ${currentPage === 1 ? 'opacity-50' : ''}`}
      >
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
            d='M15.75 19.5 8.25 12l7.5-7.5'
          />
        </svg>
      </div>

      <div className='p-2 border rounded-lg'>
        {currentPage} / {totalPages}
      </div>

      <div
        onClick={() => currentPage < totalPages && setPage(currentPage + 1)}
        className={`cursor-pointer ${
          currentPage === totalPages ? 'opacity-50' : ''
        }`}
      >
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
            d='m8.25 4.5 7.5 7.5-7.5 7.5'
          />
        </svg>
      </div>

      <div className='w-32'>
        <Select
          value={pageSize}
          onChange={(e) => setPageSize(parseInt(e.target.value))}
        >
          <option value='10'>10/page</option>
          <option value='20'>20/page</option>
          <option value='30'>30/page</option>
          <option value='50'>50/page</option>
        </Select>
      </div>
    </div>
  )
}

export default PageGination
