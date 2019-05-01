const express = require('express')

const router = express.Router()
const ListaConsolidada = require('../controllers/listaConsolidada')
const { authenticate } = require('../auth/auth')

router.get('/', authenticate(), async (req, res, next) => {
	const listaConsolidada = await ListaConsolidada.listar()
	res.locals.dados = listaConsolidada

	console.log('aqui')

	next()
})

module.exports = router
