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

Classes.listarClassesPorNivelComPai = (nivel) => {

    let query = `
        Select ?id                            
        ?codigo 
        ?titulo 
        ?pai
        Where {  
            ?id rdf:type clav:Classe_N${nivel} ;
             clav:classeStatus 'A';  
             clav:codigo ?codigo ;
             clav:titulo ?titulo ;
             clav:temPai ?paii
             BIND (STRAFTER(STR(?paii), 'clav#') AS ?pai).
        }  Order by ?id 
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
        SELECT * WHERE { 
            clav:${id} clav:temLegislacao ?idLeg.
            ?idLeg clav:diplomaTipo ?Tipo;
                clav:diplomaSumario ?Súmario;
                clav:diplomaNumero ?Número. 
        }
        `
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
            ?idCriterio 
            ?criterio 
            ?justificacao
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
                ?idJustificacao clav:temCriterio ?idCriterio . 
                ?idCriterio clav:conteudo ?justificacao.
                ?idCriterio a ?tipo.
                ?tipo rdfs:subClassOf clav:CriterioJustificacao.
                ?tipo rdfs:label ?criterio.
            }
        }GROUP BY ?idPCA ?formaContagem ?subFormaContagem ?idJustificacao ?idCriterio ?criterio ?justificacao
        `
    return Graphdb.fetch(query)
}

Classes.listarDf = id => {
    let query = `
        SELECT 
            ?idDF ?valor ?idJustificacao ?idCriterio ?criterio ?justificacao
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
                ?idJustificacao clav:temCriterio ?idCriterio . 
                ?idCriterio clav:conteudo ?justificacao.
                ?idCriterio a ?tipo.
                ?tipo rdfs:subClassOf clav:CriterioJustificacao.
                ?tipo rdfs:label ?criterio.
            }
        }`
    return Graphdb.fetch(query)
}

Classes.obtencaoDadosNivel1_2 = async id => {

    let classe = await this.blocoDescritivo(id)
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

    // TODO : talvez alterar para o bloco descritivo
    let descritivo = await this.obtencaoDadosNivel1_2(id)
    let blocoContexto = await this.blocoContexto(id)
    let blocoDecisao = await this.blocoDecisao(id)

    return {
        ...descritivo,
        ...blocoContexto,
        ...blocoDecisao
    }
}

Classes.obtencaoDadosNivel4 = async id => {
    let descritivo = await this.obtencaoDadosNivel1_2(id)
    let blocoDecisao = await this.blocoDecisao(id)

    return {
        ...descritivo,
        ...blocoDecisao
    }
}

Classes.blocoDescritivo = (id) => {

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

Classes.blocoContexto = async id => {

    let donos = await this.donos(id)
    let participantes = await this.participantes(id)
    let processosRelacionados = await this.processosRelacionados(id)
    let legislacao = await this.legislacao(id)

    return {
        donos,
        participantes,
        processosRelacionados,
        legislacao
    }

}

Classes.blocoDecisao = async id => {

    let pca = await this.listarPca(id)
    let df = await this.listarDf(id)

    return {
        pca,
        df
    }

}

Classes.listaConsolidada = id => {

    let query = `
    SELECT DISTINCT
    ?Avo ?AvoCodigo ?AvoTitulo 
    ?Pai ?PaiCodigo ?PaiTitulo 
    ?PN ?PNCodigo ?PNTitulo   
    (GROUP_CONCAT(DISTINCT(CONCAT(STR(?Filho),":::",?FilhoCodigo, ":::",?FilhoTitulo)); SEPARATOR="###") AS ?Filhos)
    (GROUP_CONCAT(CONCAT(STR(?FilhoCodigo),":::",?FilhoTi);Separator="###") AS ?TIsFilhos)
    (GROUP_CONCAT(?TermoI; SEPARATOR="###") AS ?TermosPesquisa)
WHERE {  
    
    ?PN rdf:type clav:Classe_N3
    MINUS { 
        ?PN clav:pertenceLC ?lc
        filter( ?lc != clav:lc1 )
    }
    ?PN clav:classeStatus 'A'.
    
    ?PN clav:temPai ?Pai.
    ?Pai clav:temPai ?Avo.
    
    ?PN clav:codigo ?PNCodigo;
        clav:titulo ?PNTitulo.
    
    ?Pai clav:codigo ?PaiCodigo;
        clav:titulo ?PaiTitulo.
    
    ?Avo clav:codigo ?AvoCodigo;
        clav:titulo ?AvoTitulo.
    
    OPTIONAL {
        ?Filho clav:temPai ?PN;
           clav:codigo ?FilhoCodigo;
           clav:titulo ?FilhoTitulo
        OPTIONAL {
            ?fTI clav:estaAssocClasse ?Filho;
                 clav:termo ?FilhoTi
        }
    }
    OPTIONAL {
        {
            ?ti clav:estaAssocClasse ?PN ;
                clav:termo ?TermoI .
        } UNION {
            ?PN clav:exemploNA ?TermoI .
        } UNION {
            ?PN clav:temNotaAplicacao ?pNA.
            ?pNA clav:conteudo ?TermoI .
        }
    }
}
Group By ?PN ?PNCodigo ?PNTitulo ?Pai ?PaiCodigo ?PaiTitulo ?Avo ?AvoCodigo ?AvoTitulo 
Order By ?PN`

    return Graphdb.fetch(query)
}

Classes.obterNivelDaClasse = async id => {

    id = id.replace("c", "")

    let query = `
        SELECT ?id ?tipo where {   
            ?id clav:codigo "${id}" ;
            rdf:type ?tipo .
        }
    `

    let result = await Graphdb.fetch(query)

    let decider = JSON.stringify(result)

    let classes = ["Classe_N1", "Classe_N2", "Classe_N3", "Classe_N4"]

    for (key in classes)
        if (decider.includes(classes[key]))
            return parseInt(key) + 1

    return 0
}