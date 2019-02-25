const express = require('express')
const router = express.Router()

/**
 * @swagger
 * /:
 *   get:
 *     tags:
 *       - Index Page
 *     description: Returns index page
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Index page
 */
router.get('/', function (req, res, next) {
    res.send('Index Page')
})

module.exports = router