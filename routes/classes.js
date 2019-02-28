const express = require('express')
const router = express.Router()
const Classes = require('../controllers/classes')


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

router.get('/', (req, res) => {

    Classes.listarClasses().then(data => res.json(data.data)).catch(err => res.send(err))

})

router.get('/:nivel', (req, res) => {

    Classes.listarClassesPorNivel(req.params.nivel).then(data => res.json(data.data)).catch(err => res.send(err))

})

module.exports = router