import { put, takeLatest, call } from 'redux-saga/effects'

import * as actions from './actions'
import * as types from './types'
import * as service from './service'

function* fetchBooks({ slug }) {
    try {
        const data = yield call(service.fetchBooks, slug)

        yield put(actions.fetchBooksSuccess(data))
    } catch (error) {
        // console.log(error)
        yield put(actions.fetchBooksFailure(error.message))
    }
}

export function* catalogSaga() {
    yield takeLatest(types.FETCH_BOOKS, fetchBooks)
}
