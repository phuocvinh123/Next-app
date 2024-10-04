'use client'

import {
  Box,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  Stepper,
  StepSeparator,
  StepStatus,
  StepTitle,
  useSteps,
} from '@chakra-ui/react'

export default function OrderDetailComponent() {
  const steps = [
    { title: 'Đơn Hàng Đã Đặt', description: '15:01 04-09-2024' },
    { title: 'Xác Nhận Thông Tin Thanh Toán', description: '15:01 04-09-2024' },
    { title: 'Đã Giao Cho ĐVVC', description: '15:01 04-09-2024' },
    { title: 'Đã Nhận Được Hàng', description: '15:01 04-09-2024' },
    { title: 'Đơn Hàng Đã Được Đánh Giá', description: '15:01 04-09-2024' },
  ]
  const { activeStep } = useSteps({
    index: 1,
    count: steps.length,
  })
  return (
    <div className='container mx-auto my-10'>
      <div className='border-[0.5px] shadow-sm p-5 rounded-bl-lg rounded-br-lg flex justify-between'>
        <div className='flex gap-2 items-center'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            stroke-width='1.5'
            stroke='#0000008a'
            className='size-6'
          >
            <path
              stroke-linecap='round'
              stroke-linejoin='round'
              d='M15.75 19.5 8.25 12l7.5-7.5'
            />
          </svg>
          <div className='uppercase text-xl text-[#0000008a] font-[490]'>
            Trở lại
          </div>
        </div>
        <div className='flex gap-4 text-xl'>
          <div>MÃ ĐƠN HÀNG: 2409043XRBW2U2</div>
          <div>|</div>
          <div className='text-[#ee4d2d]'>Đơn hàng đã hoàn thành</div>
        </div>
      </div>
      <div className='border-[0.5px] shadow-sm p-10 rounded-lg '>
        <Stepper index={activeStep}>
          {steps.map((step, index) => (
            <Step key={index}>
              <div className='flex flex-col items-center justify-center text-center'>
                <StepIndicator boxSize={8}>
                  <StepStatus
                    complete={<StepIcon />}
                    incomplete={<StepNumber />}
                    active={<StepNumber />}
                  />
                </StepIndicator>
                <Box className='mt-5'>
                  <StepTitle className='text-xl'>{step.title}</StepTitle>
                  <StepDescription>{step.description}</StepDescription>
                </Box>
              </div>

              <StepSeparator />
            </Step>
          ))}
        </Stepper>
      </div>
    </div>
  )
}
