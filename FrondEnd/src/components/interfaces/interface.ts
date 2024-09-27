import { JwtPayload } from 'jwt-decode'

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
export interface Images {
  id: number
  url: string
  product: Product
  color: Color
  size: Size[]
}

export interface Size {
  id: number
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
}

export interface Order {
  id: number
  customer: Customer
  date: string
  totalProduct: number
  status: string
  subTotal: number
}

export interface OrderDetail {
  id: number
  order: Order
  product: Product
  quantity: number
  totalPrice: number
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
