import * as types from './types'

export const initialState = {
    token: null,
    id: null,
    email: null,
    isConfirmed: false,
    name: null,
    role: null,
    loading: false,
    message: null,
    error: null,
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_AUTH:
            return { ...state, loading: false }

        case types.LOGIN:
            return { ...state, loading: true }
        case types.LOGIN_SUCCESS:
            return { ...state, loading: false, ...action.payload }
        case types.LOGIN_FAILURE:
            return { ...state, loading: false, error: action.payload }

        case types.REGISTER:
            return { ...state, loading: true }
        case types.REGISTER_SUCCESS:
            return { ...state, loading: false, message: action.payload }
        case types.REGISTER_FAILURE:
            return { ...state, loading: false, error: action.payload }

        case types.LOGOUT:
            return { ...initialState }

        case types.UPDATE_USER:
            return { ...state, loading: true }
        case types.UPDATE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                name: action.payload.name,
                email: action.payload.email,
            }
        case types.UPDATE_USER_FAILURE:
            return { ...state, loading: false, error: action.payload }

        case types.CLEAR:
            return { ...state, message: null, error: null }

        default:
            return state
    }
}
