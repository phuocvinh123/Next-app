export interface Product {
  id: number
  title: string
  price: string
  category: string
  description: string
  image: string
}

export interface ListCategoryProps {
  selectedCategory: string
  setSelectedCategory: (category: string) => void
}

export interface ProductCart {
  productId: number
  quantity: number
}

export interface Cart {
  id: number
  date: string
  userId: number
  products: ProductCart[]
}

export interface ProductDetails {
  id: number
  title: string
  description: string
  image: string
  quantity: number
}

export interface addCart {
  id: number
  userId: number
  date: string
  products: ProductCart[]
}
