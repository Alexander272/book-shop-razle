const { body } = require('express-validator')

exports.registerValidators = [
    body('email').isEmail().withMessage('Введите корректный email').normalizeEmail(),
    body('password', 'Пароль должен быть минимум 6 символов').isLength({ min: 6, max: 50 }).trim(),
    body('name', 'Имя должно быть минимум 3 символа').isLength({ min: 3, max: 50 }).trim(),
]

exports.loginValidators = [
    body('email').isEmail().withMessage('Введите корректный email'),
    body('password', 'Пароль должен быть минимум 6 символов').isLength({ min: 6, max: 50 }).trim(),
]
