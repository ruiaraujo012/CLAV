const express = require('express')
const router = express.Router()

/**
 * @swagger
 * /entidades:
 *   get:
 *     tags:
 *       - Entidades
 *     description: Retorna todas as entidades existentes
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Retorna todas as entidades existentes
 */

 /**
 * @swagger
 * /entidades/{entidadesID}:
 *   get:
 *     tags:
 *       - Entidades
 *     description: Retorna toda a informação relativa a uma entidade
 *     parameters:
 *      - name: entidadesID
 *        in: path
 *        description: ent_ACSS
 *        type: string
 *        required: true
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Retorna toda a informação relativa a uma entidade
 */

module.exports = router