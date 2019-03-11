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
router.get('/teste', authenticate(), (req, res, next) => {

    let vari = {
        "batatas": "20kg"
    }
    next(vari)

})

router.get('/', authenticate(), (req, res, next) => {

    Entidades.listarEntidades()
        .then(data => {
            res.locals.dados = data.data
            next()
        })
        .catch(err => res.send(err)) // Como tratar o erro?

})

router.get('/:id', authenticate(), async (req, res) => {

    let entidade = await Entidades.listarEntidadePorId(req.params.id)
    entidade = entidade.data.results.bindings[0]

    let tipologias = await Entidades.tipologias(req.params.id)
    tipologias = tipologias.data.results.bindings

    let intervencaoComoDono = await Entidades.intervencaoComoDono(req.params.id)
    intervencaoComoDono = intervencaoComoDono.data.results.bindings

    let intervencaoComoParticipante = await Entidades.intervencaoComoParticipante(req.params.id)
    intervencaoComoParticipante = intervencaoComoParticipante.data.results.bindings

    res.json({
        entidade,
        tipologias,
        intervencaoComoDono,
        intervencaoComoParticipante
    })
})

module.exports = router