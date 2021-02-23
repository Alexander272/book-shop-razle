const { Router } = require('express')
const { getOrders, createOrder } = require('../controllers/order.controller')
const auth = require('../middleware/auth.middleware')

const router = Router()

router.get('/', auth, async (req, res) => {
    try {
        const orders = await getOrders(req.session.userId)
        res.json(orders)
    } catch (e) {
        res.status(500).json(e.message)
    }
})

router.post('/create', auth, async (req, res) => {
    try {
        const { book } = req.body
        const message = await createOrder(req.session.userId, book)
        res.json(message)
    } catch (e) {
        res.status(500).json(e.message)
    }
})

module.exports = router
