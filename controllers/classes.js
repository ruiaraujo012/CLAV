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

Classes.donos = id => {
    let query = `
        SELECT ?id ?tipo ?sigla ?designacao WHERE { 
            clav:${id} clav:temDono ?idd.
            {
                ?idd clav:entDesignacao ?designacao;
                    a ?tipoo;
                    clav:entSigla ?sigla.
            } UNION {
                ?idd clav:tipDesignacao ?designacao;
                a ?tipoo;
                clav:tipSigla ?sigla .
            }
        FILTER ( ?tipo NOT IN (owl:NamedIndividual) )
        BIND (STRAFTER(STR(?idd), 'clav#') AS ?id).
        BIND (STRAFTER(STR(?tipoo), 'clav#') AS ?tipo).
        }`
    return Graphdb.fetch(query)
}

Classes.participantes = id => {
    let query = `
        select ?id ?sigla ?designacao ?tipoParticipante where { 
            clav:${id} clav:temParticipante ?idd ;
                            ?tipoParticipantee ?idd .
                {
                    ?idd clav:entDesignacao ?designacao;
                        clav:entSigla ?sigla .
                } UNION {
                    ?idd clav:tipDesignacao ?designacao;
                        clav:tipSigla ?sigla .
                }      
        filter (?tipoParticipantee NOT IN (clav:temParticipante, clav:temDono))
        BIND (STRAFTER(STR(?idd), 'clav#') AS ?id).
        BIND (STRAFTER(STR(?tipoParticipantee), 'clav#') AS ?tipoParticipante).
        }`
    return Graphdb.fetch(query)
}

Classes.processosRelacionados = id => {
    let query = `
        select ?id ?codigo ?titulo ?tipoRel {
            clav:${id} clav:temRelProc ?idd;
                        ?tipoRell ?idd.
        
            ?idd clav:codigo ?codigo;
                clav:titulo ?titulo;
                clav:classeStatus 'A'.
        
        filter (?tipoRell!=clav:temRelProc)
        BIND (STRAFTER(STR(?idd), 'clav#') AS ?id).
        BIND (STRAFTER(STR(?tipoRell), 'clav#') AS ?tipoRel).
        } Order by ?tipoRel ?codigo
        `
    return Graphdb.fetch(query)
}

Classes.legislacao = id => {
    let query = `
        SELECT ?id ?tipo ?numero ?sumario WHERE { 
            clav:${id} clav:temLegislacao ?id.
            ?id clav:diplomaNumero ?numero;
                clav:diplomaTitulo ?sumario;
                clav:diplomaTipo ?tipo.
        } order by ?tipo ?numero`

    return Graphdb.fetch(query)
}

Classes.obtencaoDadosNivel3 = async id => {

    let classe = await this.listarClassesPorId(id)
    let donos = await this.donos(id)
    let participantes = await this.participantes(id)
    let processosRelacionados = await this.processosRelacionados(id)
    let legislacao = await this.legislacao(id)

    return {
        ...classe[0],
        donos,
        participantes,
        processosRelacionados,
        legislacao
    }
}