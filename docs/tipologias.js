const express = require('express')
const router = express.Router()

/**
* @swagger
* /tipologias:
*   get:
*     tags:
*       - Tipologias
*     description: Retorna todas as tipologias de uma classe
*     produces:
 *       - application/json
 *       - application/xml
 *       - text/csv
*     responses:
*       200:
*         description: Retorna todas as tipologias de uma classe
*     
*/

/**
 * @swagger
 * /tipologias/{tipologiasID}:
 *   get:
 *     tags:
 *       - Tipologias
 *     description: Retorna toda a informação sobre uma tipologia de uma classe
 *     parameters:
 *      - name: tipologiasID
 *        in: path
 *        description: tip_AAC
 *        type: string
 *        required: true
 *     produces:
 *       - application/json
 *       - application/xml
 *       - text/csv
 *     responses:
 *       200:
 *         description: Retorna toda a informação sobre uma tipologia de uma classe
 */

module.exports = router