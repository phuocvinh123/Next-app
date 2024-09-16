import productReducer from '@/components/slice/product-slice'
import cartReducer from '@/components/slice/cart-slice'
import userReducer from '@/components/slice/user-slice'
import { configureStore } from '@reduxjs/toolkit'

export type RootState = ReturnType<typeof store.getState>
const store = configureStore({
  reducer: {
    product: productReducer,
    cart: cartReducer,
    user: userReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export default store
