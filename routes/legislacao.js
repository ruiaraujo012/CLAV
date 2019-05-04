const express = require('express')

const router = express.Router()
const Legislacao = require('../controllers/legislacao')
const { authenticate } = require('../auth/auth')

router.get('/', authenticate(), async (req, res, next) => {
	const legislacoes = await Legislacao.listarLegislacao()
	res.locals.dados = legislacoes
	res.locals.xmlContainer = ['legislações', 'legislação']

	next()
})

router.get('/:id', authenticate(), async (req, res, next) => {
	const legislacao = await Legislacao.listarLegislacaoPorId(req.params.id)
	const processosDeNegocio = await Legislacao.regularProcessosDeNegocio(req.params.id)

	res.locals.dados = {
		...legislacao[0],
		processosDeNegocio
	}

	res.locals.xmlContainer = ['legislacao', 'processos_de_negócio', 'processo_de_negócio']

	next()
})

module.exports = router
