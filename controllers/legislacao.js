const Legislacao = module.exports
const Graphdb = require('./graphdb')

// TODO : Alterar query para abranger todos os níveis.
Legislacao.listarLegislacao = () => {

    query = `
    SELECT  
            ?id ?data ?numero ?tipo ?sumario
            (GROUP_CONCAT(CONCAT(STR(?ent),"::",?entSigla); SEPARATOR=";") AS ?entidades)
        WHERE { 
            ?id rdf:type clav:Legislacao;
                clav:diplomaData ?data;
                clav:diplomaNumero ?numero;
                clav:diplomaTipo ?tipo;
                clav:diplomaSumario ?sumario.
            optional{
                ?id clav:diplomaEntidade ?ent.
                ?ent clav:entSigla ?entSigla;
            }
        }
        Group by ?id ?data ?numero ?tipo ?sumario
    Order by desc (?data)
    `
    return Graphdb.fetch(query)
}

Legislacao.listarLegislacaoPorId = (id) => {

    query = `
    SELECT  
        ?tipo ?data ?numero ?sumario ?link
        (GROUP_CONCAT(CONCAT(STR(?ent),"::",?entSigla,"::",?entDesignacao); SEPARATOR=";") AS ?entidades)
    WHERE { 
        clav:${id} a clav:Legislacao;
            clav:diplomaData ?data;
            clav:diplomaNumero ?numero;
            clav:diplomaTipo ?tipo;
            clav:diplomaSumario ?sumario;
            clav:diplomaLink ?link;
        OPTIONAL{
            clav:${id} clav:diplomaEntidade ?ent.
            ?ent clav:entSigla ?entSigla;
                clav:entDesignacao ?entDesignacao.
        }
    } GROUP BY ?tipo ?data ?numero ?sumario ?link

    `
    return Graphdb.fetch(query)
}

Legislacao.regularProcessosDeNegocio = id => {
    
    query = `
    SELECT DISTINCT ?id ?codigo ?titulo WHERE { 
        {
            ?id clav:temLegislacao clav:${id};
        } 
        UNION {
            ?crit clav:temLegislacao clav:${id}.
            ?just clav:temCriterio ?crit .
            ?aval clav:temJustificacao ?just .
            {
                ?id clav:temPCA ?aval ;
            } 
            UNION {
                ?id clav:temDF ?aval ;
            }
        }
        ?id clav:codigo ?codigo;
            clav:titulo ?titulo;
            clav:classeStatus 'A'.
            
    } ORDER BY ?codigo
    `

    return Graphdb.fetch(query)
}