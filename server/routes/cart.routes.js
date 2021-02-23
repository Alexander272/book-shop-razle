const { Router } = require('express')
const auth = require('../middleware/auth.middleware')
const {
    addFromUserCart,
    addAllFromUserCart,
    getUserCart,
    removeFromUserCart,
    removeBookFromUserCart,
    removeAllFromUserCart,
} = require('../controllers/cart.contoller')

const router = Router()

router.get('/', auth, async (req, res) => {
    try {
        const cart = await getUserCart(req.session.userId)
        res.json(cart)
    } catch (e) {
        res.status(500).json(e.message)
    }
})

router.post('/add', auth, async (req, res) => {
    try {
        const message = await addFromUserCart(req.session.userId, req.body.bookId)
        res.json(message)
    } catch (e) {
        res.status(500).json(e.message)
    }
})

router.post('/addAll', auth, async (req, res) => {
    try {
        const message = await addAllFromUserCart(req.session.userId, req.body.cart)
        res.json(message)
    } catch (e) {
        console.log(e.message)
        res.status(500).json(e.message)
    }
})

router.post('/remove', auth, async (req, res) => {
    try {
        const message = await removeFromUserCart(req.session.userId, req.body.bookId)
        res.json(message)
    } catch (e) {
        res.status(500).json(e.message)
    }
})

router.post('/removeBook', auth, async (req, res) => {
    try {
        const message = await removeBookFromUserCart(req.session.userId, req.body.bookId)
        res.json(message)
    } catch (e) {
        res.status(500).json(e.message)
    }
})

router.post('/removeAll', auth, async (req, res) => {
    try {
        const message = await removeAllFromUserCart(req.session.userId)
        res.json(message)
    } catch (e) {
        res.status(500).json(e.message)
    }
})

module.exports = router
