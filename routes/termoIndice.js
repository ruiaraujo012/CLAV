const express = require('express')
const router = express.Router()
const TermoIndice = require('../controllers/termoIndice')
const authenticate = require('../auth/auth').authenticate


/**
* @swagger
* /termoIndice:
*   get:
*     tags:
*       - Termos Índice
*     description: Retorna todos os termos índice
*     produces:
*       - application/json
*     responses:
*       200:
*         description: Retorna todos os termos índice
*           
*/
router.get('/', authenticate(), async (req, res, next) => {

    let termoIndice = await TermoIndice.listarTermoIndice()
    res.locals.dados = termoIndice
    res.locals.xmlContainer = ["termosindice", "termoindice"]
    
    next()

})

/**
 * @swagger
 * /termoIndice/{termoIndiceID}:
 *   get:
 *     tags:
 *       - Termos Índice
 *     description: Retorna toda a informação sobre um termo índice de uma classe
 *     parameters:
 *      - name: termoIndiceID
 *        in: path
 *        description: ti_40u40xiK-LKRTlMzKvyEy
 *        type: string
 *        required: true
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Retorna toda a informação sobre um termo índice de uma classe
 */

router.get('/:id', authenticate(), async (req, res, next) => {

    let id = req.params.id

    let termoIndice = await TermoIndice.listarTermoIndicePorID(id)

    res.locals.dados = termoIndice

    next()

})
module.exports = router
