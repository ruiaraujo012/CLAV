
const express = require('express')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const User = require('../controllers/user')

const router = express.Router()

require('dotenv').config()

const SALT_ROUNDS = 10

/*
 * Signup de um utilizador
 */
router.post('/signup', async (req, res, next) => {
    passport.authenticate('signup', async (err, user, info) => {
        try {
            if (err) {
                return next(err)
            }

            if (!user) {
                return res.jsonp({
                    message: info.message,
                    success: false
                })
            }

            return res.jsonp({
                message: info.message,
                user: req.user,
                success: true
            })
        } catch (err){
            return next(err)
        }

    })(req, res, next)
})

/*
 * Login de um utilizador
 */
router.post('/login', async (req, res, next) => {
    passport.authenticate('login', async (err, user, info) => {
        try {
            if (err) {
                return next(err)
            }

            if (!user) {
                return res.jsonp({
                    message: info.message,
                    token: null,
                    success: false
                })
            }

            req.login(user, {
                session: false
            }, async (err) => {
                if (err) return next(err)

                // Informação do utilizador a colocar no token
                const userInfoInToken = {
                    _id: user._id,
                    email: user.email,
                    fullName: user.firstName + " " + user.lastName,
                    role: user.role
                }

                // Geração do token
                const token = jwt.sign({
                    user: userInfoInToken
                }, process.env.JWT_SECRET_KEY, {
                    expiresIn: '1h'
                })

                return res.jsonp({
                    message: info.message,
                    token: token,
                    success: true
                })
            });
        } catch (err) {
            return next(err);
        }
    })(req, res, next)
})

/*
 * Devolve os dados de perfil do utilizador
 */
router.get('/profile', passport.authenticate('jwt', {
        session: false
    }),
    (req, res, next) => {
        User.listUser(req.user._id)
            .then(data => {
                res.jsonp({
                    user: data,
                    success: true
                })
            })
            .catch(err => {
                res.jsonp({
                    message: 'Erro na consulta dos dados do utilizador ' + req.user._id,
                    success: false
                })
            })
    })

/*
 * Devolve os dados do utilizador
 */
router.get('/profile/edit', passport.authenticate('jwt', {
        session: false
    }),
    (req, res, next) => {
        User.listUserEdit(req.user._id)
            .then(data => {
                res.jsonp({
                    user: data,
                    success: true
                })
            })
            .catch(err => {
                res.jsonp({
                    message: 'Erro na consulta dos dados do utilizador ' + req.user._id,
                    success: false
                })
            })
    })

/*
 * Atualiza a informação de um utilizador pelo ID
 */
router.put('/profile/edit', passport.authenticate('jwt', {
        session: false
    }),
    (req, res) => {
        const editUser = req.body
        editUser.data.updated = new Date()
        User.updateUser(req.user._id, editUser)
            .then(data => {
                res.jsonp({
                    message: 'Perfil editado com sucesso.',
                    user: data,
                    success: true
                })
            })
            .catch(err => {
                res.jsonp({
                    message: 'Erro ao editar os dados do utilizador ' + req.user._id,
                    success: false
                })
            })
    }
)

/*
 * Atualiza a path da imagem de um utilizador pelo ID
 */
router.put('/profile/editPhoto', passport.authenticate('jwt', {
        session: false
    }),
    (req, res) => {
        const editUserImage = req.body
        editUserImage.updated = new Date()
        User.updateUserImage(req.user._id, editUserImage)
            .then(data => {
                res.jsonp({
                    message: 'Imagem de perfil editada com sucesso.',
                    user: data,
                    success: true
                })
            })
            .catch(err => {
                res.jsonp({
                    message: 'Erro ao editar a imagem de perfil do utilizador ' + req.user._id,
                    success: false
                })
            })
    })

/*
 * Atualiza a password de um utilizador pelo ID
 */
router.put('/profile/editPassword', passport.authenticate('jwt', {
        session: false
    }),
    async (req, res) => {
        const password = req.body.password
        password.password = await createHash(password.password)
        password.updated = new Date()
        User.updateUserPassword(req.user._id, password)
            .then(data => {
                res.jsonp({
                    message: 'Password editada com sucesso.',
                    user: data,
                    success: true
                })
            })
            .catch(err => {
                res.jsonp({
                    message: 'Erro ao editar a password do utilizador ' + req.user._id,
                    success: false
                })
            })
    })

/*
 * Adiciona a path da nova imagem de um utilizador pelo ID
 */
router.post('/profile/addImage', passport.authenticate('jwt', {
        session: false
    }),
    (req, res) => {
        const addUserImage = req.body.imagePath
        User.addUserImage(req.user._id, addUserImage)
            .then(data => {
                res.jsonp({
                    message: 'Imagem adicionada com sucesso.',
                    user: data,
                    success: true
                })
            })
            .catch(err => {
                res.jsonp({
                    message: 'Erro ao adicionada a imagem',
                    success: false
                })
            })
    })

/*
 * Gerar hash da password
 */
var createHash = password => {
    return bcrypt.hash(password, SALT_ROUNDS)
}

module.exports = router