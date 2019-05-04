const express = require('express')

const router = express.Router()
const Tipologias = require('../controllers/tipologias')
const { authenticate } = require('../auth/auth')

router.get('/', authenticate(), async (req, res, next) => {
	const tipologias = await Tipologias.listarTipologias()
	res.locals.dados = tipologias
	res.locals.xmlContainer = ['tipologias', 'tipologia']

	next()
})

router.get('/:id', authenticate(), async (req, res, next) => {
	const { id } = req.params

	const tipologia = await Tipologias.listarTipologiaPorId(id)
	const dono = await Tipologias.dono(id)
	const participacao = await Tipologias.participante(id)
	const entidades = await Tipologias.entidades(id)

	res.locals.dados = {
		...tipologia[0],
		dono,
		participacao,
		entidades
	}

	res.locals.xmlContainer = ['tipologia', 'donos', 'dono', 'participações', 'participação', 'entidades', 'entidade']

	next()
})

module.exports = router
