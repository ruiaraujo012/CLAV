const express = require('express')
const router = express.Router()
const Legislacao = require('../controllers/legislacao')
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

router.get('/', authenticate(), (req, res) => {

    Legislacao.listarLegislacao().then(data => res.json(data.data.results.bindings)).catch(err => res.send(err))

})

router.get('/:id', authenticate(), (req, res) => {

    Legislacao.listarLegislacaoPorId(req.params.id).then(data => res.json(data.data.results.bindings)).catch(err => res.send(err))

})
module.exports = router