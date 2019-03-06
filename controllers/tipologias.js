const Tipologias = module.exports
const Graphdb = require('./graphdb')

Tipologias.listarTipologias = () => {

    query = `
    SELECT ?id ?sigla ?designacao ?internacional ?sioe {
        ?id rdf:type clav:Tipologia ;
            clav:tipSigla ?sigla ;
            clav:tipDesignacao ?designacao .
    }
    `
    return Graphdb.fetch(query)
}

Tipologias.listarTipologiaPorId = (id) => {

    query = `
    SELECT ?sigla ?designacao
    WHERE {
            clav:tip_INEM rdf:type clav:Tipologia ;
            clav:tipSigla ?sigla ;
            clav:tipDesignacao ?designacao .

    }`
    
    return Graphdb.fetch(query)
}