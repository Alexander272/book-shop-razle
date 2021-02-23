import { put, takeLatest, call } from 'redux-saga/effects'

import * as actions from './actions'
import * as types from './types'
import * as service from './service'

function* fetchBook({ id }) {
    try {
        const data = yield call(service.fetchBook, id)

        yield put(actions.fetchBookSuccess(data))
    } catch (error) {
        console.log(error)
        yield put(actions.fetchBookFailure(error.message))
    }
}

export function* bookSaga() {
    yield takeLatest(types.FETCH_BOOK, fetchBook)
}
