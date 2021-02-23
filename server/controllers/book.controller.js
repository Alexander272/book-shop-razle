const fs = require('fs')
const path = require('path')
const Book = require('../models/Book')

exports.getBookById = async id => {
    const book = await Book.findById(id)
    const res = book.populate('genre.bookGenres.genreId').execPopulate()
    return res
}

exports.createNewBook = async (book, file) => {
    const candidate = await Book.findOne({ name: book.name })
    if (candidate) throw new Error('Такая книга уже есть')
    const newBook = new Book({
        name: book.name,
        publisher: book.publisher,
        annotation: book.annotation,
        availability: book.availability,
        author: book.author,
        series: book.series,
        theYearOfPublishing: +book.theYearOfPublishing,
        ISBN: book.ISBN,
        numberOfPages: +book.numberOfPages,
        format: book.format,
        translator: book.translator,
        coverType: book.coverType,
        circulation: +book.circulation,
        weight: book.weight,
        ageRestrictions: book.ageRestrictions,
        genre: {
            bookGanres: book.genre,
        },
        price: +book.price,
        previewUrl: `/images/${file.filename}`,
        previewName: file.originalname,
    })
    await newBook.save()
    return 'Книга успешно добавлена'
}

exports.updateBook = async (book, file) => {
    if (file) {
        const path = findFiles(file.originalname)
        deleteFiles(path)
        await Book.updateOne(
            { _id: book._id },
            {
                ...book,
                previewUrl: `/images/${file.filename}`,
                previewName: file.originalname,
            }
        )
    } else {
        await Book.updateOne(
            { _id: book._id },
            {
                ...book,
            }
        )
    }

    return 'Книга успешно обновлена'
}

exports.deleteBook = async id => {
    const book = await Book.findById(id)
    const path = findFiles(book.previewName)
    deleteFiles(path)
    await Book.deleteOne({ _id: id })
    return 'Книга успешно удалена'
}

function findFiles(fileName) {
    const ls = fs.readdirSync(path.resolve('./images'))
    const index = ls.findIndex(name => name.includes(fileName))

    let result = null
    if (index !== -1) result = ls[index]

    return result
}

function deleteFiles(pathImg) {
    if (pathImg)
        fs.unlink('images/' + pathImg, err => {
            if (err) console.log(err)
        })
}
