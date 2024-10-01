/* eslint-disable @typescript-eslint/no-explicit-any */
import { VariantData } from '@/components/interfaces/interface'
import { createAction, PayloadAction } from '@reduxjs/toolkit'
import { call, put, takeLatest } from 'redux-saga/effects'

export const fetchProductDetailRequest = createAction<string>(
  'FETCH_PRODUCT_DETAIL_REQUEST'
)
export const fetchProductDetailSuccess = createAction<VariantData[]>(
  'FETCH_PRODUCT_DETAIL_SUCCESS'
)
export const fetchProductDetailFailure = createAction<string>(
  'FETCH_PRODUCT_DETAIL_FAILURE'
)

export const addToCartRequest = createAction<any>('ADD_TO_CART_REQUEST')
export const addToCartSuccess = createAction('ADD_TO_CART_SUCCESS')
export const addToCartFailure = createAction<string>('ADD_TO_CART_FAILURE')

const fetchProductDetailAPI = async (productId: string) => {
  const response = await fetch(
    `http://localhost:9002/api/products/images/${productId}`
  )
  if (!response.ok) {
    throw new Error(
      `Failed to fetch product details. Status: ${response.status}`
    )
  }
  return await response.json()
}

export const addToCartAPI = async (productData: any) => {
  const response = await fetch('http://localhost:9002/api/carts/addToCart', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(productData),
  })
  if (!response.ok) {
    throw new Error(`Failed to add product to cart. Status: ${response.status}`)
  }
  const data = await response.json()

  if (data === null) {
    throw new Error(
      'Không thể thêm sản phẩm vào giỏ hàng. Số lượng yêu cầu vượt quá số lượng có trong kho.'
    )
  }

  return data
}

function* fetchProductDetailSaga(action: PayloadAction<string>) {
  try {
    const productDetail: VariantData[] = yield call(
      fetchProductDetailAPI,
      action.payload
    )
    yield put(fetchProductDetailSuccess(productDetail))
  } catch (error: any) {
    console.error('Error fetching product details:', error.message)
    yield put(fetchProductDetailFailure(error.message))
  }
}

function* addToCartSaga(action: PayloadAction<any>) {
  try {
    yield call(addToCartAPI, action.payload)
    yield put(addToCartSuccess())
  } catch (error: any) {
    console.error('Error adding product to cart:', error.message)
    yield put(addToCartFailure(error.message))
  }
}

export function* watchProductActions() {
  yield takeLatest(fetchProductDetailRequest.type, fetchProductDetailSaga)
  yield takeLatest(addToCartRequest.type, addToCartSaga)
}
