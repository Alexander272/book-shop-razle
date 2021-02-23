import axios from 'axios'
import { BASE_URL } from '../../keys'

export const fetchBooks = async slug => {
    const res = await axios.get(`${BASE_URL}/api/catalog/${slug}`)
    return res.data
}
