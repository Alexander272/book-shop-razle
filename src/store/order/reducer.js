import * as types from './types'

export const initialState = {
    orders: [],
    loading: false,
    error: undefined,
    message: undefined,
}

export const ordersReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.FETCH_ORDERS:
            return { ...state, loading: true }
        case types.FETCH_ORDERS_SUCCESS:
            return { ...state, loading: false, orders: action.payload }
        case types.FETCH_ORDERS_FAILURE:
            return { ...state, loading: false, error: action.payload }

        case types.CREATE_ORDERS:
            return { ...state, loading: true }
        case types.CREATE_ORDERS_SUCCESS:
            return { ...state, loading: false, message: action.payload }
        case types.CREATE_ORDERS_FAILURE:
            return { ...state, loading: false, error: action.payload }

        default:
            return state
    }
}
