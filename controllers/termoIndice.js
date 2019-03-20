const TermoIndice = module.exports
const Graphdb = require('./graphdb')

TermoIndice.listarTermoIndice = () => {

    let query = `
    SELECT * WHERE { 
        ?s rdf:type clav:TermoIndice ;
            clav:termo ?Termo ;
            clav:estaAssocClasse ?id .
        ?id clav:codigo ?Classe ;
            clav:titulo ?Tit .
    }`

    return Graphdb.fetch(query)
}

TermoIndice.listarTermoIndicePorID = (id) => {

    let query = `
    SELECT * WHERE { 
        clav:${id} rdf:type clav:TermoIndice ;
            clav:termo ?Termo ;
            clav:estaAssocClasse ?id .
        ?id clav:codigo ?Classe ;
            clav:titulo ?Tit .
    }`

    return Graphdb.fetch(query)
}