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

    res.locals.dados = await Classes.listarClassesPorNivel(nivel)
    next()

})

router.get('/:id', authenticate(), async (req, res, next) => {

    let nivelClasse = null
    if (!req.params.id) {
        next()
    }
    let id = req.params.id

    // Alterar
    nivelClasse = 3
        
    switch (nivelClasse) {
        case 1:
            res.locals.dados = await Classes.obtencaoDadosNivel1_2(id)
            break
        case 2:
            res.locals.dados = await Classes.obtencaoDadosNivel1_2(id)
            break
        case 3:
            res.locals.dados = await Classes.obtencaoDadosNivel3(id)
            break
        default:
            break
    }
    next()
})

module.exports = router