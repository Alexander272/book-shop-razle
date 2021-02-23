import axios from 'axios'
import { BASE_URL } from '../../keys'

export const fetchBooks = async () => {
    const res = await axios.get(`${BASE_URL}/api/catalog`)
    return res.data
}
