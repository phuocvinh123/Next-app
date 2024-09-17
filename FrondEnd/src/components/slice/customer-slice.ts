import { Customer } from '@/components/interfaces/interface'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface CustomerState {
  item: Customer | null
  loading: boolean
  error: string | null
}

const initialState: CustomerState = {
  item: null,
  loading: false,
  error: null,
}

const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    fetchCustomerStart(state) {
      state.loading = true
      state.error = null
    },
    fetchCustomerSuccess(state, action: PayloadAction<Customer>) {
      state.loading = false
      state.item = action.payload
    },
    fetchCustomerFailure(state, action: PayloadAction<string>) {
      state.loading = false
      state.error = action.payload
    },
  },
})

export const {
  fetchCustomerStart,
  fetchCustomerSuccess,
  fetchCustomerFailure,
} = customerSlice.actions

export default customerSlice.reducer
