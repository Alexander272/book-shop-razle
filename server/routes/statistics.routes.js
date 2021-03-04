const { Router } = require('express')
const { getStatistics } = require('../controllers/statistics.controller')
const auth = require('../middleware/auth.middleware')
const { isEditor } = require('../middleware/admin.middleware')

const router = Router()

// auth, isEditor,

router.get('/', async (req, res) => {
    try {
        const data = await getStatistics()
        res.json(data)
    } catch (e) {
        res.status(500).json(e.message)
    }
})

module.exports = router
