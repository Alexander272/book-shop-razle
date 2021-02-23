const { Router } = require('express')
const crypto = require('crypto')
const nodemailer = require('nodemailer')
const sendgrid = require('nodemailer-sendgrid-transport')
const bcript = require('bcryptjs')
const { validationResult } = require('express-validator')
const { login, register } = require('../controllers/auth.controller')
const { loginValidators, registerValidators } = require('../validators/auth.validator')
const resetEmail = require('../emails/reset')
const User = require('../models/User')
const keys = require('../keys')

const tranporter = nodemailer.createTransport(
    sendgrid({
        auth: { api_key: keys.SENDGRID_API_KEY },
    })
)

const router = Router()

router.get('/', async (req, res) => {
    if (req.session.token) {
        res.json({
            error: null,
            payload: {
                name: req.session.name,
                email: req.session.email,
                token: req.session.token,
                id: req.session.id,
                role: req.session.role,
            },
        })
    } else res.status(401).send({ message: 'Сессия не существует' })
})

router.post('/login', loginValidators, async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.json({ error: errors.errors[0].msg })
    } else {
        const data = await login(req.body.email, req.body.password)
        if (data.error) {
            res.json({ error: data.error })
        } else {
            req.session.token = data.payload.token
            req.session.userId = data.payload.id
            req.session.name = data.payload.name
            req.session.email = data.payload.email
            req.session.role = data.payload.role
            res.json(data.payload)
        }
    }
})

router.post('/register', registerValidators, async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.json({ error: errors.errors[0].msg })
    } else {
        const { name, email, password } = req.body
        const data = await register(name, email, password)
        if (data.error) {
            res.json(data.error)
        } else {
            res.json(data.payload)
        }
    }
})

router.post('/logout', async (req, res) => {
    try {
        await req.session.destroy()
        res.json('Success logout')
    } catch (e) {
        console.log(e)
        res.status(500).json(e.message)
    }
})

router.post('/reset', (req, res) => {
    try {
        crypto.randomBytes(32, async (err, buffer) => {
            if (err) {
                res.json({ error: 'Что-то пошло не так, повторите попытку позже' })
                return
            }
            const token = buffer.toString('hex')
            const candidate = await User.findOne({ email: req.body.email })

            if (candidate) {
                candidate.resetToken = token
                candidate.resetTokenExp = Date.now() + 60 * 60 * 1000
                await candidate.save()
                await tranporter.sendMail(resetEmail(candidate.email, candidate.name, token))
                res.json({ payload: 'На ваш email отправлено письмо для восстановления пароля' })
            } else {
                res.json({ error: 'Такого пользователя не существует' })
            }
        })
    } catch (error) {
        console.log(error)
    }
})

router.post('/resetPassword', async (req, res) => {
    try {
        const user = await User.findOne({
            resetToken: req.body.token,
            resetTokenExp: { $gt: Date.now() },
        })

        if (user) {
            user.password = await bcript.hash(req.body.password, 14)
            user.resetToken = undefined
            user.resetTokenExp = undefined
            await user.save()
            res.json({ payload: 'Пароль успешно изменен' })
        } else {
            res.json({ error: 'Время жизни токена истекло' })
        }
    } catch (error) {
        console.log(error)
    }
})

module.exports = router
