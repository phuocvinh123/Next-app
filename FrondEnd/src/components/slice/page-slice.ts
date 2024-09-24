/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface PaginationState {
  items: any[]
  loading: boolean
  error: string | null
  currentPage: number
  pageSize: number
  totalItems: number
}

const initialState: PaginationState = {
  items: [],
  loading: false,
  error: null,
  currentPage: 1,
  pageSize: 10,
  totalItems: 0,
}

const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    fetchItemsStart(state) {
      state.loading = true
      state.error = null
    },
    fetchItemsEnd(state) {
      state.loading = false
    },
    fetchItemsSuccess(state, action: PayloadAction<{ totalItems: number }>) {
      state.loading = false
      state.totalItems = action.payload.totalItems
    },
    fetchItemsFailure(state, action: PayloadAction<string>) {
      state.loading = false
      state.error = action.payload
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload
    },
    setPageSize(state, action: PayloadAction<number>) {
      state.pageSize = action.payload
    },
  },
})

export const {
  fetchItemsStart,
  fetchItemsEnd,
  fetchItemsSuccess,
  fetchItemsFailure,
  setCurrentPage,
  setPageSize,
} = paginationSlice.actions

export default paginationSlice.reducer
