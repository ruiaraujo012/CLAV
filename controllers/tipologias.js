const Tipologias = module.exports
const Graphdb = require('./graphdb')

Tipologias.listarTipologias = () => {
	const query = `
		SELECT ?id ?sigla ?designacao ?internacional ?sioe {
			?idd rdf:type clav:TipologiaEntidade ;
				clav:tipSigla ?sigla ;
				clav:tipDesignacao ?designacao ;
				BIND (STRAFTER(STR(?idd), 'clav#') AS ?id).
		}
    `
	return Graphdb.fetch(query)
}

Tipologias.listarTipologiaPorId = (id) => {
	const query = `
		SELECT ?sigla ?designacao
		WHERE {
				clav:${id} rdf:type clav:TipologiaEntidade ;
				clav:tipSigla ?sigla ;
				clav:tipDesignacao ?designacao .
    }`

	return Graphdb.fetch(query)
}

Tipologias.dono = (id) => {
	const query = ` 
		SELECT ?id ?codigo ?titulo WHERE {
			?idd clav:temDono clav:${id} ;
				clav:codigo ?codigo ;
				clav:titulo ?titulo ;
				clav:pertenceLC clav:lc1 ;
				clav:classeStatus "A" .
			BIND (STRAFTER(STR(?idd), 'clav#') AS ?id).
		}
    `

	return Graphdb.fetch(query)
}

Tipologias.participante = (id) => {
	const query = `
		select ?id ?codigo ?titulo ?tipo where { 
			?idd clav:temParticipante clav:${id} ;
				?tipo clav:${id} ;
			
				clav:titulo ?titulo ;
				clav:codigo ?codigo ;
				clav:pertenceLC clav:lc1 ;
				clav:classeStatus "A" .
			
			filter (?tipo!=clav:temParticipante && ?tipo!=clav:temDono)
			BIND (STRAFTER(STR(?idd), 'clav#') AS ?id).
		}`

	return Graphdb.fetch(query)
}

Tipologias.entidades = (id) => {
	const query = `
		SELECT ?id ?sigla ?designacao WHERE {
			?idd clav:pertenceTipologiaEnt clav:${id} .
			
			?idd clav:entEstado "Ativa";
				clav:entSigla ?sigla;
				clav:entDesignacao ?designacao;
			BIND (STRAFTER(STR(?idd), 'clav#') AS ?id).
		}`

	return Graphdb.fetch(query)
}
