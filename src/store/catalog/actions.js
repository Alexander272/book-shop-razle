import * as types from './types'

export function fetchBooks(slug) {
    // console.log(types.FETCH_BOOKS)
    return { type: types.FETCH_BOOKS, slug }
}

export function fetchBooksSuccess(data) {
    // console.log(types.FETCH_BOOKS_SUCCESS)
    return { type: types.FETCH_BOOKS_SUCCESS, payload: data }
}

export function fetchBooksFailure(error) {
    // console.log(types.FETCH_BOOKS_FAILURE)
    return { type: types.FETCH_BOOKS_FAILURE, payload: error }
}
