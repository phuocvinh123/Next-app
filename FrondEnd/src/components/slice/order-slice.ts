import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Order } from '@/components/interfaces/interface'

interface OrderState {
  items: Order[]
  selectedStatus: string
  change: boolean
  loading: boolean
  error: string | null
}

const initialState: OrderState = {
  items: [],
  selectedStatus: '',
  change: false,
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
    setSelectedStatus(state, action: PayloadAction<string>) {
      state.selectedStatus = action.payload
    },
    setChange(state, action: PayloadAction<boolean>) {
      state.change = action.payload
    },
  },
})

export const {
  fetchOrderStart,
  fetchOrderSuccess,
  fetchOrderFailure,
  setSelectedStatus,
  setChange,
} = orderSlice.actions

export default orderSlice.reducer
