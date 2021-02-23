import axios from 'axios'
import { BASE_URL } from '../../keys'

export const getUserCart = async token => {
    if (token) {
        const res = await axios({
            method: 'GET',
            headers: { authorization: `Bearer ${token}` },
            data: null,
            url: `${BASE_URL}/api/cart`,
        })
        return res.data
    } else {
        const data = JSON.parse(localStorage.getItem('Books'))
        if (data) return data
        else return []
    }
}

export const addToCart = async ({ cart, book, id, token }) => {
    try {
        const idx = cart.findIndex(b => b.bookId._id === book.bookId._id)
        let newCart = cart
        if (idx > -1) {
            newCart = cart.map((b, index) => {
                if (index === idx) b.count = b.count + 1
                return b
            })
        } else {
            newCart = cart.concat([book])
        }
        if (id) {
            await axios({
                method: 'POST',
                headers: { authorization: `Bearer ${token}` },
                data: { id, bookId: book.bookId._id, count: book.count },
                url: `${BASE_URL}/api/cart/add`,
            })
        } else {
            localStorage.setItem('Books', JSON.stringify(newCart))
        }
        return newCart
    } catch (error) {
        console.log(error.message)
        return []
    }
}

export const removeToCart = async ({ cart, book, id, token }) => {
    try {
        const idx = cart.findIndex(b => b.bookId._id === book.bookId._id)
        let newCart = cart
        if (idx > -1) {
            newCart = cart.map((b, index) => {
                if (index === idx) b.count = b.count - 1
                return b
            })
            newCart = newCart.filter(b => b.count > 0)
        }
        if (id) {
            await axios({
                method: 'POST',
                headers: { authorization: `Bearer ${token}` },
                data: { id, bookId: book.bookId._id },
                url: `${BASE_URL}/api/cart/remove`,
            })
        } else {
            localStorage.setItem('Books', JSON.stringify(newCart))
        }
        return newCart
    } catch (error) {
        console.log(error.message)
        return []
    }
}

export const removeBook = async ({ cart, book, id, token }) => {
    try {
        const newCart = cart.filter(b => b.bookId._id !== book.bookId._id)
        if (id) {
            await axios({
                method: 'POST',
                headers: { authorization: `Bearer ${token}` },
                data: { id, bookId: book.bookId._id },
                url: `${BASE_URL}/api/cart/removeBook`,
            })
        } else {
            localStorage.setItem('Books', JSON.stringify(newCart))
        }
        return newCart
    } catch (error) {
        console.log(error.message)
        return []
    }
}

export const removeAll = async ({ id, token }) => {
    if (id) {
        await axios({
            method: 'POST',
            headers: { authorization: `Bearer ${token}` },
            data: { id },
            url: `${BASE_URL}/api/cart/removeAll`,
        })
    }
    return []
}

export const concatCart = async ({ token }) => {
    const data = JSON.parse(localStorage.getItem('Books'))
    if (data && token) {
        const cart = data.map(b => ({
            bookId: b.bookId._id,
            count: b.count,
        }))
        await axios({
            method: 'POST',
            headers: { authorization: `Bearer ${token}` },
            data: { cart },
            url: `${BASE_URL}/api/cart/addAll`,
        })
        localStorage.removeItem('Books')
    }
    return data
}
