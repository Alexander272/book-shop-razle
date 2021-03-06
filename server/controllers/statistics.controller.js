const Order = require('../models/Order')
const Subscribers = require('../models/Subscribers')

exports.getStatistics = async () => {
    let order = await Order.find()
    order = order.filter(
        o => new Date(+o.dateOfOrders).getMonth() === new Date(Date.now()).getMonth()
    )
    const totalPurchases = order.length
    order.sort((order1, order2) => {
        if (order1.id > order2.id) {
            return -1
        }
        if (order1.id < order2.id) {
            return 1
        }
        return 0
    })
    const subs = await Subscribers.countDocuments()
    let books = []
    order.forEach(o => {
        o.book.forEach(book => {
            let isAdd = false
            books.forEach(b => {
                if (b.bookId === book.bookId) {
                    b.count += book.count
                    isAdd = true
                }
            })
            if (!isAdd)
                books.push({
                    bookId: book.bookId,
                    count: book.count,
                    name: book.name,
                    price: book.price,
                })
        })
    })
    let allPrice = 0
    books.forEach(book => {
        allPrice += book.price * book.count
    })
    return {
        books,
        totalPurchases,
        subscribers: subs,
        allPrice,
    }
}
