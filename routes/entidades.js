const express = require('express')
const router = express.Router()
const Entidades = require('../controllers/entidades')
const authenticate = require('../auth/auth').authenticate


/**
 * @swagger
 * /entidades:
 *   get:
 *     tags:
 *       - Get all entidades Page
 *     description: Returns index page
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Get all entidades page
 */

router.get('/', authenticate(), async (req, res, next) => {

    let entidades = await Entidades.listarEntidades()
    res.locals.dados = entidades

    next()
    
})

router.get('/:id', authenticate(), async (req, res, next) => {

    let entidade = await Entidades.listarEntidadePorId(req.params.id)
    let tipologias = await Entidades.tipologias(req.params.id)
    let intervencaoComoDono = await Entidades.intervencaoComoDono(req.params.id)
    let intervencaoComoParticipante = await Entidades.intervencaoComoParticipante(req.params.id)

    // NAO FUNCIONA
    res.locals.dados = {
        ...entidade[0],
        tipologias,
        intervencaoComoDono,
        intervencaoComoParticipante
    }

    next()

})

module.exports = router