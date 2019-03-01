const express = require('express')
const router = express.Router()
const passport = require('passport')
const Classes = require('../controllers/classes')


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

router.get('/', passport.authenticate('jwt', {
    session: false
}), (req, res) => {

    Classes.listarClasses().then(data => res.json(data.data)).catch(err => res.send(err))

})

router.get('/:nivel', passport.authenticate('jwt', {
    session: false
}), (req, res) => {

    Classes.listarClassesPorNivel(req.params.nivel).then(data => res.json(data.data)).catch(err => res.send(err))

})

module.exports = router