import productReducer from '@/components/slice/product-slice'
import cartReducer from '@/components/slice/cart-slice'
import userReducer from '@/components/slice/user-slice'
import customerReducer from '@/components/slice/customer-slice'
import orderReducer from '@/components/slice/order-slice'
import papaginationReducer from '@/components/slice/page-slice'
import variantReducer from '@/components/slice/variant-slice'
import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import rootSaga from '@/components/saga/root-saga'

const sagaMiddleware = createSagaMiddleware()
const store = configureStore({
  reducer: {
    product: productReducer,
    cart: cartReducer,
    user: userReducer,
    customer: customerReducer,
    order: orderReducer,
    pagination: papaginationReducer,
    variant: variantReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
})

sagaMiddleware.run(rootSaga)

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export default store
