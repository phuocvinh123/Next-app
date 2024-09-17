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
  user: User
  date: string
  product: Product
  quantity: number
}
export interface ListCategoryProps {
  selectedCategory: string
  setSelectedCategory: (category: string) => void
}

export interface ShowCartProps {
  addToCart: (productId: number) => Promise<void>
}
