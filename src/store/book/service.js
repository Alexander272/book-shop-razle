import axios from 'axios'
import { BASE_URL } from '../../keys'

export const fetchBook = async id => {
    const res = await axios.get(`${BASE_URL}/api/book/${id}`)
    return res.data
}
