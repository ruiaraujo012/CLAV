const express = require('express')
const router = express.Router()
const Entidades = require('../controllers/entidades')


/**
 * @swagger
 * /entidades:
 *   get:
 *     tags:
 *       - Get all entidades Page
 *     description: Returns index page
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Get all entidades page
 */

router.get('/', (req, res) => {


    Entidades.listarEntidades().then(data => res.json(data.data)).catch(err => res.send(err))

})

//falta fazer-------------
/**
 * @swagger
 * /entidades?id=xxxx:
 *   get:
 *     tags:
 *       - Get all from entidade
 *     description: Returns index page
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Get all from entidade
 */
router.get('/:id',(req, res) =>{

    Entidades.listarEntidadePorId(req.params.id).then(data => res.json(data.data)).catch(err => res.send(err))
})

module.exports = router