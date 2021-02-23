const Book = require('../models/Book')
const Genre = require('../models/Genre')

exports.getAllBooks = async () => {
    const newBooks = await Book.find({ availability: true, new: true })
        .select('id name author previewUrl previewName')
        .limit(9)
    // const popularBooks = []
    const allBooks = await Book.find().select('id name author previewUrl previewName').limit(9)
    return {
        newBooks: newBooks,
        allBooks,
    }
}

exports.getSearchedBooks = async searchText => {
    const books = await Book.find()
    const newBooks = books.filter(b => {
        if (b.name.includes(searchText) || b.author.includes(searchText)) return b
    })
    return newBooks
}

exports.getBooks = async () => {
    const books = await Book.find().select(
        'id name author previewUrl previewName availability price new'
    )
    books.sort((book1, book2) => {
        if (book1.availability > book2.availability) {
            return -1
        }
        if (book1.availability < book2.availability) {
            return 1
        }
        return 0
    })
    return books
}

exports.getNewBooks = async () => {
    const books = await Book.find({ new: true }).select(
        'id name author previewUrl previewName availability price new'
    )
    books.sort((book1, book2) => {
        if (book1.availability > book2.availability) {
            return -1
        }
        if (book1.availability < book2.availability) {
            return 1
        }
        return 0
    })
    return books
}

exports.getBooksByParams = async slug => {
    const genre = await Genre.findOne({ engName: slug })
    const books = await Book.find({
        'genre.bookGenres.genreId': genre._id,
    }).select('id name author previewUrl previewName availability price new')
    books.sort((book1, book2) => {
        if (book1.availability > book2.availability) {
            return -1
        }
        if (book1.availability < book2.availability) {
            return 1
        }
        return 0
    })
    return books
}

exports.getAdminBooks = async () => {
    return await Book.find().select('id name author')
}
