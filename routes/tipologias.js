const express = require('express')
const router = express.Router()
const Tipologias = require('../controllers/tipologias')
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

    let tipologias = await Tipologias.listarTipologias()
    res.locals.dados = tipologias
    
    next()

})

router.get('/:id', authenticate(), async (req, res, next) => {

    let id = req.params.id

    let tipologia = await Tipologias.listarTipologiaPorId(id)
    let dono = await Tipologias.dono(id)
    let participacao = await Tipologias.participante(id)
    let entidades = await Tipologias.entidades(id)

    res.locals.dados = {
        ...tipologia[0],
        dono,
        participacao,
        entidades
    }

    next()

})
module.exports = router
