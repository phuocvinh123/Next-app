export interface User {
  id: number
  username: string
  password: string
}

export interface Product {
  id: number
  title: string
  price: number
  category: string
  description: string
  image: string
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
export interface ListCategoryProps {
  selectedCategory: string
  setSelectedCategory: (category: string) => void
}

export interface ShowCartProps {
  addToCart: (productId: number) => Promise<void>
}
