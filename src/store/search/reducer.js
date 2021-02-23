import * as types from './types'

export const initialState = {
    searchText: null,
    books: [],
    loading: false,
    error: undefined,
}

export const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_SEARCH:
            return { ...state, searchText: action.text }
        case types.SEARCH_BOOKS:
            return { ...state, loading: true }
        case types.SEARCH_BOOKS_SUCCESS:
            return { ...state, loading: false, books: action.payload || [] }
        case types.SEARCH_BOOKS_FAILURE:
            return { ...state, loading: false, error: action.payload }

        default:
            return state
    }
}
