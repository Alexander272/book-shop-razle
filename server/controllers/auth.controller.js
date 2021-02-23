const bcript = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const keys = require('../keys')

exports.login = async (email, password) => {
    try {
        const candidate = await User.findOne({ email })
        if (!candidate) throw new Error('Введенные данные некорректны')
        const areSame = await bcript.compare(password, candidate.password)
        if (areSame) {
            const token = jwt.sign(
                {
                    email,
                    userName: candidate.name,
                    userId: candidate._id,
                    role: candidate.role,
                },
                keys.SESSION_SECRET,
                { expiresIn: 6 * 60 * 60 }
            )
            return {
                error: null,
                payload: {
                    name: candidate.name,
                    email,
                    token,
                    id: candidate._id,
                    role: candidate.role,
                },
            }
        } else throw new Error('Введенные данные некорректны')
    } catch (error) {
        return { error: error.message, payload: null }
    }
}

exports.register = async (name, email, password) => {
    try {
        const candidate = await User.findOne({ email })
        if (candidate) throw new Error('Введены некорректные данные')
        const hasPass = await bcript.hash(password, 14)
        const user = new User({
            name,
            email,
            password: hasPass,
            role: 'user',
            created: 'System',
            promoted: null,
            isConfirmed: false,
            cart: { items: [] },
        })
        await user.save()
        return { error: null, payload: 'Регистрация прошла успешно' }
    } catch (error) {
        return { error: error.message, payload: null }
    }
}
