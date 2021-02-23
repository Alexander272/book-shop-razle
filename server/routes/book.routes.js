const { Router } = require('express')
const {
    getBookById,
    createNewBook,
    updateBook,
    deleteBook,
} = require('../controllers/book.controller')
const auth = require('../middleware/auth.middleware')
const { isEditor } = require('../middleware/admin.middleware')

const router = Router()

router.get('/:id', async (req, res) => {
    try {
        const book = await getBookById(req.params.id)
        res.json(book)
    } catch (e) {
        res.status(500).json(e.message)
    }
})

router.post('/add', auth, isEditor, async (req, res) => {
    try {
        const message = await createNewBook(req.body.book, req.file)
        res.json(message)
    } catch (e) {
        res.status(500).json(e.message)
    }
})

router.post('/update', auth, isEditor, async (req, res) => {
    try {
        const message = await updateBook(req.body.book, req.file)
        res.json(message)
    } catch (e) {
        res.status(500).json(e.message)
    }
})

router.post('/remove/:id', auth, isEditor, async (req, res) => {
    try {
        const message = await deleteBook(req.params.id)
        res.json(message)
    } catch (e) {
        res.status(500).json(e.message)
    }
})

module.exports = router
