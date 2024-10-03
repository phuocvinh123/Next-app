import { JwtPayload } from 'jwt-decode'
import { SwiperRef } from 'swiper/react'
export interface User {
  id: number
  username: string
  password: string
}

export interface Discount {
  id: number
  percentDecrease: string
  favourite: boolean
  reduce: string
  cheapChampion: boolean
  sold: string
  images: string
}
// export interface Images {
//   id: number
//   url: string
//   product: Product
//   color: Color
//   size: Size[]
// }

export interface Size {
  id: number
  sizeName: string
}

export interface Variant {
  id: number
  product: Product
  color: Color
}

export interface VariantData {
  variant: Variant
  images: Image[]
  imageSizes: ImageSize[]
}

export interface Image {
  id: number
  url: string
  stock: Stock
  price: number
}

export interface Stock {
  id: number
  quantity: number
}

export interface ImageSize {
  id: number
  imageId: number
  sizeName: string
}

export interface Color {
  id: number
  nameColor: string
  status: boolean
}

export interface Product {
  id: number
  title: string
  price: number
  category: string
  description: string
  image: string
  discount: Discount
}

export interface Cart {
  id: number
  customer: Customer
  date: string
  product: Product
  quantity: number
  color: Color
  size: string
  image: Image
}

export interface Order {
  id: number
  customer: Customer
  date: string
  totalProduct: number
  status: string
  subTotal: number
  statusRating: boolean
}

export interface OrderDetail {
  id: number
  order: Order
  product: Product
  quantity: number
  totalPrice: number
  color: Color
  size: string
  image: Image
}

export interface Customer {
  id: number
  fullName: string
  date: string
  phone: string
  email: string
  address: string
  user: User
}

export interface SendEmail {
  id: number
  body: string
  statusEmail: string
  subject: string
  toEmail: string
  retryCount: number
  customer: Customer
}
export interface ListCategoryProps {
  selectedCategory: string
  setSelectedCategory: (category: string) => void
}

export interface ShowCartProps {
  addToCart: (productId: number) => Promise<void>
}

export interface CustomJwtPayload extends JwtPayload {
  customerId: number
  role: string
}

export interface Rating {
  id: number
  star: number
  comment: string
  createAt: string
  repComment: string
  fullName: string
  eRating: string
  likes: number
  liked: boolean
  imageRatings: ImageRatings[]
}

export interface RatingDTO {
  id: number
  star: number
  comment: string
  createAt: string
  repComment: string
  likes: number
  liked: boolean
  erating: string
  customer: Customer
  product: Product
}

export interface NewLike {
  likes: number
  liked: boolean
}

export interface ImageRatings {
  id: number
  urlImage: string
}

export interface ProductSwiperProps {
  variantDto: VariantData[]
  currentIndex: number | null
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>
  thumbsSwiperRef: React.RefObject<SwiperRef>
}
