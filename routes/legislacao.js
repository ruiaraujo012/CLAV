const express = require('express')
const router = express.Router()
const Legislacao = require('../controllers/legislacao')
const authenticate = require('../auth/auth').authenticate

router.get('/', authenticate(), async (req, res, next) => {

    let legislacoes = await Legislacao.listarLegislacao()
    res.locals.dados = legislacoes
    res.locals.xmlContainer = ["legislacoes", "legislacao"]
    
    next()

})

router.get('/:id', authenticate(), async (req, res, next) => {

    let legislacao = await Legislacao.listarLegislacaoPorId(req.params.id)
    let processosDeNegocio = await Legislacao.regularProcessosDeNegocio(req.params.id)

    res.locals.dados = {
        ...legislacao[0],
        processosDeNegocio
    }

    next()

})

module.exports = router
