import * as types from './types'

export const initialState = {
    book: null,
    loading: false,
    error: undefined,
}

export const bookReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.FETCH_BOOK:
            return { ...state, loading: true }
        case types.FETCH_BOOK_SUCCESS:
            return { ...state, loading: false, book: action.payload }
        case types.FETCH_BOOK_FAILURE:
            return { ...state, loading: false, error: action.payload }

        default:
            return state
    }
}
