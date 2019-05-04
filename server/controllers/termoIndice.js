const TermoIndice = module.exports
const Graphdb = require('./graphdb')

TermoIndice.listarTermoIndice = () => {
	const query = `
		SELECT ?s ?Termo ?id ?Tit ?Classe WHERE { 
			?ss rdf:type clav:TermoIndice ;
				clav:termo ?Termo ;
				clav:estaAssocClasse ?idd .
			?idd clav:codigo ?Classe ;
				clav:titulo ?Tit .

		BIND (STRAFTER(STR(?idd), 'clav#') AS ?id).
		BIND (STRAFTER(STR(?ss), 'clav#') AS ?s).
    }`

	return Graphdb.fetch(query)
}

TermoIndice.listarTermoIndicePorID = (id) => {
	const query = `
		SELECT ?Termo ?id ?Classe ?Tit WHERE { 
			clav:${id} rdf:type clav:TermoIndice ;
				clav:termo ?Termo ;
				clav:estaAssocClasse ?idd .
			?idd clav:codigo ?Classe ;
				clav:titulo ?Tit .
		BIND (STRAFTER(STR(?idd), 'clav#') AS ?id).
    }`

	return Graphdb.fetch(query)
}
