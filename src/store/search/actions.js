import * as types from './types'

export function setSearch(text) {
    return { type: types.SET_SEARCH, text }
}

export function searchBooks(slug) {
    return { type: types.SEARCH_BOOKS, slug }
}

export function searchBooksSuccess(data) {
    return { type: types.SEARCH_BOOKS_SUCCESS, payload: data }
}

export function searchBooksFailure(error) {
    return { type: types.SEARCH_BOOKS_FAILURE, payload: error }
}
