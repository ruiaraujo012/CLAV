const express = require('express')
const router = express.Router()
const passport = require('passport')
const Classes = require('../controllers/classes')
const authenticate = require('../auth/auth').authenticate

/**
 * @swagger
 * /classes/{nivel}:
 *   get:
 *     tags:
 *       - Obter lista de classes por nível
 *     description: Devolve um array de classes, cada um composto por código, titulo e id.
 *     parameters:
 *       - in: path
 *         name: nivel
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description:
 *         examples:
 *           application/json: [{"codigo":{"type":"literal","value":"100"},"titulo":{"type":"literal","value":"ORDENAMENTO JURÍDICO E NORMATIVO"},"id":{"type":"uri","value":"http://jcr.di.uminho.pt/m51-clav#c100"}},{"codigo":{"type":"literal","value":"150"},"titulo":{"type":"literal","value":"PLANEAMENTO E GESTÃO ESTRATÉGICA"},"id":{"type":"uri","value":"http://jcr.di.uminho.pt/m51-clav#c150"}}]
 */

router.get('/:nivel', authenticate(), (req, res) => {

    Classes.listarClassesPorNivel(req.params.nivel).then(data => res.json(data.data.results.bindings)).catch(err => res.send(err))

})

module.exports = router