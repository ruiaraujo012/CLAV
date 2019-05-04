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
		// <classe_N1 xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="file:/C:/Users/Claudia%20Marques/Desktop/TESE/CLAV.xsd">
		// <código>100</código>
		// <título>Ordenamento Jurídico e Normativo</título>
		// <descritivo_da_classe>
		// <descrição>
		// Relativo à construção e interpretação das Normas, no sentido lato do termo (com e sem caráter coercivo): elaboração, aprovação e publicitação dos atos de caráter dispositivo e de caráter orientador que regulam as ações e relações entre os diversos atores sociais - da legislação aos regulamentos, regras internas de funcionamento, instruções procedimentais e normas técnicas. Inclui os processos de vinculação do Estado português a convenções internacionais, bem como os avisos relativos à vinculação dos restantes Estados-parte naquelas convenções.
		// </descrição>
		// <notas_aplicação>
		// <nota_aplicação>
		// Os atos de caráter dispositivo podem incidir sobre a sociedade portuguesa em geral, sobre determinados setores de atividade, sobre determinadas parcelas do território ou, ainda, sobre organismos ou serviços singulares
		// </nota_aplicação>
		// </notas_aplicação>
		// <exemplos_NA>
		// <exemplo_NA/>
		// </exemplos_NA>
		// <notas_exclusão>
		// <nota_exclusão>
		// A negociação de convenções internacionais (tratados, acordos) e a participação na elaboração de normas técnicas internacionais, bem como a participação na elaboração de diretivas e de regulamentos comunitários, devem ser consideradas em "Execução da política externa/ Definição de políticas conjuntas e dos instrumentos de regulação" (200.10) - ou seja, na área funcional 100 devem ser considerados apenas os procedimentos de ratificação, transposição e interpretação daquelas disposições comunitárias ou internacionais.
		// </nota_exclusão>
		// </notas_exclusão>
		// </descritivo_da_classe>
		// </classe_N1>
		case 1:
			res.locals.dados = await Classes.obtencaoDadosNivel1_2(id)
			res.locals.xmlContainer = ['classe_N1', 'descritivo_da_classe', 'notas_aplicação', 'nota_aplicação', 'exemplos_NA', 'exemplo_NA', 'notas_exclusão', 'nota_exclusão', 'termos_de_indide', 'termo_de_indide']
			break
		case 2:
			res.locals.dados = await Classes.obtencaoDadosNivel1_2(id)
			res.locals.xmlContainer = ['classes', 'classe_N2', 'notasAplicacao', 'notaAplicacao', 'exemplosNotasAplicacao', 'exemploNotaAplicacao', 'notasExclusao', 'notaExclusao', 'termosIndice', 'termoIndice']
			break
		case 3:
			res.locals.dados = await Classes.obtencaoDadosNivel3(id)
			res.locals.xmlContainer = [
				'classes',
				'classe_N3',
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
				'classe_N4',
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
