const express = require('express')

const router = express.Router()
const Entidades = require('../controllers/entidades')
const { authenticate } = require('../auth/auth')

router.get('/', authenticate(), async (req, res, next) => {
	const entidades = await Entidades.listarEntidades()
	res.locals.dados = entidades
	res.locals.xmlContainer = ['entidades', 'entidade']

	next()
})

router.get('/:id', authenticate(), async (req, res, next) => {
	const entidade = await Entidades.listarEntidadePorId(req.params.id)
	const tipologias = await Entidades.tipologias(req.params.id)
	const intervencaoComoDono = await Entidades.intervencaoComoDono(req.params.id)
	const intervencaoComoParticipante = await Entidades.intervencaoComoParticipante(req.params.id)

	// NAO FUNCIONA
	res.locals.dados = {
		...entidade[0],
		tipologias,
		intervencaoComoDono,
		intervencaoComoParticipante
	}

	next()
})

module.exports = router
