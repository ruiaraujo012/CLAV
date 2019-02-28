const User = require('../models/user')

const Users = module.exports

/*
 * Devolve as informações de um utilizador pelo id
 */
Users.listUser = uid => {
    return User
        .findOne({
            _id: uid
        }, {
            password: 0,
            __v: 0,
            created: 0,
            updated: 0
        })
        .exec()
}

/*
 * Devolve todas as informações de um utilizador pelo id
 */
Users.listUserEdit = uid => {
    return User
        .findOne({
            _id: uid
        }, {
            _id: 0,
            imagePath: 0,
            role: 0,
            created: 0,
            updated: 0,
            password: 0,
            __v: 0
        })
        .exec()
}

/*
 * Atualiza as informações de um utilizador pelo ID
 */
Users.updateUser = (uid, data) => {
    return User
        .findOneAndUpdate({
            _id: uid
        }, data.data, {
            new: true
        })
        .exec()
}

/*
 * Atualiza a password de um utilizador pelo ID
 */
Users.updateUserPassword = (uid, passwordHash) => {
    return User
        .findOneAndUpdate({
            _id: uid
        }, passwordHash, {
            new: true
        })
        .exec()
}

/*
 * Criar um utilizador
 */
Users.insert = user => {
    return User.create(user)
}

/*
 * Exporta a coleção dos utilizadores
 */
Users.export = () => {
    return User
        .find()
        .exec()
}
