const { Router } = require('express')
const {
    getGenres,
    getGenreById,
    addGenres,
    updateGenre,
    removeGenre,
} = require('../controllers/genre.controllers')
const auth = require('../middleware/auth.middleware')
const { isEditor } = require('../middleware/admin.middleware')

const router = Router()

router.get('/', async (req, res) => {
    try {
        const genres = await getGenres()
        res.json(genres)
    } catch (e) {
        res.status(500).json(e.message)
    }
})

router.get('/:id', async (req, res) => {
    try {
        const genre = await getGenreById(req.params.id)
        res.json(genre)
    } catch (e) {
        res.status(500).json(e.message)
    }
})

router.post('/add', auth, isEditor, async (req, res) => {
    try {
        const message = await addGenres(req.body.name, req.body.engName)
        res.json(message)
    } catch (e) {
        res.status(500).json(e.message)
    }
})

router.post('/update/:id', auth, isEditor, async (req, res) => {
    try {
        const message = await updateGenre(req.params.id, req.body.name, req.body.engName)
        res.json(message)
    } catch (e) {
        res.status(500).json(e.message)
    }
})

router.post('/remove/:id', auth, isEditor, async (req, res) => {
    try {
        const message = await removeGenre(req.params.id)
        res.json(message)
    } catch (e) {
        res.status(500).json(e.message)
    }
})

module.exports = router
