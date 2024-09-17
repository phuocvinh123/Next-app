import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Order } from '@/components/interfaces/interface'

interface OrderState {
  items: Order[]
  loading: boolean
  error: string | null
}

const initialState: OrderState = {
  items: [],
  loading: false,
  error: null,
}

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    fetchOrderStart(state) {
      state.loading = true
      state.error = null
    },
    fetchOrderSuccess(state, action: PayloadAction<Order[]>) {
      state.loading = false
      state.items = action.payload
    },
    fetchOrderFailure(state, action: PayloadAction<string>) {
      state.loading = false
      state.error = action.payload
    },
  },
})

export const { fetchOrderStart, fetchOrderSuccess, fetchOrderFailure } =
  orderSlice.actions

export default orderSlice.reducer
