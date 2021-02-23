const Genre = require('../models/Genre')

exports.getGenres = async () => {
    return await Genre.find()
}

exports.getGenreById = async (id) => {
    return await Genre.findById(id)
}

exports.addGenres = async (name, engName) => {
    const newGenre = new Genre({
        name,
        engName,
    })
    await newGenre.save()
    return 'Жанр успешно создан'
}

exports.updateGenre = async (id, name, engName) => {
    await Genre.updateOne({ _id: id }, { name, engName })
    return 'Жанр успешно обновлен'
}

exports.removeGenre = async (id) => {
    await Genre.deleteOne({ _id: id })
    return 'Жанр успешно удален'
}
