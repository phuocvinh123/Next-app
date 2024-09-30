import {
  Divider,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react'
import React from 'react'

const Denounce = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <button
        className='text-xl text-[#767676] text-center cursor-pointer'
        onClick={onOpen}
      >
        Tố cáo
      </button>
      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset='slideInBottom'
        size='xl'
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <div className='text-xl font-normal my-4 ml-8'>Chọn lý do</div>
          <Divider />
          <div className='ml-8 mt-4 text-lg h-[250px] flex flex-col gap-6 font-[480] mb-6 overflow-x-auto'>
            <div className='hover:text-[#EE4D2D] cursor-pointer'>
              Sản phẩm bị cấm buôn bán (động vật hoang dã, 18+ ...)
            </div>
            <div className='hover:text-[#EE4D2D] cursor-pointer'>
              Sản phẩm có dấu hiệu lừa đảo
            </div>
            <div className='hover:text-[#EE4D2D] cursor-pointer'>
              Hàng giả, hàng nhái
            </div>
            <div className='hover:text-[#EE4D2D] cursor-pointer'>
              Sản phẩm không rõ nguồn gốc, xuất xứ
            </div>
            <div className='hover:text-[#EE4D2D] cursor-pointer'>
              Hình ảnh sản phẩm không rõ ràng
            </div>
            <div className='hover:text-[#EE4D2D] cursor-pointer'>
              Sản phẩm có hình ảnh, nội dung phản cảm hoặc có thể gâ...
            </div>
            <div className='hover:text-[#EE4D2D] cursor-pointer'>Khác</div>
            <div className='hover:text-[#EE4D2D] cursor-pointer'>
              Tên sản phẩm (Name) không phù hợp với hình ảnh sản ph...
            </div>
            <div className='hover:text-[#EE4D2D] cursor-pointer'>
              Sản phẩm có dấu hiệu tăng đơn ảo
            </div>
          </div>
        </ModalContent>
      </Modal>
    </>
  )
}
export default Denounce
