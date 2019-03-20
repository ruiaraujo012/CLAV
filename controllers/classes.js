const Classes = module.exports
const Graphdb = require('./graphdb')

// TODO : Alterar query para abranger todos os níveis.
Classes.listarClasses = () => {

    let query = `
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

    let query = `
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

    let query = `
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

Classes.listarNotasAplicacao = (id) => {

    let query = `
    SELECT * WHERE { 
        clav:${id} clav:temNotaAplicacao ?idNota.
        ?idNota clav:conteudo ?nota .
    }`
    return Graphdb.fetch(query)
}

Classes.listarExemplosNotasAplicacao = (id) => {

    let query = `
    SELECT * WHERE { 
        clav:${id} clav:exemploNA ?exemplo.
    }`
    return Graphdb.fetch(query)
}

Classes.listarNotasExclusao = (id) => {

    let query = `
    SELECT * WHERE { 
        clav:${id} clav:temNotaExclusao ?idNota.
        ?idNota clav:conteudo ?nota .
    }`
    return Graphdb.fetch(query)
}

Classes.listarTermosIndice = (id) => {

    let query = `
    SELECT * WHERE { 
        ?idTI a clav:TermoIndice;
              clav:estaAssocClasse clav:${id} ;
              clav:termo ?termo
    }`
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

Classes.listarPca = id => {
    let query = `
        SELECT 
            ?idPCA
            ?formaContagem
            ?subFormaContagem
            ?idJustificacao
            (GROUP_CONCAT(DISTINCT ?valor; SEPARATOR="###") AS ?valores)
            (GROUP_CONCAT(DISTINCT ?nota; SEPARATOR="###") AS ?notas)
        WHERE { 
            clav:${id} clav:temPCA ?idPCA .
            OPTIONAL {
                ?idPCA clav:pcaFormaContagemNormalizada ?contNormID .    
                ?contNormID skos:prefLabel ?formaContagem .
            }
            OPTIONAL {
                ?idPCA clav:pcaSubformaContagem ?subContID .
                ?subContID skos:scopeNote ?subFormaContagem .
            }
            OPTIONAL {
                ?idPCA clav:pcaNota ?nota .
            }
            OPTIONAL {
                ?idPCA clav:pcaValor ?valor .
            }
            OPTIONAL {
                ?idPCA clav:temJustificacao ?idJustificacao .
            }    
        }GROUP BY ?idPCA ?formaContagem ?subFormaContagem ?idJustificacao 
        `
    return Graphdb.fetch(query)
}

Classes.listarJustificacao = id => {
    let query = `
        SELECT
            ?criterio ?tipoLabel ?conteudo
        WHERE {
            clav:${id} clav:temCriterio ?criterio . 
            ?criterio clav:conteudo ?conteudo.
            ?criterio a ?tipo.
            ?tipo rdfs:subClassOf clav:CriterioJustificacao.
            ?tipo rdfs:label ?tipoLabel.
        }`
    return Graphdb.fetch(query)
}

Classes.listarDf = id => {
    let query = `
        SELECT 
            ?idDF ?valor ?idJustificacao
        WHERE { 
            clav:${id} clav:temDF ?idDF .
            OPTIONAL {
                ?idDF clav:dfValor ?valor ;
            }
            OPTIONAL {
                ?idDF clav:dfNota ?Nota ;
            }
            OPTIONAL {
                ?idDF clav:temJustificacao ?idJustificacao .
            }    
        }`
    return Graphdb.fetch(query)
}

Classes.obtencaoDadosNivel1_2 = async id => {

    let classe = await this.listarClassesPorId(id)
    let notasAplic = await this.listarNotasAplicacao(id)
    let exeNotasAplic = await this.listarExemplosNotasAplicacao(id)
    let notasExclus = await this.listarNotasExclusao(id)
    let termosInd = await this.listarTermosIndice(id)
    return {
        ...classe[0],
        notasAplic,
        exeNotasAplic,
        notasExclus,
        termosInd
    }
}

Classes.obtencaoDadosNivel3 = async id => {

    let descritivo = await this.obtencaoDadosNivel1_2(id)
    let donos = await this.donos(id)
    let participantes = await this.participantes(id)
    let processosRelacionados = await this.processosRelacionados(id)
    let legislacao = await this.legislacao(id)
    let decisao = await this.obtencaoDadosNivel4(id)

    return {
        descritivo,
        donos,
        participantes,
        processosRelacionados,
        legislacao
    }
}

Classes.obtencaoDadosNivel4 = async id => {
    let descritivo = await this.obtencaoDadosNivel1_2(id)
    let pca = await this.listarPca(id)
    let justificacao = await this.listarJustificacao(id)
    let df = await this.listarDf(id)

    return {
        descritivo,
        pca,
        justificacao,
        df
    }
}