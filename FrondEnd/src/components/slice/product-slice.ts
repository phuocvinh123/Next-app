import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Product {
  id: number
  title: string
  price: number
  image: string
  description: string
}

interface ProductState {
  products: Product[]
  loading: boolean
  error: string | null
  selectedCategory: string
  change: boolean
}

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
  selectedCategory: '',
  change: false,
}

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    fetchProductsStart(state) {
      state.loading = true
      state.error = null
    },
    fetchProductsEnd(state) {
      state.loading = false
      state.error = null
    },
    fetchProductsSuccess(state, action: PayloadAction<Product[]>) {
      state.loading = false
      state.products = action.payload
    },
    fetchProductsFailure(state, action: PayloadAction<string>) {
      state.loading = false
      state.error = action.payload
    },
    setSelectedCategory(state, action: PayloadAction<string>) {
      state.selectedCategory = action.payload
    },
    setChange(state, action: PayloadAction<boolean>) {
      state.change = action.payload
    },
  },
})

export const {
  fetchProductsStart,
  fetchProductsEnd,
  fetchProductsSuccess,
  fetchProductsFailure,
  setSelectedCategory,
  setChange,
} = productSlice.actions

export default productSlice.reducer
