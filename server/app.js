const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const swaggerJSDoc = require('swagger-jsdoc')
const passport = require('passport')
const mongoose = require('mongoose')
const jsonexport = require('jsonexport')
const csvjson = require('csvjson');
const { Parser } = require('json2csv');
const axios = require('axios')
const cors = require('cors')

const fs = require('fs');

const classesRouter = require('./routes/classes')
const entidadesRouter = require('./routes/entidades')
const usersRouter = require('./routes/users')
const tipologiasRouter = require('./routes/tipologias')
const legislacaoRouter = require('./routes/legislacao')
const termoIndiceRouter = require('./routes/termoIndice')

const statsRouter = require('./routes/stats')
// const statsController = require('./controllers/stats')

const { extractStats } = require('./utils/registerStats')
const { JSON2XML } = require('./utils/converters')

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
	.catch((err) => {
		console.log(`Mongo: erro na conexão: ${err}`)
	})

mongoose.set('useFindAndModify', false)

// CORS
app.use(cors())
app.options('*', cors())

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
	apis: ['./docs/*.yaml']
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

const formatOutput = (req, res, next) => {
	if (!res.locals.dados) next()
	const { dados } = res.locals
	const format = req.query.format || req.headers.accept

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
			
			if (!Array.isArray(dados)){
				var array = []
				array.push(dados)
			}else{
				array = dados
			}
			
			jsonexport(array,{rowDelimiter: ';'},function(err, csv){
				if(err) return console.log(err);
				var headersList = []
				var headersListFilhos = []
				var headersfilhos = []
				var headers = csv.split("\n")[0].substring(0, csv.split("\n")[0].length - 1);
				for(i in headers.split(";")){
					headersList.push(headers.split(";")[i])
				}
				for(i in headersList){
					if(headersList[i].indexOf('.') > -1 == true){
						headersListFilhos.push(headersList[i])
					}
				}

				for(i in headersListFilhos){
					headersListFilhos[i] = headersListFilhos[i].replace("." + headersListFilhos[i].split(".").pop(-1), "")
					if(headersfilhos.includes(headersListFilhos[i]) == false ){
						headersfilhos.push(headersListFilhos[i])
					}

				}
				
				//criarCsv(csvFinal(headersList,headersfilhos,array))
				res.send(csvFinal(headersList,headersfilhos,array))

			});
			function csvFinal(fields,fields2,data){
				const json2csvParser = new Parser({ fields, delimiter: ';', unwind: fields2, unwindBlank: true } )
				const csv = json2csvParser.parse(data)
				return csv
			}
			function criarCsv(ficheiro) {
				fs.writeFile('output.csv', ficheiro, function (err) {
					if (err) {
						console.log('Ocorreu um erro ao guardar o ficheiro');
					} else{
						console.log('Ficheiro guardado com sucesso');
					}
				});
			} 
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
app.use('/stats', statsRouter)
app.use('/', usersRouter)

// eslint-disable-next-line no-undef
const testFunction = async () => {
	const data = await axios.get('http://localhost:8000/classes/c100.10.001?format=xml')
	// statsController.dailyAccess(10);
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

testFunction()

module.exports = app
