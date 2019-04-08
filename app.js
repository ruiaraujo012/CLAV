const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const swaggerJSDoc = require('swagger-jsdoc')
const passport = require('passport')
const mongoose = require('mongoose')
const jsoncsv = require('json-2-csv')

const classesRouter = require('./routes/classes')
const entidadesRouter = require('./routes/entidades')
const usersRouter = require('./routes/users')
const tipologiasRouter = require('./routes/tipologias')
const legislacaoRouter = require('./routes/legislacao')
const termoIndiceRouter = require('./routes/termoIndice')

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

    if (!res.locals.dados)
        next()

    let dados = res.locals.dados
    let format = req.query.format || req.headers.accept

    switch (format) {
        case 'application/json':
        case 'json':
            res.send(dados)
            break;
        case 'application/xml':
        case 'xml':
            let uri = req.originalUrl
            uri = uri.split('?')[0]
            uri = uri.substring(1, uri.length)

            switch (uri) {
                case 'tipologias':
                    res.send(JSON2XML(dados, 'tipologias'))
                    break
                case 'legislacao':
                    res.send(JSON2XML(dados, 'legislacao'))
                    break
                case 'termoindice':
                    res.send(JSON2XML(dados, 'termoindice'))
                    break
                case 'classes':
                    res.send(JSON2XML(dados, 'classes'))
                    break
                case 'entidades':
                    res.send(JSON2XML(dados, res.locals.xmlContainer))
                    break
                default:
                    res.send(JSON2XML(dados, null))
                    break
            }
            break;
        case 'text/csv':
        case 'csv':
            let options = {
                expandArrayObjects: true,
                prependHeader: true
            }
            jsoncsv.json2csv(dados, (err, csv) => {
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
app.use('/tipologias', tipologiasRouter, formatOutput)
app.use('/legislacao', legislacaoRouter, formatOutput)
app.use('/termoindice', termoIndiceRouter, formatOutput)
app.use('/', usersRouter)

JSON2XML = (jsonData, optional) => {
    let xml = ''
    if (optional) {
        xml += "<" + optional[0] + ">"
        for (let key in jsonData) {
            if (typeof jsonData[key] == "object") {
                xml += "<" + optional[1] + ">"
                xml += JSON2XML(new Object(jsonData[key]))
                xml += "</" + optional[1] + ">"
            }
        }
        xml += "</" + optional + 'Bloco' + ">"
    } else {
        for (let key in jsonData) {
            if (Array.isArray(jsonData[key])) {
                xml += "<" + key + 'Bloco' + ">"
                for (let array of jsonData[key]) {
                    xml += "<" + key + ">"
                    xml += JSON2XML(new Object(array))
                    xml += "</" + key + ">"
                }
                xml += "</" + key + 'Bloco' + ">"
            } else if (typeof jsonData[key] == "object") {
                xml += "<" + key + ">"
                xml += JSON2XML(new Object(jsonData[key]))
                xml += "</" + key + ">"
            } else {
                xml += "<" + key + ">"
                xml += jsonData[key]
                xml += "</" + key + ">"
            }
        }
    }
    return xml
}

module.exports = app