import { watchProductActions } from '@/components/saga/variant-saga'
import { all } from 'redux-saga/effects'

export default function* rootSaga() {
  yield all([watchProductActions()])
}
