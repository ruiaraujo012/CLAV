const jwt = require('jsonwebtoken')

const Stats = require('../controllers/stats')

const msDifference = 10 * 60 * 1000
let lastTimer = Date.now()
let savedStats = []

// TODO: alterar como pretendido

exports.extractStats = async (req, res, next) => {
	const token = req.headers.authorization || req.query.api_key
	let userData = {}

	if (token) userData = jwt.decode(token) // id, email, fullName, role

	const url = req.originalUrl

	if (typeof userData.user !== 'undefined' && typeof userData.user.email !== 'undefined') {
		const { email } = userData.user

		const accessInformation = {
			url,
			email,
			accessDate: Date.now()
		}

		savedStats.push(accessInformation)
	} else {
		const accessInformation = {
			url,
			accessDate: Date.now()
		}

		savedStats.push(accessInformation)
	}

	if (Date.now() - lastTimer >= msDifference) {
		// REALIZAR O DUMP DAS STATS
		Stats.insertMany(savedStats)
		console.log('A enviar estatisticas para a BD')
		savedStats = []
		lastTimer = Date.now()
	}

	next()
}
