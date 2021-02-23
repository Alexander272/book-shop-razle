import axios from 'axios'
import { BASE_URL } from '../../keys'

export const searchBooks = async slug => {
    console.log(slug)
    const res = await axios.get(`${BASE_URL}/api/catalog/search/${slug}`)
    return res.data
}
