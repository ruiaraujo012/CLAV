/* eslint-disable comma-dangle */
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const swaggerJSDoc = require('swagger-jsdoc')
const passport = require('passport')
const mongoose = require('mongoose')
const jsoncsv = require('json-2-csv')
const axios = require('axios')

const classesRouter = require('./routes/classes')
const entidadesRouter = require('./routes/entidades')
const usersRouter = require('./routes/users')
const tipologiasRouter = require('./routes/tipologias')
const legislacaoRouter = require('./routes/legislacao')
const termoIndiceRouter = require('./routes/termoIndice')

/*
 * Swagger
 */
const classesDocs = require('./docs/classes')
const entidadesDocs = require('./docs/entidades')
const legislacaoDocs = require('./docs/legislacao')
const termoindiceDocs = require('./docs/termoIndice')
const tipologiasDocs = require('./docs/tipologias')

const { extractStats } = require('./utils/registerStats')

const swaggerConfig = require('./configs/swaggerConfig.json')

const app = express()

require('dotenv').config()
require('./auth/auth')

/*
 * Ligação à base de dados
 */
mongoose
	.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
		useCreateIndex: true
	})
	.then(() => console.log(`Mongo ready: ${mongoose.connection.readyState}`))
	.catch(err => {
		console.log(`Mongo: erro na conexão: ${err}`)
	})

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
	apis: ['./docs/*.js']
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
app.use(
	express.urlencoded({
		extended: false
	})
)
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

/*
 *Swagger
 */
app.use('/classes', classesDocs)
app.use('/entidades', entidadesDocs)
app.use('/legislacao', legislacaoDocs)
app.use('/termoindice', termoindiceDocs)
app.use('/tipologias', tipologiasDocs)

const JSON2XML = (jsonData, containers) => {
	let xml = ''

	const blockContainer = containers[1]

	xml += `<${blockContainer}>`

	Object.keys(jsonData).forEach(key => {
		if (Array.isArray(jsonData[key])) {
			containers.splice(0, 2)

			xml += `<${containers[0]}>`

			jsonData[key].forEach(array => {
				let obj = {}
				obj = array
				xml += JSON2XML(obj, containers)
			})

			xml += `</${containers[0]}>`
		} else if (typeof jsonData[key] === 'object') {
			containers.splice(0, 2)

			const insideBlock = containers[0]

			xml += `<${insideBlock}>`

			let obj = {}
			obj = jsonData[key]

			xml += JSON2XML(obj, containers)

			xml += `</${insideBlock}>`
		} else {
			xml += `<${key}>`

			xml += jsonData[key]

			xml += `</${key}>`
		}
	})

	xml += `</${blockContainer}>`
	return xml
}

const formatOutput = (req, res, next) => {
	if (!res.locals.dados) next()

	const { dados } = res.locals
	const format = req.query.format || req.headers.accept

	const options2csv = {
		expandArrayObjects: true,
		prependHeader: true
	}

	switch (format) {
		case 'application/json':
		case 'json':
			res.send(dados)
			break
		case 'application/xml':
		case 'xml':
			res.send(JSON2XML(dados, res.locals.xmlContainer))
			break
		case 'text/csv':
		case 'csv':
			jsoncsv.json2csv(
				dados,
				(err, csv) => {
					if (err) return
					res.send(csv)
				},
				options2csv
			)
			break
		default:
			res.send(dados)
			break
	}
}

app.use(extractStats)

app.use('/classes', classesRouter, formatOutput)
app.use('/entidades', entidadesRouter, formatOutput)
app.use('/tipologias', tipologiasRouter, formatOutput)
app.use('/legislacao', legislacaoRouter, formatOutput)
app.use('/termoindice', termoIndiceRouter, formatOutput)
app.use('/', usersRouter)

// eslint-disable-next-line no-undef
testFunction = async () => {
	const data = await axios.get('http://localhost:8000/classes/listaConsolidada')
	console.log(data.data)
}

// eslint-disable-next-line no-undef
dummyRequests = async () => {
	const urls = [
		'/classes/c100.10.001',
		'/classes/c100.10.002',
		'/classes/c100.10',
		'/classes/c150.10.001',
		'/classes/c150.20.501',
		'/classes/c150.20.502',
		'/entidades',
		'/classes',
		'/termoIndice/c100.10.001',
		'/tipologias',
		'/tipologias/c100.10.001',
		'/classes/c100.10.001/pca'
	]

	const quant = 1000
	let test
	for (let i = 0; i < quant; i += 1) {
		const url = `http://localhost:8000${urls[Math.floor(Math.random() * urls.length - 1) + 1]}`
		console.log(url)
		test = axios.get(url)
	}

	await Promise.all(test)
}

// dummyRequests();

// testFunction()

module.exports = app
