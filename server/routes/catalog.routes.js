const { Router } = require('express')
const {
    getBooks,
    getAllBooks,
    getBooksByParams,
    getNewBooks,
    getAdminBooks,
    getSearchedBooks,
} = require('../controllers/catalog.controller')
const auth = require('../middleware/auth.middleware')
const { isEditor } = require('../middleware/admin.middleware')

const router = Router()

router.get('/catalog', async (req, res) => {
    try {
        const data = await getAllBooks()
        res.json(data)
    } catch (e) {
        res.status(500).json(e.message)
    }
})

router.get('/catalog/search/:slug', async (req, res) => {
    try {
        const data = await getSearchedBooks(req.params.slug)
        res.json(data)
    } catch (e) {
        res.status(500).json(e.message)
    }
})

router.get('/catalog/:slug', async (req, res) => {
    try {
        let books
        if (req.params.slug === 'all') books = await getBooks()
        else if (req.params.slug === 'new') books = await getNewBooks()
        else books = await getBooksByParams(req.params.slug)
        res.json(books)
    } catch (e) {
        res.status(500).json(e.message)
    }
})

router.get('/admin/catalog', auth, isEditor, async (req, res) => {
    try {
        const books = await getAdminBooks()
        res.json(books)
    } catch (e) {
        res.status(500).json(e.message)
    }
})

module.exports = router
