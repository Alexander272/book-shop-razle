import * as types from './types'

export function getAuth() {
    return { type: types.GET_AUTH }
}

export function login(payload) {
    return { type: types.LOGIN, payload }
}

export function loginSuccess(data) {
    return { type: types.LOGIN_SUCCESS, payload: data }
}

export function loginFailure(error) {
    return { type: types.LOGIN_FAILURE, payload: error }
}

export function logout() {
    return { type: types.LOGOUT }
}

export function register(payload) {
    return { type: types.REGISTER, payload }
}

export function registerSuccess(data) {
    return { type: types.REGISTER_SUCCESS, payload: data }
}

export function registerFailure(error) {
    return { type: types.REGISTER_FAILURE, payload: error }
}

export function updateUser(payload) {
    return { type: types.UPDATE_USER, payload }
}

export function updateUserSuccess(data) {
    return { type: types.UPDATE_USER_SUCCESS, payload: data }
}

export function updateUserFailure(error) {
    return { type: types.UPDATE_USER_FAILURE, payload: error }
}

export function clear() {
    return { type: types.CLEAR }
}
