import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Cart } from '@/components/interfaces/interface'

interface CartState {
  items: Cart[]
  loading: boolean
  error: string | null
}

const initialState: CartState = {
  items: [],
  loading: false,
  error: null,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    fetchCartStart(state) {
      state.loading = true
      state.error = null
    },
    fetchCartSuccess(state, action: PayloadAction<Cart[]>) {
      state.loading = false
      state.items = action.payload
    },
    fetchCartFailure(state, action: PayloadAction<string>) {
      state.loading = false
      state.error = action.payload
    },
    addToCart(state, action: PayloadAction<Cart>) {
      state.items.push(action.payload)
    },
    removeFromCart(state, action: PayloadAction<number>) {
      state.items = state.items.filter((cart) => cart.id !== action.payload)
    },
    updateCartQuantity(
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) {
      const item = state.items.find((cart) => cart.id === action.payload.id)
      if (item) {
        item.quantity = action.payload.quantity
      }
    },
  },
})

export const {
  fetchCartStart,
  fetchCartSuccess,
  fetchCartFailure,
  addToCart,
  removeFromCart,
  updateCartQuantity,
} = cartSlice.actions

export default cartSlice.reducer
