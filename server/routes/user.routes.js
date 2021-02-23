const { Router } = require('express')
const { isAdmin } = require('../middleware/admin.middleware')
const auth = require('../middleware/auth.middleware')
const {
    getUser,
    updateUser,
    getAllUser,
    getUserById,
    deleteUser,
    updateUserForAdmin,
} = require('../controllers/user.controller')

const router = Router()

router.get('/', auth, async (req, res) => {
    try {
        const data = await getUser(req.session.userId)
        res.json(data)
    } catch (e) {
        console.log(e)
        res.status(500).json(e.message)
    }
})

router.post('/update', auth, async (req, res) => {
    try {
        const { email, name, password, newPassword } = req.body
        const message = await updateUser(req.session.userId, email, name, password, newPassword)
        res.json(message)
    } catch (e) {
        console.log(e)
        res.status(500).json(e.message)
    }
})

router.get('/all', auth, isAdmin, async (req, res) => {
    try {
        const data = await getAllUser()
        res.json(data)
    } catch (e) {
        console.log(e)
        res.status(500).json(e.message)
    }
})

router.get('/all/:id', auth, isAdmin, async (req, res) => {
    try {
        const data = await getUserById(req.params.id)
        res.json(data)
    } catch (e) {
        console.log(e)
        res.status(500).json(e.message)
    }
})

router.post('/create', auth, isAdmin, async (req, res) => {
    try {
        const { email, name, password, role } = req.body
        const message = await updateUser(name, email, password, role, req.session.userName)
        res.json(message)
    } catch (e) {
        console.log(e)
        res.status(500).json(e.message)
    }
})

router.delete('/remove/:id', auth, isAdmin, async (req, res) => {
    try {
        const message = await deleteUser(req.params.id)
        res.json(message)
    } catch (e) {
        console.log(e)
        res.status(500).json(e.message)
    }
})

router.post('/edit/:id', auth, isAdmin, async (req, res) => {
    try {
        const { email, name, role } = req.body
        const message = await updateUserForAdmin(req.params.id, name, email, role, req.session.userName)
        res.json(message)
    } catch (e) {
        console.log(e)
        res.status(500).json(e.message)
    }
})

module.exports = router
