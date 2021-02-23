const bcript = require('bcryptjs')
const User = require('../models/User')

exports.getUser = async (id) => {
    return await User.findById(id).select('id email name')
}

exports.updateUser = async (id, email, name, password, newPassword) => {
    const user = await User.findById(id)
    const areSame = await bcript.compare(password, user.password)
    if (areSame) {
        const hasPass = await bcript.hash(newPassword, 14)
        await User.updateOne({ _id: id }, { email, name, password: hasPass })
        return 'Данные успешно обновлены'
    } else throw new Error('Введенные данные некорректны')
}

exports.getUserById = async (id) => {
    return await User.findById(id).select('id email name role isConfirmed')
}

exports.getAllUser = async () => {
    return await User.find({ role: ['editor', 'user'] })
}

exports.createUser = async (name, email, password, role, userName) => {
    const candidate = await User.findOne({ email })
    if (candidate) throw new Error('Введены некорректные данные')
    const hasPass = await bcript.hash(password, 16)
    const user = new User({
        name,
        email,
        password: hasPass,
        role,
        created: userName,
        promoted: null,
        isConfirmed: true,
        cart: { items: [] },
    })
    await user.save()
    return 'Пользователь успешно создан'
}

exports.deleteUser = async (id) => {
    await User.deleteOne({ _id: id })
    return 'Пользователь успешно удален'
}

exports.updateUserForAdmin = async (id, name, email, role, userName) => {
    await User.updateOne({ _id: id }, { name, email, role, promoted: userName })
    return 'Данные успешно обновлены'
}
