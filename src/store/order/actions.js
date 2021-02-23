import * as types from './types'

export function fetchOrders(token) {
    return { type: types.FETCH_ORDERS, token }
}

export function fetchOrdersSuccess(data) {
    return { type: types.FETCH_ORDERS_SUCCESS, payload: data }
}

export function fetchOrdersFailure(error) {
    return { type: types.FETCH_ORDERS_FAILURE, payload: error }
}

export function createOrder(payload) {
    return { type: types.CREATE_ORDERS, payload }
}

export function createOrderSuccess(data) {
    return { type: types.CREATE_ORDERS_SUCCESS, payload: data }
}

export function createOrderFailure(error) {
    return { type: types.CREATE_ORDERS_FAILURE, payload: error }
}
