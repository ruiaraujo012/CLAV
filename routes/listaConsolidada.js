const express = require('express')
const router = express.Router()
const ListaConsolidada = require('../controllers/listaConsolidada')
const authenticate = require('../auth/auth').authenticate

router.get('/', authenticate(), async (req, res, next) => {

    let listaConsolidada = await ListaConsolidada.listar()
    res.locals.dados = listaConsolidada

    next()

})

module.exports = router
