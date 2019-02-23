const express = require('express')
const router = express.Router()

/**
 * @swagger
 * /:
 *   get:
 *     tags:
 *       - Index
 *     description: Returns index page
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Index page
 */
router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'Express'
    })
})

module.exports = router