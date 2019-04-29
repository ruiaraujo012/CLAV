const express = require('express')

const router = express.Router()
/**
 * @swagger
 * /classes:
 *   get:
 *     tags:
 *       - Classes
 *     description: Retorna a lista consolidada que inclui todas as classes
 *     produces:
 *       - application/json
 *       - application/xml
 *       - text/csv
 *     responses:
 *       200:
 *         description: Retorna a lista consolidada que inclui todas as classes
 */

/**
 * @swagger
 * /classes/{classID}:
 *   get:
 *     tags:
 *       - Classes
 *     description: Retorna toda a indormação relativa a uma classe
 *     parameters:
 *      - name: classID
 *        in: path
 *        description: c150.20.501
 *        type: string
 *        required: true
 *     produces:
 *       - application/json
 *       - application/xml
 *       - text/csv
 *     responses:
 *       200:
 *         description: Retorna toda a indormação relativa a uma classe
 */

/**
 * @swagger
 * /classes/{classID}/donos:
 *   get:
 *     tags:
 *       - Classes
 *     description: Retorna todos os donos de uma classe
 *     parameters:
 *      - name: classID
 *        in: path
 *        description: c150.20.501
 *        type: string
 *        required: true
 *     produces:
 *       - application/json
 *       - application/xml
 *       - text/csv
 *     responses:
 *       200:
 *         description: Retorna todos os donos de uma classe
 */

/**
 * @swagger
 * /classes/{classID}/participantes:
 *   get:
 *     tags:
 *       - Classes
 *     description: Retorna todos os participantes de uma classe
 *     parameters:
 *      - name: classID
 *        in: path
 *        description: c150.20.501
 *        type: string
 *        required: true
 *     produces:
 *       - application/json
 *       - application/xml
 *       - text/csv
 *     responses:
 *       200:
 *         description: Retorna todos os participantes de uma classe
 */

/**
 * @swagger
 * /classes/{classID}/processosRelacionados:
 *   get:
 *     tags:
 *       - Classes
 *     description: Retorna todos os processos relacionados de uma classe
 *     parameters:
 *      - name: classID
 *        in: path
 *        description: c150.20.501
 *        type: string
 *        required: true
 *     produces:
 *       - application/json
 *       - application/xml
 *       - text/csv
 *     responses:
 *       200:
 *         description: Retorna todos os processos relacionados de uma classe
 */

/**
 * @swagger
 * /classes/{classID}/legislacao:
 *   get:
 *     tags:
 *       - Classes
 *     description: Retorna a legislação de uma classe
 *     parameters:
 *      - name: classID
 *        in: path
 *        description: c150.20.501
 *        type: string
 *        required: true
 *     produces:
 *       - application/json
 *       - application/xml
 *       - text/csv
 *     responses:
 *       200:
 *         description: Retorna a legislação de uma classe
 */

/**
 * @swagger
 * /classes/{classID}/pca:
 *   get:
 *     tags:
 *       - Classes
 *     description: Retorna o PCA relativo a uma classe
 *     parameters:
 *      - name: classID
 *        in: path
 *        description: c150.20.501
 *        type: string
 *        required: true
 *     produces:
 *       - application/json
 *       - application/xml
 *       - text/csv
 *     responses:
 *       200:
 *         description: Retorna o PCA relativo a uma classe
 */

/**
 *
 * @swagger
 * /classes/{classID}/df:
 *   get:
 *     tags:
 *       - Classes
 *     description: Retorna o destino final relativo a uma classe
 *     parameters:
 *      - name: classID
 *        in: path
 *        description: c500.40.500
 *        type: string
 *        required: true
 *     produces:
 *       - application/json
 *       - application/xml
 *       - text/csv
 *     responses:
 *       200:
 *         description: Retorna o destino final relativo a uma classe
 */

module.exports = router
