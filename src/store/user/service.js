import axios from 'axios'
import { BASE_URL } from '../../keys'

export const getAuth = async () => {
    const res = await axios.get(`${BASE_URL}/api/auth`)
    if (res.data.error) throw new Error(res.data.error)
    return res.data
}

export const login = async payload => {
    const res = await axios.post('/api/auth/login', {
        email: payload.email,
        password: payload.password,
    })
    if (res.data.error) throw new Error(res.data.error)
    return res.data
}

export const register = async payload => {
    const res = await axios.post('/api/auth/register', {
        name: payload.name,
        email: payload.email,
        password: payload.password,
    })
    if (res.data.error) throw new Error(res.data.error)
    return res.data
}

export const logout = async () => {
    const res = await axios.post(`${BASE_URL}/api/auth/logout`)
    return res.data
}

export const updateUser = async payload => {
    const res = await axios({
        method: 'POST',
        headers: { authorization: `Bearer ${payload.token}` },
        data: payload.data,
        url: `${BASE_URL}/api/user/update`,
    })
    if (res.data.error) throw new Error(res.data.error)
    return res.data
}
