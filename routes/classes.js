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
 *       - Classes
 *     description: Retorna a lista consolidada que inclui todas as classes
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Retorna a lista consolidada que inclui todas as classes
 */

router.get('/', authenticate(), async (req, res, next) => {

    res.locals.dados = await ListaConsolidada.listar()
    next()

}) 

// TODO : ainda em fase de testes, corrigir
router.get('/lc/:id', authenticate(), async (req, res, next) => {

    res.locals.dados = await ListaConsolidada.listarCompleta(req.params.id)
    next()

}) 
/**
 * @swagger
 * /classes/{classID}:
 *   get:
 *     tags:
 *       - Classes
 *     description: Retorna toda a indormação relativa a uma classe
 *     parameters:
 *      - name: classID
 *        in: path
 *        description: c150.20.501
 *        type: string
 *        required: true
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Retorna toda a indormação relativa a uma classe
 */
router.get('/:id', authenticate(), async (req, res, next) => {

    if (!req.params.id) {
        next()
    }
    let id = req.params.id

    let nivelClasse = await Classes.obterNivelDaClasse(id)
    // Alterar

    switch (nivelClasse) {
        case 1:
        case 2:
            res.locals.dados = await Classes.obtencaoDadosNivel1_2(id)
            res.locals.xmlContainer = ['classe', 'notaAplic', 'exeNotaAplic', 'notaExclus', 'termoInd']
            break
        case 3:
            res.locals.dados = await Classes.obtencaoDadosNivel3(id)
            res.locals.xmlContainer = ['classe', 'notaAplic', 'exeNotaAplic', 'notaExclus', 'termoInd', 'dono', 'participante', 'processoRelacionado', 'legis', 'pca', 'justifica', 'df', 'justifica']
            break
        case 4:
            res.locals.dados = await Classes.obtencaoDadosNivel4(id)
            break
        default:
            break
    }

    next()
}) 

/**
 * @swagger
 * /classes/{classID}/donos:
 *   get:
 *     tags:
 *       - Classes
 *     description: Retorna todos os donos de uma classe
 *     parameters:
 *      - name: classID
 *        in: path
 *        description: c150.20.501
 *        type: string
 *        required: true
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Retorna todos os donos de uma classe
 */
router.get('/:id/donos', authenticate(), async (req, res, next) => {


    let nivel = await Classes.obterNivelDaClasse(req.params.id)

    if (nivel != 3)
        next()

    res.locals.dados = await Classes.donos(req.params.id)
    res.locals.xmlContainer = ["donos", "dono"]

    next()

}) 

/**
 * @swagger
 * /classes/{classID}/participantes:
 *   get:
 *     tags:
 *       - Classes
 *     description: Retorna todos os participantes de uma classe
 *     parameters:
 *      - name: classID
 *        in: path
 *        description: c150.20.501
 *        type: string
 *        required: true
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Retorna todos os participantes de uma classe
 */
router.get('/:id/participantes', authenticate(), async (req, res, next) => {

    let nivel = await Classes.obterNivelDaClasse(req.params.id)

    if (nivel != 3)
        next()

    res.locals.dados = await Classes.participantes(req.params.id)
    res.locals.xmlContainer = ["participantes", "participante"]

    next()

})

/**
 * @swagger
 * /classes/{classID}/processosRelacionados:
 *   get:
 *     tags:
 *       - Classes
 *     description: Retorna todos os processos relacionados de uma classe
 *     parameters:
 *      - name: classID
 *        in: path
 *        description: c150.20.501
 *        type: string
 *        required: true
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Retorna todos os processos relacionados de uma classe
 */

router.get('/:id/processosRelacionados', authenticate(), async (req, res, next) => {


    let nivel = await Classes.obterNivelDaClasse(req.params.id)

    if (nivel != 3)
        next()

    res.locals.dados = await Classes.processosRelacionados(req.params.id)
    res.locals.xmlContainer = ["processosRelacionados", "processoRelacionado"]

    next()
})

/**
 * @swagger
 * /classes/{classID}/legislacao:
 *   get:
 *     tags:
 *       - Classes
 *     description: Retorna a legislação de uma classe
 *     parameters:
 *      - name: classID
 *        in: path
 *        description: c150.20.501
 *        type: string
 *        required: true
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Retorna a legislação de uma classe
 */

router.get('/:id/legislacao', authenticate(), async (req, res, next) => {

    let nivel = await Classes.obterNivelDaClasse(req.params.id)

    if (nivel != 3)
        next()

    res.locals.dados = await Classes.legislacao(req.params.id)
    res.locals.xmlContainer = ["legislacoes", "legislacao"]

    next()
})

/**
 * @swagger
 * /classes/{classID}/pca:
 *   get:
 *     tags:
 *       - Classes
 *     description: Retorna o PCA relativo a uma classe
 *     parameters:
 *      - name: classID
 *        in: path
 *        description: c150.20.501
 *        type: string
 *        required: true
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Retorna o PCA relativo a uma classe
 */
router.get('/:id/pca', authenticate(), async (req, res, next) => {

    // c150.20.501 tem multiplos criterios de pca para se verificar
    let pca = await Classes.pca(req.params.id)
    res.locals.dados = pca
    next()
    
})

/**
 * 
 * @swagger
 * /classes/{classID}/df:
 *   get:
 *     tags:
 *       - Classes
 *     description: Retorna o destino final relativo a uma classe
 *     parameters:
 *      - name: classID
 *        in: path
 *        description: c500.40.500
 *        type: string
 *        required: true
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Retorna o destino final relativo a uma classe
 */

router.get('/:id/df', authenticate(), async (req, res, next) => {

    // c400.10.001 tem multiplos dfs para testar

    let destinoFinal = await Classes.df(req.params.id)
    res.locals.dados = destinoFinal
    
    next()
})

module.exports = router