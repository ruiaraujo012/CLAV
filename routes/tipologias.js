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
router.get('/', authenticate(), (req, res) => {

    Tipologias.listarTipologias().then(data => res.json(data.data.results.bindings)).catch(err => res.send(err))

})
module.exports = router
