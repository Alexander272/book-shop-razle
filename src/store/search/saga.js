import { put, takeLatest, call } from 'redux-saga/effects'

import * as actions from './actions'
import * as types from './types'
import * as service from './service'

function* searchBooks({ slug }) {
    try {
        const data = yield call(service.searchBooks, slug)
        yield put(actions.searchBooksSuccess(data))
    } catch (error) {
        // console.log(error)
        yield put(actions.searchBooksFailure(error.message))
    }
}

export function* searchSaga() {
    yield takeLatest(types.SEARCH_BOOKS, searchBooks)
}
