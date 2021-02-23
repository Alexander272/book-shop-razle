import * as types from './types'

export function fetchBook(id) {
    return { type: types.FETCH_BOOK, id }
}

export function fetchBookSuccess(data) {
    return { type: types.FETCH_BOOK_SUCCESS, payload: data }
}

export function fetchBookFailure(error) {
    return { type: types.FETCH_BOOK_FAILURE, payload: error }
}
