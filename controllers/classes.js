const Classes = module.exports
const Graphdb = require('./graphdb')

    // TODO : Alterar query para abranger todos os níveis.
Classes.listarClasses = () => {

    query = `
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX clav: <http://jcr.di.uminho.pt/m51-clav#>    
        Select ?id                            
        ?codigo 
        ?titulo 
        Where {  
            ?id rdf:type clav:Classe_N1;
             clav:classeStatus 'A';  
             clav:codigo ?codigo ;
              clav:titulo ?titulo . 
        }  Order by ?id 
    `
    return Graphdb.fetch(query)
}

Classes.listarClassesPorNivel = (nivel) => {

    query = `
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX clav: <http://jcr.di.uminho.pt/m51-clav#>    
        Select ?id                            
        ?codigo 
        ?titulo 
        Where {  
            ?id rdf:type clav:Classe_N${nivel} ;
             clav:classeStatus 'A';  
             clav:codigo ?codigo ;
              clav:titulo ?titulo . 
        }  Order by ?id 
    `
    return Graphdb.fetch(query)
}