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
			var fullUrl = req.originalUrl;
			/*
			var keys = []
			function process(key,value) {
				//console.log(key + " : "+value);
				keys.push(key)
			}

			function traverse(dados,func) {
				for (var i in dados) {
					func.apply(this,[i,dados[i]]);  
					if (dados[i] !== null && typeof(dados[i])=="object") {
						traverse(dados[i],func);
					}
				}
			}
			traverse(dados,process);
			*/

			if(fullUrl == "/classes?format=csv"){
				const fields = ["id","codigo","titulo","filhos.id","filhos.codigo","filhos.titulo","filhos.filhos.id","filhos.filhos.codigo","filhos.filhos.titulo","filhos.filhos.filhos.id","filhos.filhos.filhos.codigo","filhos.filhos.filhos.titulo"]
				const json2csvParser = new Parser({ fields, delimiter: ';', unwind: ['filhos', 'filhos.filhos','filhos.filhos.filhos'], unwindBlank: true } );
				const csv = json2csvParser.parse(dados);
				//criarCsv(csv)
				res.send(csv)
			}else{
				var final = csvjson.toCSV(dados, { delimiter: ';', headers: "keys"})
				//criarCsv(final)
				res.send(final)
				/*
				jsonexport(dados,{rowDelimiter: ';'},function(err, csv){
					if(err) return console.log(err);
					criarCsv(csv)
					res.send(csv)
				});*/
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
