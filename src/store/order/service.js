import axios from 'axios'
import { BASE_URL } from '../../keys'

export const fetchOrders = async token => {
    const res = await axios({
        method: 'GET',
        headers: { authorization: `Bearer ${token}` },
        data: null,
        url: `${BASE_URL}/api/order`,
    })
    return res.data
}

export const createOrders = async payload => {
    const res = await axios({
        method: 'POST',
        headers: { authorization: `Bearer ${payload.token}` },
        data: payload.data,
        url: `${BASE_URL}/api/order/create`,
    })
    return res.data
}
