import * as types from './types'

export const initialState = {
    newBooks: [],
    // popularBooks: [],popularBooks: action.payload.popularBooks,
    allBooks: [],
    loading: false,
    error: undefined,
}

export const homeReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.FETCH_ALL_BOOKS:
            return { ...state, loading: true }
        case types.FETCH_ALL_BOOKS_SUCCESS:
            return {
                ...state,
                loading: false,
                newBooks: action.payload.newBooks,

                allBooks: action.payload.allBooks,
            }
        case types.FETCH_ALL_BOOKS_FAILURE:
            return { ...state, loading: false, error: action.payload }

        default:
            return state
    }
}
