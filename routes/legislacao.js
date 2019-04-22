const express = require('express')
const router = express.Router()
const Legislacao = require('../controllers/legislacao')
const authenticate = require('../auth/auth').authenticate

/**
 * @swagger
 * /legislacao:
 *   get:
 *     tags:
 *       - Legislação
 *     description: Retorna toda a legislação de uma Classe
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Retorna toda a legislação de uma Classe
 */

router.get('/', authenticate(), async (req, res, next) => {

    let legislacoes = await Legislacao.listarLegislacao()
    res.locals.dados = legislacoes
    res.locals.xmlContainer = ["legislacoes", "legislacao"]
    
    next()

})
/**
 * @swagger
 * /legislacao/{legislacaoID}:
 *   get:
 *     tags:
 *       - Legislação
 *     description: Retorna toda a informação sobre a legislação de uma classe
 *     parameters:
 *      - name: legislacaoID
 *        in: path
 *        description: leg_1BoAeCJtOAWHaG0gNdKVa
 *        type: string
 *        required: true
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Retorna toda a informação sobre a legislação de uma classe
 */

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
