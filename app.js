const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const swaggerJSDoc = require('swagger-jsdoc')

const classesRouter = require('./routes/classes')
const entidadesRouter = require('./routes/entidades')
const usersRouter = require('./routes/users')
const tipologiasRouter = require('./routes/tipologias')
const passport = require('passport')
const mongoose = require('mongoose')

const app = express()

require('dotenv').config()
require('./auth/auth')

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

app.use('/classes', classesRouter)
app.use('/entidades', entidadesRouter)
app.use('/tipologias', tipologiasRouter)
app.use('/', usersRouter)


module.exports = app
