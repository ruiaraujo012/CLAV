const axios = require('axios')
const Query = module.exports


Query.listClasses = () => {

    query = encodeURIComponent("PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> PREFIX clav: <http://jcr.di.uminho.pt/m51-clav#>    Select ?id                            ?codigo ?titulo Where {  ?id rdf:type clav:Classe_N1 ;  clav:classeStatus 'A';  clav:codigo ?codigo ; clav:titulo ?titulo . }  Order by ?id ")

    return axios.get('http://localhost:7200/repositories/clav?query='+query).
    then(data => {
        console.log(data.data)
        return data.data
    }).catch(err => {
        return err
    })
}

