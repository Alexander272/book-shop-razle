import { put, takeLatest, call } from 'redux-saga/effects'

import * as actions from './actions'
import * as types from './types'
import * as service from './service'

function* getUserCart({ token }) {
    try {
        const data = yield call(service.getUserCart, token)
        yield put(actions.getUserCartSuccess(data))
    } catch (error) {
        yield put(actions.getUserCartFailure(error.message))
    }
}

function* addToCart({ payload }) {
    try {
        const data = yield call(service.addToCart, payload) || []
        yield put(actions.changeCart(data))
    } catch (error) {
        console.log(error.message)
    }
}

function* removeToCart({ payload }) {
    try {
        const data = yield call(service.removeToCart, payload) || []
        yield put(actions.changeCart(data))
    } catch (error) {
        console.log(error.message)
    }
}

function* removeBook({ payload }) {
    try {
        const data = yield call(service.removeBook, payload) || []
        yield put(actions.changeCart(data))
    } catch (error) {
        console.log(error.message)
    }
}

function* removeAll({ payload }) {
    try {
        const data = yield call(service.removeAll, payload) || []
        yield put(actions.changeCart(data))
    } catch (error) {
        console.log(error.message)
    }
}

function* concatCart({ payload }) {
    try {
        const data = yield call(service.concatCart, payload) || []
        yield put(actions.concatCartSuccess(data))
    } catch (error) {
        console.log(error.message)
    }
}

export function* cartSaga() {
    yield takeLatest(types.GET_USER_CART, getUserCart)
    yield takeLatest(types.ADD_TO_CART, addToCart)
    yield takeLatest(types.REMOVE_TO_CART, removeToCart)
    yield takeLatest(types.REMOVE_BOOK_TO_CART, removeBook)
    yield takeLatest(types.REMOVE_ALL, removeAll)
    yield takeLatest(types.CONCAT_CART, concatCart)
}
