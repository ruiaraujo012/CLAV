const express = require('express')
const router = express.Router()
const TermoIndice = require('../controllers/termoIndice')
const authenticate = require('../auth/auth').authenticate


/**
* @swagger
* /tipologias/:
*   get:
*     tags:
*       - Obter lista de todas as tipologias
*     description: Devolve um array de tipologias
*     produces:
*       - application/json
*     responses:
*       200:
*         description:
*           falta preencher
*/
router.get('/', authenticate(), async (req, res, next) => {

    let termoIndice = await TermoIndice.listarTermoIndice()
    res.locals.dados = termoIndice
    
    next()

})

router.get('/:id', authenticate(), async (req, res, next) => {

    let id = req.params.id

    let termoIndice = await TermoIndice.listarTermoIndicePorID(id)

    res.locals.dados = termoIndice

    next()

})
module.exports = router
