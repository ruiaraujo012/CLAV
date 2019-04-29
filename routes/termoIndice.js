const express = require('express')

const router = express.Router()
const TermoIndice = require('../controllers/termoIndice')
const { authenticate } = require('../auth/auth')

router.get('/', authenticate(), async (req, res, next) => {
	const termoIndice = await TermoIndice.listarTermoIndice()
	res.locals.dados = termoIndice
	res.locals.xmlContainer = ['termosindice', 'termoindice']

	next()
})

router.get('/:id', authenticate(), async (req, res, next) => {
	const { id } = req.params

	const termoIndice = await TermoIndice.listarTermoIndicePorID(id)

	res.locals.dados = termoIndice
	res.locals.xmlContainer = ['termosindice', 'termoindice']

	next()
})

module.exports = router
