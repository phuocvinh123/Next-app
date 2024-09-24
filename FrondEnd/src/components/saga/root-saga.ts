import { all } from 'redux-saga/effects'
// import watchFetchOrders from './order-saga'

// rootSaga để gom tất cả các saga
export default function* rootSaga() {
  yield all([
    // watchFetchOrders(),  // thêm các saga watcher khác ở đây
  ])
}
