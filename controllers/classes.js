const Classes = module.exports
const Graphdb = require('./graphdb')

    // TODO : Alterar query para abranger todos os níveis.
Classes.listarClasses = () => {

    query = `
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


Classes.listarClassesPorId = (id) => {

    query = `
    SELECT * WHERE { 
        clav:${id} clav:titulo ?titulo;
            clav:codigo ?codigo;
            clav:classeStatus ?status;
            clav:descricao ?desc.
        OPTIONAL {
            clav:${id} clav:temPai ?pai.
            ?pai clav:codigo ?codigoPai;
                clav:titulo ?tituloPai.
        } 
        
        OPTIONAL {
            clav:${id} clav:processoTransversal ?procTrans;
                clav:processoTipoVC ?pt.
            ?pt skos:prefLabel ?procTipo.
        }
    }
    `
    return Graphdb.fetch(query)
}