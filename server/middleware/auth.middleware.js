module.exports = function (req, res, next) {
    if (!req.session.token || !req.headers.authorization) {
        return res.status(401)
    }
    if (req.session.token !== req.headers.authorization.split(' ')[1]) return res.status(401)
    next()
}
