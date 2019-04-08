const express = require('express')
const router = express.Router()
const ListaConsolidada = require('../controllers/listaConsolidada')
const authenticate = require('../auth/auth').authenticate

/**
 * @swagger
 * /classes:
 *   get:
 *     tags:
 *       - Get all classes Page
 *     description: Returns index page
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Get all classes page
 */

router.get('/', authenticate(), async (req, res, next) => {

    let listaConsolidada = await ListaConsolidada.listar()
    res.locals.dados = listaConsolidada

    next()

})

module.exports = router
