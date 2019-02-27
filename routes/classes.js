const express = require('express')
const router = express.Router()
const Graphdb = require('../controllers/graphdb')


/**
 * @swagger
 * /classes/getAllClasses:
 *   get:
 *     tags:
 *       - Get all classes Page
 *     description: Returns index page
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Get all classes page
 */

router.get('/', (req, res) => {

    query = `
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX clav: <http://jcr.di.uminho.pt/m51-clav#>    
        Select ?id                            
        ?codigo 
        ?titulo 
        Where {  
            ?id rdf:type clav:Classe_N1 ;
             clav:classeStatus 'A';  
             clav:codigo ?codigo ;
              clav:titulo ?titulo . 
        }  Order by ?id 
    `
    Graphdb.fetch(query).then(data => res.send(data)).catch(err => res.send(err))
})

router.get('/:nivel', (req, res) => {

    query = `
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX clav: <http://jcr.di.uminho.pt/m51-clav#>    
        Select ?id                            
        ?codigo 
        ?titulo 
        Where {  
            ?id rdf:type clav:Classe_N${req.params.nivel} ;
             clav:classeStatus 'A';  
             clav:codigo ?codigo ;
              clav:titulo ?titulo . 
        }  Order by ?id 
    `
    Graphdb.fetch(query).then(data => res.send(data)).catch(err => res.send(err))
})
module.exports = router