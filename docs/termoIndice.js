const express = require('express')
const router = express.Router()

/**
* @swagger
* /termoIndice:
*   get:
*     tags:
*       - Termos Índice
*     description: Retorna todos os termos índice
*     produces:
 *       - application/json
 *       - application/xml
 *       - text/csv
*     responses:
*       200:
*         description: Retorna todos os termos índice
*           
*/

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
 *       - application/xml
 *       - text/csv
 *     responses:
 *       200:
 *         description: Retorna toda a informação sobre um termo índice de uma classe
 */

module.exports = router