const express = require('express')
const router = express.Router()
const ListaConsolidada = require('../controllers/listaConsolidada')
const authenticate = require('../auth/auth').authenticate

/**
 * @swagger
 * /classes:
 *   get:
 *     tags:
 *       - Classes
 *     description: Retorna a lista consolidada que inclui todas as classes
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Retorna a lista consolidada que inclui todas as classes
 */

router.get('/', authenticate(), async (req, res, next) => {

    let listaConsolidada = await ListaConsolidada.listar()
    res.locals.dados = listaConsolidada

    next()

})

module.exports = router
