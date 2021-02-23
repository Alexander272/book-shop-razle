const Subscribers = require('../models/Subscribers')

exports.addSubscribers = async (email) => {
    const candidate = await Subscribers.findOne({ email })
    if (!candidate) {
        const sub = new Subscribers({
            email,
        })
        sub.save()
    }
    return 'Подписка прошла успешно'
}
