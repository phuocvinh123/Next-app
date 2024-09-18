import { toast } from 'react-toastify'
import Swal from 'sweetalert2'

export const handleMinusCart = async (
  cartId: number,
  setShouldFetchCart: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    const response = await fetch(
      `http://localhost:9002/api/carts/minus/${cartId}`
    )
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    toast.success('Giảm số lượng sản phẩm thành công')
    setShouldFetchCart((prev) => !prev)
  } catch (error) {
    console.error('Error:', error)
    toast.error('Số lượng không thể nhỏ hơn 1')
  }
}

export const handlePlusCart = async (
  cartId: number,
  setShouldFetchCart: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    const response = await fetch(
      `http://localhost:9002/api/carts/plus/${cartId}`
    )
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    toast.success('Tăng số lượng sản phẩm thành công')
    setShouldFetchCart((prev) => !prev)
  } catch (error) {
    console.error('Error:', error)
    toast.error('Có lỗi xảy ra khi tăng số lượng sản phẩm.')
  }
}

export const handleDeleteCart = async (
  cartId: number,
  setShouldFetchCart: React.Dispatch<React.SetStateAction<boolean>>
) => {
  Swal.fire({
    title: 'Bạn có chắc chắn?',
    text: 'Hành động này không thể hoàn tác!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Vâng, xóa nó!',
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const response = await fetch(
          `http://localhost:9002/api/carts/delete/${cartId}`,
          {
            method: 'DELETE',
          }
        )
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        setShouldFetchCart((prev) => !prev)
        Swal.fire('Đã xóa!', 'Sản phẩm của bạn đã bị xóa.', 'success')
      } catch (error) {
        console.error('Error:', error)
        toast.error('Có lỗi xảy ra khi xóa sản phẩm')
      }
    }
  })
}
