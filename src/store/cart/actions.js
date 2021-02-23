import * as types from './types'

export function getUserCart(token) {
    return { type: types.GET_USER_CART, token }
}

export function getUserCartSuccess(data) {
    return { type: types.GET_USER_CART_SUCCESS, payload: data }
}

export function getUserCartFailure(error) {
    return { type: types.GET_USER_CART_FAILURE, payload: error }
}

export function addToCart(payload) {
    return { type: types.ADD_TO_CART, payload }
}

export function removeToCart(payload) {
    return { type: types.REMOVE_TO_CART, payload }
}

export function removeBookToCart(payload) {
    return { type: types.REMOVE_BOOK_TO_CART, payload }
}

export function removeAll(payload) {
    return { type: types.REMOVE_ALL, payload }
}

export function concatCart(payload) {
    return { type: types.CONCAT_CART, payload }
}

export function concatCartSuccess(payload) {
    return { type: types.CONCAT_CART, payload }
}

export function changeCart(payload) {
    return { type: types.CHANGE_CART, payload }
}

export function clear() {
    return { type: types.CLEAR }
}

export function clearCart() {
    return { type: types.CLEAR_CART }
}
