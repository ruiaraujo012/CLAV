const express = require('express')
const router = express.Router()
const passport = require('passport')
const Classes = require('../controllers/classes')
const authenticate = require('../auth/auth').authenticate

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

router.get('/', authenticate(), (req, res) => {

    let nivel = req.query.nivel
    if (!req.query.nivel)
        nivel = 1
    
    Classes.listarClassesPorNivel(nivel).then(data => res.json(data.data.results.bindings)).catch(err => res.send(err))
})

router.get('/:id', authenticate(), (req, res) => {

    if (req.params.id){
        Classes.listarClassesPorId(req.params.id).then(data => res.json(data.data.results.bindings)).catch(err => res.send(err))
    }
})

module.exports = router