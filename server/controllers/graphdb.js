const axios = require('axios')

const Graphdb = module.exports


const prefixes = {
	rdf: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#',
	clav: 'http://jcr.di.uminho.pt/m51-clav#',
	owl: 'http://www.w3.org/2002/07/owl#',
	rdfs: 'http://www.w3.org/2000/01/rdf-schema#',
	noInferences: 'http://www.ontotext.com/explicit',
	skos: 'http://www.w3.org/2004/02/skos/core#'
}

Graphdb.simplificaSPARQLRes = (sparqlRes, campos) => {
	const resultado = []
	for (let i = 0; i < sparqlRes.length; i += 1) {
		resultado[i] = {}
		for (let j = 0; j < campos.length; j += 1) {
			if (sparqlRes[i][campos[j]]) resultado[i][campos[j]] = sparqlRes[i][campos[j]].value
		}
	}

	return resultado
}

Graphdb.fetch = async (query) => {

	// TODO : Rever, tê-los como variável global causa problmas, não se encontram 
	// carregados antes de serem usados?!
	const graphdbAddress = process.env.GRAPHDB_URI
	const graphdbRepository = process.env.GRAPHDB_REPOSITORY

	let prefixConcat = ''
	Object.keys(prefixes).forEach((key) => {
		prefixConcat += `PREFIX ${key}: <${prefixes[key]}> `
	})

	const newQuery = prefixConcat + query
	let dadosNormalizados = {}

	try {
		const dados = (await axios.get(
			`${graphdbAddress}/repositories/${graphdbRepository}?query=${encodeURIComponent(newQuery)}`
		)).data
		const { vars } = dados.head
		const { bindings } = dados.results
		dadosNormalizados = this.simplificaSPARQLRes(bindings, vars)
	} catch (error) {
		console.log(`[GRAPH_DB ERROR]`)
		console.log(`Query: ${newQuery}`)
	}

	return dadosNormalizados
}
