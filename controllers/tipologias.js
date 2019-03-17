const Tipologias = module.exports
const Graphdb = require('./graphdb')

Tipologias.listarTipologias = () => {

    query = `
    SELECT ?id ?sigla ?designacao ?internacional ?sioe {
        ?id rdf:type clav:TipologiaEntidade ;
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
            clav:${id} rdf:type clav:TipologiaEntidade ;
            clav:tipSigla ?sigla ;
            clav:tipDesignacao ?designacao .

    }`
    
    return Graphdb.fetch(query)
}

Tipologias.dono = id => {

    query = ` 
    SELECT ?id ?codigo ?titulo WHERE {
        ?id clav:temDono clav:${id} ;
            clav:codigo ?codigo ;
            clav:titulo ?titulo ;
            clav:pertenceLC clav:lc1 ;
            clav:classeStatus "A" .
    }
    `

    return Graphdb.fetch(query)
}

Tipologias.participante = id => {

    query = `
    select ?id ?codigo ?titulo ?tipo where { 
        ?id clav:temParticipante clav:${id} ;
            ?tipo clav:${id} ;
        
            clav:titulo ?titulo ;
            clav:codigo ?codigo ;
            clav:pertenceLC clav:lc1 ;
            clav:classeStatus "A" .
        
        filter (?tipo!=clav:temParticipante && ?tipo!=clav:temDono)
    }`

    return Graphdb.fetch(query)
}


Tipologias.entidades = id => {

    query = `
    SELECT ?id ?sigla ?designacao WHERE {
        ?id clav:pertenceTipologiaEnt clav:${id} .
        
        ?id clav:entEstado "Ativa";
            clav:entSigla ?sigla;
            clav:entDesignacao ?designacao.
    }`

    return Graphdb.fetch(query)
}
