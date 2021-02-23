import { put, takeLatest, call } from 'redux-saga/effects'

import * as actions from './actions'
import * as types from './types'
import * as service from './service'
import { clearCart } from '../cart/actions'

function* fetchOrders({ token }) {
    try {
        const data = yield call(service.fetchOrders, token)
        yield put(actions.fetchOrdersSuccess(data))
    } catch (error) {
        console.log(error)
        yield put(actions.fetchOrdersFailure(error.message))
    }
}

function* createOrders({ payload }) {
    try {
        const data = yield call(service.createOrders, payload)
        yield put(actions.createOrderSuccess(data))
        yield put(clearCart())
    } catch (error) {
        console.log(error)
        yield put(actions.createOrderFailure(error.message))
    }
}

export function* ordersSaga() {
    yield takeLatest(types.FETCH_ORDERS, fetchOrders)
    yield takeLatest(types.CREATE_ORDERS, createOrders)
}
