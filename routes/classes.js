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
	res.locals.xmlContainer = ['classesN1', 'classeN1', 'filhosN2', 'filhoN2', 'filhosN3', 'filhoN3', 'filhosN4', 'filhoN4']
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
			res.locals.dados = await Classes.obtencaoDadosNivel1_2(id)
			res.locals.xmlContainer = ['classe_N1', 'descritivo_da_classe', 'notas_aplicação', 'nota_aplicação', 'exemplos_NA', 'exemplo_NA', 'notas_exclusão', 'nota_exclusão', 'termos_de_índice', 'termo_de_índice']
			break
		case 2:
			res.locals.dados = await Classes.obtencaoDadosNivel1_2(id)
			res.locals.xmlContainer = ['classe_N2', 'descritivo_da_classe', 'notas_aplicação', 'nota_aplicação', 'exemplos_NA', 'exemplo_NA', 'notas_exclusão', 'nota_exclusão', 'termos_de_índice', 'termo_de_índice']
			break
		case 3:
			res.locals.dados = await Classes.obtencaoDadosNivel3(id)
			res.locals.xmlContainer = [
				'classe_N3',
				'descritivo_da_classe',
				'notas_aplicação',
				'nota_aplicação',
				'exemplos_NA',
				'exemplo_NA',
				'notas_exclusão',
				'nota_exclusão',
				'termos_de_índice',
				'termo_de_índice',
				'contexto_de_avaliação',
				'donos',
				'dono',
				'participantes',
				'participante',
				'processos_relacionados',
				'processo_relacionado',
				'legislações',
				'legislação',
				'VER_AQUI', // FIXME: Alterar isto
				'decisões_de_avaliação',
				'pca',
				'justificação_PCA',
				'critério',
				'destino_final',
				'justificação_destinoFinal',
				'critério'
			]
			break
		case 4:
			res.locals.dados = await Classes.obtencaoDadosNivel4(id)
			res.locals.xmlContainer = [
				'classe_N4',
				'descritivo_da_classe',
				'notas_aplicacao',
				'nota_aplicacao',
				'exemplos_NA',
				'exemplo_NA',
				'notas_exclusao',
				'nota_exclusao',
				'termos_de_índice',
				'termo_de_índice',
				'decisões_de_avaliação',
				'pca',
				'justificação_PCA',
				'critério',
				'destino_final',
				'justificação_destinoFinal',
				'critério'
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
	res.locals.xmlContainer = ['processos_relacionados', 'processo_relacionados']

	next()
})

router.get('/:id/legislacao', authenticate(), async (req, res, next) => {
	const nivel = await Classes.obterNivelDaClasse(req.params.id)

	if (nivel !== 3) next()

	res.locals.dados = await Classes.legislacao(req.params.id)
	res.locals.xmlContainer = ['legislações', 'legislação']

	next()
})

router.get('/:id/pca', authenticate(), async (req, res, next) => {
	// c150.20.501 tem multiplos criterios de pca para se verificar
	const pca = await Classes.pca(req.params.id)

	res.locals.dados = pca
	res.locals.xmlContainer = ['pca', 'justificações_PCA', 'justificação_PCA']

	next()
})

router.get('/:id/df', authenticate(), async (req, res, next) => {
	// c400.10.001 tem multiplos dfs para testar

	const destinoFinal = await Classes.df(req.params.id)

	res.locals.dados = destinoFinal
	res.locals.xmlContainer = ['destino_final', 'justificações_destinoFinal', 'justificação_destinoFinal']

	next()
})

module.exports = router
