import { VariantData } from '@/components/interfaces/interface'
import { fetchProductDetailSuccess } from '@/components/saga/variant-saga'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface VariantState {
  variantDto: VariantData[]
  currentIndex: number | null
  selectedIndex: number | null
  quantity: number
  selectedSize: number | null
  size: string
  color: string
  error: string | null
  loading: boolean
}

const initialState: VariantState = {
  variantDto: [],
  currentIndex: null,
  selectedIndex: null,
  quantity: 1,
  selectedSize: null,
  size: '',
  color: '',
  error: null,
  loading: false,
}

const VariantSlice = createSlice({
  name: 'variantData',
  initialState,
  reducers: {
    setLoadingStart(state) {
      state.loading = true
      state.error = null
    },
    setLoadingEnd(state) {
      state.loading = false
      state.error = null
    },
    setError(state, action: PayloadAction<string>) {
      state.loading = false
      state.error = action.payload
    },
    setVariantDto(state, action: PayloadAction<VariantData[]>) {
      state.loading = false
      state.variantDto = action.payload
    },
    setCurrentIndex(state, action: PayloadAction<number>) {
      state.currentIndex = action.payload
    },
    setSelectedIndex(state, action: PayloadAction<number>) {
      state.selectedIndex = action.payload
    },
    setQuantity(state, action: PayloadAction<number>) {
      state.quantity = action.payload
    },
    setSelectedSize(state, action: PayloadAction<number | null>) {
      state.selectedSize = action.payload
    },
    setSize(state, action: PayloadAction<string>) {
      state.size = action.payload
    },
    setColor(state, action: PayloadAction<string>) {
      state.color = action.payload
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchProductDetailSuccess, (state, action) => {
      state.loading = false
      state.variantDto = action.payload
    })
  },
})

export const {
  setLoadingStart,
  setLoadingEnd,
  setError,
  setVariantDto,
  setCurrentIndex,
  setSelectedIndex,
  setQuantity,
  setSelectedSize,
  setSize,
  setColor,
} = VariantSlice.actions

export default VariantSlice.reducer
