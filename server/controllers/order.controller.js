const Order = require('../models/Order')
const User = require('../models/User')

exports.getOrders = async id => {
    const orders = await Order.find({ userId: id })
    orders.sort((a, b) => b.dateOfOrders - a.dateOfOrders)
    return orders
}

exports.createOrder = async (userId, book) => {
    const newOrder = new Order({
        userId,
        book,
    })
    await newOrder.save()
    const user = await User.findById(userId)
    await user.clearCart()
    return 'Заказ успешно добавлен'
}
