const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const User = require('../models/user')
const JWTStrategy = require('passport-jwt').Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt
const bcrypt = require('bcrypt')

const SALT_ROUNDS = 10

const AUTHENTICATION_ENABLED = true

require('dotenv').config()

/*
 * Passport middleware para lidar com o registo de utilizadores
 */
passport.use('signup', new localStrategy({
    passReqToCallback: true,
    usernameField: 'username',
    passwordField: 'password'
}, async (req, email, password, done) => {
    try {
        const userExist = await User.findOne({
            email: email
        })

        if (userExist) {
            return done(null, false, {
                message: 'O utilizador já existe'
            })
        }

        const userData = req.body
        const passwordHash = await createHash(userData.password)
        userData.password = passwordHash

        const newUser = await User.create(userData)

        return done(null, newUser, {
            message: 'Utilizador criado com sucesso'
        })
    } catch (err) {
        const userExist = await User.findOne({
            email: email
        })

        if (userExist) {
            return done(null, false, {
                message: 'O utilizador já existe!'
            })
        }

        return done(err, {
            message: 'Por favor preencha todos os campos.'
        })
    }
}))

/*
 * Passport middleware para lidar com o login de utilizadores
 */
passport.use('login', new localStrategy({
    usernameField: 'username',
    passwordField: 'password'
}, async (username, password, done) => {
    try {
        const user = await User.findOne({
            username: username
        })

        const valid = await isValidPassword(user, password)

        if (!user || !valid) {
            return done(null, false, {
                message: 'Utilizador ou password inválido!'
            })
        }

        return done(null, user, {
            message: 'Login realizado com sucesso.'
        })

    } catch (err) {
        const user = await User.findOne({
            email: email
        })

        if (!user) {
            return done(null, false, {
                message: 'Utilizador ou password inválido!'
            })
        }

        return done(err)
    }
}))

/*
 * Verifica e valida o token enviado pelo utilizador
 */
passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromExtractors([ExtractJWT.fromAuthHeaderAsBearerToken(), ExtractJWT.fromUrlQueryParameter('api_key')]),
    secretOrKey: process.env.JWT_SECRET_KEY,
    expiresIn: '1h'
}, async (decodedToken, done) => {
    try {
        return done(null, decodedToken.user)
    } catch (err) {
        done(err)
    }
}))

/*
 * Gerar hash da password
 */
let createHash = password => {
    return bcrypt.hash(password, SALT_ROUNDS)
}

/*
 * Verifica o hash das passwords
 */
let isValidPassword = (user, password) => {
    return bcrypt.compare(password, user.password)
}

let authenticate = () => {
    if (AUTHENTICATION_ENABLED) {
        return passport.authenticate('jwt', {
            session: false
        })
    } 

    return (req, res, next) => next()
}

module.exports.authenticate = authenticate