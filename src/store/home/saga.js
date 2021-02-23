import { put, takeLatest, call } from 'redux-saga/effects'

import * as actions from './actions'
import * as types from './types'
import * as service from './service'

function* fetchAllBooks() {
    try {
        const data = yield call(service.fetchBooks)

        yield put(actions.fetchAllBooksSuccess(data))
    } catch (error) {
        // console.log(error)
        yield put(actions.fetchAllBooksFailure(error.message))
    }
}

export function* homeSaga() {
    yield takeLatest(types.FETCH_ALL_BOOKS, fetchAllBooks)
}
