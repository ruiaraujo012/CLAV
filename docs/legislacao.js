const express = require('express')
const router = express.Router()

/**
 * @swagger
 * /legislacao:
 *   get:
 *     tags:
 *       - Legislação
 *     description: Retorna toda a legislação de uma Classe
 *     produces:
 *       - application/json
 *       - application/xml
 *       - text/csv
 *     responses:
 *       200:
 *         description: Retorna toda a legislação de uma Classe
 */

 /**
 * @swagger
 * /legislacao/{legislacaoID}:
 *   get:
 *     tags:
 *       - Legislação
 *     description: Retorna toda a informação sobre a legislação de uma classe
 *     parameters:
 *      - name: legislacaoID
 *        in: path
 *        description: leg_1BoAeCJtOAWHaG0gNdKVa
 *        type: string
 *        required: true
 *     produces:
 *       - application/json
 *       - application/xml
 *       - text/csv
 *     responses:
 *       200:
 *         description: Retorna toda a informação sobre a legislação de uma classe
 */

module.exports = router