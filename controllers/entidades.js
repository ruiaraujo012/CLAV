const Entidades = module.exports
const Graphdb = require('./graphdb')

Entidades.listarEntidades = () => {

    query = `
    SELECT ?id ?sigla ?designacao ?internacional {
        ?id rdf:type clav:Entidade ;
            clav:entEstado "Ativa";
            clav:entDesignacao ?designacao ;
            clav:entSigla ?sigla ;
            clav:entInternacional ?internacional.
    }
    `
    return Graphdb.fetch(query)
}

Entidades.listarEntidadePorId = (id) => {

    query = `

    `
    return Graphdb.fetch(query)
}