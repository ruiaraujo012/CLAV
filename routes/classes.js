const express = require('express')

const router = express.Router()

const Classes = require('../controllers/classes')
const ListaConsolidada = require('../controllers/listaConsolidada')
const { authenticate } = require('../auth/auth')

router.get('/', authenticate(), async (req, res, next) => {
	res.locals.dados = await ListaConsolidada.listar()
	res.locals.xmlContainer = ['classesN1', 'classeN1', 'filhosN2', 'filhoN2', 'filhosN3', 'filhoN3', 'filhosN4', 'filhoN4']
	next()
})

router.get('/listaConsolidada/', authenticate(), async (req, res, next) => {
	res.locals.dados = await ListaConsolidada.listarComTodosCampos()
	// res.locals.xmlContainer = ['classesN1', 'classeN1', 'filhosN2', 'filhoN2', 'filhosN3', 'filhoN3', 'filhosN4', 'filhoN4']
	next()
})

router.get('/:id', authenticate(), async (req, res, next) => {
	if (!req.params.id) {
		next()
	}
	const { id } = req.params

	const nivelClasse = await Classes.obterNivelDaClasse(id)
	// Alterar

	switch (nivelClasse) {
		case 1:
		case 2:
			res.locals.dados = await Classes.obtencaoDadosNivel1_2(id)
			res.locals.xmlContainer = [
				'classes',
				'classe',
				'notasAplicacao',
				'notaAplicacao',
				'exemplosNotasAplicacao',
				'exemploNotaAplicacao',
				'notasExclusao',
				'notaExclusao',
				'termosIndice',
				'termoIndice'
			]
			break
		case 3:
			res.locals.dados = await Classes.obtencaoDadosNivel3(id)
			res.locals.xmlContainer = [
				'classes',
				'classe',
				'notasAplicacao',
				'notaAplicacao',
				'exemplosNotasAplicacao',
				'exemploNotaAplicacao',
				'notasExclusao',
				'notaExclusao',
				'termosIndice',
				'termoIndice',
				'donos',
				'dono',
				'participantes',
				'participante',
				'processosRelacionados',
				'processoRelacionado',
				'legislacoes',
				'legislacao',
				'prazosConservacaoAdministrativa',
				'prazoConservacaoAdministrativa',
				'justificacoes',
				'justificacao',
				'destinosFinais',
				'destinoFinal',
				'justificacoes',
				'justificacao'
			]
			break
		case 4:
			res.locals.dados = await Classes.obtencaoDadosNivel4(id)
			res.locals.xmlContainer = [
				'classes',
				'classe',
				'notasAplicacao',
				'notaAplicacao',
				'exemplosNotasAplicacao',
				'exemploNotaAplicacao',
				'notasExclusao',
				'notaExclusao',
				'termosIndice',
				'termoIndice',
				'prazosConservacaoAdministrativa',
				'prazoConservacaoAdministrativa',
				'justificacoes',
				'justificacao',
				'destinosFinais',
				'destinoFinal',
				'justificacoes',
				'justificacao'
			]
			break
		default:
			break
	}

	next()
})

router.get('/:id/donos', authenticate(), async (req, res, next) => {
	const nivel = await Classes.obterNivelDaClasse(req.params.id)

	if (nivel !== 3) next()

	res.locals.dados = await Classes.donos(req.params.id)
	res.locals.xmlContainer = ['donos', 'dono']

	next()
})

router.get('/:id/participantes', authenticate(), async (req, res, next) => {
	const nivel = await Classes.obterNivelDaClasse(req.params.id)

	if (nivel !== 3) next()

	res.locals.dados = await Classes.participantes(req.params.id)
	res.locals.xmlContainer = ['participantes', 'participante']

	next()
})

router.get('/:id/processosRelacionados', authenticate(), async (req, res, next) => {
	const nivel = await Classes.obterNivelDaClasse(req.params.id)

	if (nivel !== 3) next()

	res.locals.dados = await Classes.processosRelacionados(req.params.id)
	res.locals.xmlContainer = ['processosRelacionados', 'processoRelacionado']

	next()
})

router.get('/:id/legislacao', authenticate(), async (req, res, next) => {
	const nivel = await Classes.obterNivelDaClasse(req.params.id)

	if (nivel !== 3) next()

	res.locals.dados = await Classes.legislacao(req.params.id)
	res.locals.xmlContainer = ['legislacoes', 'legislacao']

	next()
})

router.get('/:id/pca', authenticate(), async (req, res, next) => {
	// c150.20.501 tem multiplos criterios de pca para se verificar
	const pca = await Classes.pca(req.params.id)

	res.locals.dados = pca
	res.locals.xmlContainer = ['prazosConservacaoAdministrativa', 'prazoConservacaoAdministrativa', 'justificacoes', 'justificacao']

	next()
})

router.get('/:id/df', authenticate(), async (req, res, next) => {
	// c400.10.001 tem multiplos dfs para testar

	const destinoFinal = await Classes.df(req.params.id)

	res.locals.dados = destinoFinal
	res.locals.xmlContainer = ['destinosFinais', 'destinoFinal', 'justificacoes', 'justificacao']

	next()
})

module.exports = router
