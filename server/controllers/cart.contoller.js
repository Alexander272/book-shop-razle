const User = require('../models/User')
const Book = require('../models/Book')

exports.getUserCart = async id => {
    const user = await User.findById(id)
    const cart = await user.populate('cart.items.bookId').execPopulate()
    const items = cart.cart.items.map(i => ({
        _id: i._id,
        count: i.count,
        bookId: {
            _id: i.bookId._id,
            previewUrl: i.bookId.previewUrl,
            name: i.bookId.name,
            author: i.bookId.author,
            price: i.bookId.price,
        },
    }))
    return items
}

exports.addFromUserCart = async (id, bookId) => {
    const book = await Book.findById(bookId)
    const user = await User.findById(id)
    await user.addToCart(book)
    return 'Книга успешно добавлена'
}

exports.addAllFromUserCart = async (id, cart) => {
    const user = await User.findById(id)
    await user.addAllToCart(cart)
    return 'Книги успешно добавлены'
}

exports.removeFromUserCart = async (id, bookId) => {
    const user = await User.findById(id)
    await user.removeFromCart(bookId)
    return 'Книга успешно удалена'
}

exports.removeBookFromUserCart = async (id, bookId) => {
    const user = await User.findById(id)
    await user.removeBookFromCart(bookId)
    return 'Книга успешно удалена'
}

exports.removeAllFromUserCart = async id => {
    const user = await User.findById(id)
    await user.clearCart()
    return 'Корзина очищена'
}
