const Entidades = module.exports
const Graphdb = require('./graphdb')

Entidades.listarEntidades = () => {

    query = `
    SELECT ?id ?sigla ?designacao ?internacional ?sioe {
        ?id rdf:type clav:Entidade ;
            clav:entEstado "Ativa";
            clav:entDesignacao ?designacao ;
            clav:entSigla ?sigla ;
            clav:entInternacional ?internacional ;
            clav:entSIOE ?sioe .
    }
    `
    return Graphdb.fetch(query)
}

Entidades.listarEntidadePorId = (id) => {

    query = `
    SELECT ?sigla ?estado ?internacional ?designacao ?sioe
    WHERE {
            clav:ent_INEM rdf:type clav:Entidade ;
                clav:entDesignacao ?designacao ;
                clav:entSigla ?sigla ;
                clav:entEstado ?estado ;
                clav:entInternacional ?internacional ;
                clav:entSIOE ?sioe .
    }`

    return Graphdb.fetch(query)
}

Entidades.tipologiasPertencentes = (id) => {
    query = `
    SELECT ?id ?sigla ?designacao WHERE {
        clav:${id} clav:pertenceTipologiaEnt ?id .
        ?id clav:tipEstado "Ativa" ;
            clav:tipSigla ?sigla ;
            clav:tipDesignacao ?designacao .
    }`

    return Graphdb.fetch(query)
}

Entidades.intervencaoComoDono = (id) => {
    query = `
    SELECT ?id ?codigo ?titulo WHERE {
        ?id clav:temDono clav:${id} ;
            clav:codigo ?codigo ;
            clav:titulo ?titulo ;
            clav:pertenceLC clav:lc1 ;
            clav:classeStatus "A" .
    }`

    return Graphdb.fetch(query)
}

Entidades.intervencaoComoParticipante = (id) => {
    query = `
    select ?id ?codigo ?titulo where { 
        ?id clav:temParticipante clav:${id} ;
            ?Type clav:${id} ;
            clav:titulo ?titulo ;
            clav:codigo ?codigo ;
            clav:pertenceLC clav:lc1 ;
            clav:classeStatus "A" .
        
        filter (?Type!=clav:temParticipante && ?Type!=clav:temDono)
    }`

    return Graphdb.fetch(query)
}