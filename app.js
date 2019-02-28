const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const swaggerJSDoc = require('swagger-jsdoc')

const indexRouter = require('./routes/index')
const classesRouter = require('./routes/classes.js')
const entidadesRouter = require('./routes/entidades.js')

const app = express()

/*
 * Swagger definition
 */
const swaggerDefinition = {
    info: {
        title: 'CLAV API',
        version: '1.0.0',
        description: 'Esta é a API do projeto CLAV. Pode encontrar mais informação sobre o CLAV em [http://clav.dglab.gov.pt](http://clav.dglab.gov.pt). Por motivos de segurança, toda a informação é devolvida em JSONP. Num futuro próximo serão disponibilizados resultados noutros formatos textuais como XML e CSV.',
        contact: {
            name: 'CLAV',
            email: 'clav@dglab.gov.pt'
        }
    },
    host: 'localhost:8000',
    basePath: '/',
    schemes: [
        'http'
    ]
}

/*
 * Options for the swagger docs
 */
const options = {
    // import swaggerDefinitions
    swaggerDefinition: swaggerDefinition,
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

app.use('/', indexRouter)
app.use('/classes', classesRouter)
app.use('/entidades', entidadesRouter)


module.exports = app
