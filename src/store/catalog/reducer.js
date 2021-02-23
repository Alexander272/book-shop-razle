import * as types from './types'

export const initialState = {
    books: [],
    loading: false,
    error: undefined,
}

export const catalogReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.FETCH_BOOKS:
            return { ...state, loading: true }
        case types.FETCH_BOOKS_SUCCESS:
            return { ...state, loading: false, books: action.payload || [] }
        case types.FETCH_BOOKS_FAILURE:
            return { ...state, loading: false, error: action.payload }

        default:
            return state
    }
}
