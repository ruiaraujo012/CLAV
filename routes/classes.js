const express = require('express')
const router = express.Router()
const Classes = require('../controllers/classes')
const ListaConsolidada = require('../controllers/listaConsolidada')
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
        
    res.locals.dados = await ListaConsolidada.listar()
    next()

})

router.get('/:id', authenticate(), async (req, res, next) => {

    if (!req.params.id) {
        next()
    }
    let id = req.params.id

    let nivelClasse = await Classes.obterNivelDaClasse(id)
    // Alterar

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
        case 4:
            res.locals.dados = await Classes.obtencaoDadosNivel4(id)
            break
        default:
            break
    }

    next()
})

router.get('/:id/donos', authenticate(), async (req, res, next) => {


    let nivel = await Classes.obterNivelDaClasse(req.params.id)

    if (nivel != 3)
        next()

    res.locals.dados = await Classes.donos(req.params.id)
    res.locals.xmlContainer = ["donos", "dono"]

    next()

})

router.get('/:id/participantes', authenticate(), async (req, res, next) => {

    let nivel = await Classes.obterNivelDaClasse(req.params.id)

    if (nivel != 3)
        next()

    res.locals.dados = await Classes.participantes(req.params.id)
    res.locals.xmlContainer = ["participantes", "participante"]

    next()

})

router.get('/:id/processosRelacionados', authenticate(), async (req, res, next) => {


    let nivel = await Classes.obterNivelDaClasse(req.params.id)

    if (nivel != 3)
        next()

    res.locals.dados = await Classes.processosRelacionados(req.params.id)
    res.locals.xmlContainer = ["processosRelacionados", "processoRelacionado"]

    next()
})

router.get('/:id/legislacao', authenticate(), async (req, res, next) => {

    let nivel = await Classes.obterNivelDaClasse(req.params.id)

    if (nivel != 3)
        next()

    res.locals.dados = await Classes.legislacao(req.params.id)
    res.locals.xmlContainer = ["legislacoes", "legislacao"]

    next()
})

router.get('/:id/pca', authenticate(), async (req, res, next) => {

    let nivel = await Classes.obterNivelDaClasse(req.params.id)

    if (nivel != 3 && nivel != 4)
        next()

    res.locals.dados = await Classes.listarPca(req.params.id)
    res.locals.xmlContainer = ["pcas", "pca"]

    next()
})

router.get('/:id/destinofinal', authenticate(), async (req, res, next) => {

    let nivel = await Classes.obterNivelDaClasse(req.params.id)

    if (nivel != 3 && nivel != 4)
        next()

    res.locals.dados = await Classes.listarDf(req.params.id)
    res.locals.xmlContainer = ["destinosfinais", "destinofinal"]

    next()
})

module.exports = router