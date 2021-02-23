import { put, takeLatest, call } from 'redux-saga/effects'

import * as actions from './actions'
import * as types from './types'
import * as service from './service'

function* getAuth() {
    try {
        const data = yield call(service.getAuth)
        yield put(actions.loginSuccess(data.payload))
    } catch (error) {
        // console.log(error)
    }
}

function* login({ payload }) {
    try {
        const data = yield call(service.login, payload)
        yield put(actions.loginSuccess(data))
    } catch (error) {
        yield put(actions.loginFailure(error.message))
    }
}

function* register({ payload }) {
    try {
        const data = yield call(service.register, payload)
        yield put(actions.registerSuccess(data))
    } catch (error) {
        yield put(actions.registerFailure(error.message))
    }
}

function* logout() {
    try {
        const data = yield call(service.logout)
    } catch (error) {}
}

function* updateUser({ payload }) {
    try {
        const data = yield call(service.updateUser, payload)
        yield put(actions.updateUserSuccess(payload))
    } catch (error) {
        yield put(actions.updateUserFailure(error.message))
    }
}

export function* userSaga() {
    yield takeLatest(types.LOGIN, login)
    yield takeLatest(types.REGISTER, register)
    yield takeLatest(types.LOGOUT, logout)
    yield takeLatest(types.UPDATE_USER, updateUser)
    yield takeLatest(types.GET_AUTH, getAuth)
}
