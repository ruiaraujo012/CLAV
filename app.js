const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const swaggerJSDoc = require('swagger-jsdoc')
const jsonxml = require('jsontoxml')
const passport = require('passport')
const mongoose = require('mongoose')
const jsoncsv = require('json-2-csv');

const classesRouter = require('./routes/classes')
const entidadesRouter = require('./routes/entidades')
const usersRouter = require('./routes/users')
const tipologiasRouter = require('./routes/tipologias')
const legislacaoRouter = require('./routes/legislacao')

const swaggerConfig = require('./configs/swaggerConfig.json')
const Graphdb = require('./controllers/graphdb')

const app = express()

require('dotenv').config()
require('./auth/auth')

/*
 * Ligação à base de dados
 */
mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useCreateIndex: true
    })
    .then(() => console.log('Mongo ready: ' + mongoose.connection.readyState))
    .catch(err => console.log('Mongo: erro na conexão: ' + err))

mongoose.set('useFindAndModify', false)

/*
 * Inicialização do passport
 */
app.use(passport.initialize())

/*
 * Options for the swagger docs
 */
const options = {
    // import swaggerDefinitions
    swaggerDefinition: swaggerConfig,
    // path to the API docs
    apis: ['./routes/*.js'],
}

/*
 * Initialize swagger-jsdoc
 */
const swaggerSpec = swaggerJSDoc(options)

/*
 * Serve swagger 
 */
app.get('/swagger.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.send(swaggerSpec)
})

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({
    extended: false
}))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

let formatOutput = (req, res, next) => {
    let dados = res.locals.dados
    let campos = dados.head.vars
    let bindings = dados.results.bindings
    let dadosNormalizados = Graphdb.simplificaSPARQLRes(bindings, campos)

    switch (req.headers.accept) {
        case 'application/json':
            res.send(dadosNormalizados)
            break;
        case 'application/xml':
            res.send(jsonxml(dadosNormalizados))

            break;
        case 'text/csv':
            let options = {
                expandArrayObjects: true,
                prependHeader: true
            }

            jsoncsv.json2csv(dadosNormalizados, (err, csv) => {
                if (err) return
                res.send(csv)
            }, options)

            break;
        default:
            res.send(dados)
            break;
    }
}

app.use('/classes', classesRouter, formatOutput)
app.use('/entidades', entidadesRouter, formatOutput)
app.use('/tipologias', tipologiasRouter)
app.use('/legislacao', legislacaoRouter)
app.use('/', usersRouter)

module.exports = app