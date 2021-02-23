const jwt = require('jsonwebtoken')
const keys = require('../keys')

exports.isEditor = (req, res, next) => {
    const decoded = jwt.verify(
        req.headers.authorization.split(' ')[1],
        keys.SESSION_SECRET
    )
    if (decoded.role === 'user') return res.status(403)
    next()
}

exports.isAdmin = (req, res, next) => {
    const decoded = jwt.verify(
        req.headers.authorization.split(' ')[1],
        keys.SESSION_SECRET
    )
    if (decoded.role !== 'admin' && decoded.role !== 'owner')
        return res.status(403)
    next()
}
