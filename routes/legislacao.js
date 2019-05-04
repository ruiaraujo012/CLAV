const express = require('express')

const router = express.Router()
const Legislacao = require('../controllers/legislacao')
const { authenticate } = require('../auth/auth')

router.get('/', authenticate(), async (req, res, next) => {
	const legislacoes = await Legislacao.listarLegislacao()
	res.locals.dados = legislacoes
	res.locals.xmlContainer = ['legislacoes', 'legislacao']

	next()
})

router.get('/:id', authenticate(), async (req, res, next) => {
	const legislacao = await Legislacao.listarLegislacaoPorId(req.params.id)
	const processosDeNegocio = await Legislacao.regularProcessosDeNegocio(req.params.id)

	res.locals.dados = {
		...legislacao[0],
		processosDeNegocio
	}

	res.locals.xmlContainer = ['legislacoes', 'legislacao', 'processosDeNegocio', 'processoDeNegocio']

	next()
})

module.exports = router
