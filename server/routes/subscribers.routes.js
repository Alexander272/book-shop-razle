const { Router } = require('express')
const { addSubscribers } = require('../controllers/subscribers.controller')

const router = Router()

router.post('/add', async (req, res) => {
    try {
        const message = await addSubscribers(req.body.email)
        res.json(message)
    } catch (e) {
        res.status(500).json(e.message)
    }
})

module.exports = router
