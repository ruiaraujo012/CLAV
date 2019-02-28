const express = require('express')
const router = express.Router()
const Entidades = require('../controllers/entidades')


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


    Entidades.listarEntidades().then(data => res.json(data.data)).catch(err => res.send(err))

})

module.exports = router