const axios = require('axios')
const Graphdb = module.exports

const graphdbAdress = 'http://localhost:7200'
const graphdbRepository = 'clav'

const prefixes = {
    rdf: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#',
    clav: 'http://jcr.di.uminho.pt/m51-clav#',
    owl: 'http://www.w3.org/2002/07/owl#',
    rdfs: 'http://www.w3.org/2000/01/rdf-schema#',
    noInferences: 'http://www.ontotext.com/explicit',
    skos: 'http://www.w3.org/2004/02/skos/core#'
}

Graphdb.fetch = (query) => {

    let prefixConcat = ""
    for (let key in prefixes) {
        prefixConcat += "PREFIX " + key + ": <" + prefixes[key] + "> "
    }

    query = prefixConcat + query

    return axios.get(graphdbAdress + '/repositories/' + graphdbRepository + '?query=' + encodeURIComponent(query))
}

Graphdb.simplificaSPARQLRes = (sparqlRes, campos) => {
    let resultado = new Array()
    for (let i = 0; i < sparqlRes.length; i++) {
        resultado[i] = {}
        for (let j = 0; j < campos.length; j++) {
            if (sparqlRes[i][campos[j]])
                resultado[i][campos[j]] = sparqlRes[i][campos[j]].value
        }
    }

    return resultado
}