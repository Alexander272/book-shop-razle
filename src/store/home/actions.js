import * as types from './types'

export function fetchAllBooks() {
    // console.log(types.FETCH_BOOKS)
    return { type: types.FETCH_ALL_BOOKS }
}

export function fetchAllBooksSuccess(data) {
    // console.log(types.FETCH_BOOKS_SUCCESS)
    return { type: types.FETCH_ALL_BOOKS_SUCCESS, payload: data }
}

export function fetchAllBooksFailure(error) {
    // console.log(types.FETCH_BOOKS_FAILURE)
    return { type: types.FETCH_ALL_BOOKS_FAILURE, payload: error }
}
