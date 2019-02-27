const express = require('express')
const router = express.Router()
const Query = require('../controllers/query')


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

router.get('/getAllClasses', (req, res) => {

    Query.listClasses().then(data => {
        res.send(data)
    }).catch(err => {
        console.log(err)
    })
        
})



module.exports = router
