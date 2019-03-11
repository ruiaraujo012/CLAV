const express = require('express')
const router = express.Router()
const Classes = require('../controllers/classes')
const authenticate = require('../auth/auth').authenticate
const Graphdb = require('../controllers/graphdb')

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

    let nivel = req.query.nivel
    if (!req.query.nivel)
        nivel = 1

    res.locals.dados = (await Classes.listarClassesPorNivel(nivel)).data
    next()
})

router.get('/:id', authenticate(), (req, res) => {

    if (req.params.id) {
        Classes.listarClassesPorId(req.params.id).then(data => res.json(data.data.results.bindings)).catch(err => res.send(err))
    }
})

module.exports = router