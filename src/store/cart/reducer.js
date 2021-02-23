import * as types from './types'

export const initialState = {
    cart: [],
    loading: false,
    message: null,
    error: null,
}

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_USER_CART:
            return { ...state, loading: true }
        case types.GET_USER_CART_SUCCESS:
            return { ...state, loading: false, cart: state.cart.concat(action.payload) }
        case types.GET_USER_CART_FAILURE:
            return { ...state, loading: false, error: action.payload }

        case types.CHANGE_CART:
            return { ...state, cart: action.payload }
        case types.CONCAT_CART_SUCCESS:
            return { ...state, cart: state.cart.concat(action.payload) }

        case types.CLEAR:
            return { ...state, message: null, error: null }

        case types.CLEAR_CART:
            return { ...state, cart: [] }

        default:
            return state
    }
}
