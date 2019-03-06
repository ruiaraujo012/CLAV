const express = require('express')
const router = express.Router()
const passport = require('passport')
const Classes = require('../controllers/classes')
const authenticate = require('../auth/auth').authenticate

/**
 * @swagger
 * /classes/getAllClasses:
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

router.get('/:nivel', authenticate(), (req, res) => {

    Classes.listarClassesPorNivel(req.params.nivel).then(data => res.json(data.data.results.bindings)).catch(err => res.send(err))

})

module.exports = router