const express = require('express')
const router = express.Router()
const Graphdb = require('../controllers/graphdb')


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

})

module.exports = router