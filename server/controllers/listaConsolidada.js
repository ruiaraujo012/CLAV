const ListaConsolidada = module.exports
const Classes = require('../controllers/classes')

const construcaoEstrutura = (nivelAnterior, classesAtuais) => {
	const nivel = {}
	Object.keys(classesAtuais).forEach((key) => {
		const current = classesAtuais[key]
		const codigo = `c${current.codigo}`

		if (!nivel[current.pai]) {
			nivel[current.pai] = []
		}

		if (codigo in nivelAnterior) {
			if (!current.filhos) {
				current.filhos = []
			}
			current.filhos.push(...nivelAnterior[codigo])
		}

		const { pai } = current
		delete current.pai
		nivel[pai].push(current)
	})

	return nivel
}

const construcaoEstruturaUltimoNivel = (classes) => {
	const nivel = {}
	Object.keys(classes).forEach((key) => {
		const current = classes[key]

		if (!nivel[current.pai]) {
			nivel[current.pai] = []
		}
		const { pai } = current
		delete current.pai
		nivel[pai].push(current)
	})

	return nivel
}

const construcaoEstruturaPrimeiroNivel = (nivelAnterior, classesAtuais) => {
	const nivel = []

	Object.keys(classesAtuais).forEach((key) => {
		const current = classesAtuais[key]

		if (!nivel[current.pai]) {
			nivel[current.pai] = []
		}

		const codigo = `c${current.codigo}`
		// Miguel Brito, se vires isto apaga caso não vás precisar da variavel
		// const codigoPai = current.pai

		if (codigo in nivelAnterior) {
			if (!current.filhos) {
				current.filhos = []
			}
			current.filhos.push(...nivelAnterior[codigo])
		}

		delete current.pai
		nivel.push(current)
	})

	return nivel
}

ListaConsolidada.listar = async () => {
	const classesN1 = await Classes.listarClassesPorNivelComPai(1)
	const classesN2 = await Classes.listarClassesPorNivelComPai(2)
	const classesN3 = await Classes.listarClassesPorNivelComPai(3)
	const classesN4 = await Classes.listarClassesPorNivelComPai(4)

	// construir a estrutura de baixo para cima. 4 -> 3 -> 2 -> 1

	const nivel4 = construcaoEstruturaUltimoNivel(classesN4)
	const nivel3 = construcaoEstrutura(nivel4, classesN3)
	const nivel2 = construcaoEstrutura(nivel3, classesN2)
	const nivel1 = construcaoEstruturaPrimeiroNivel(nivel2, classesN1)

	return nivel1
}

ListaConsolidada.listarComTodosCampos = async () => {
	// Obter lista de IDs para cada nivel
	const idsNivel1 = await Classes.listarClassesApenasComIdPorNivel(1)
	const idsNivel2 = await Classes.listarClassesApenasComIdPorNivel(2)
	const idsNivel3 = await Classes.listarClassesApenasComIdPorNivel(3)
	const idsNivel4 = await Classes.listarClassesApenasComIdPorNivel(4)

	// pai : "c100.10.101"
	// codigoPai : "100.10.101"

	let classesN4 = await this.obterTodasClassesPorId(idsNivel4, 4)
	const nivel4 = construcaoEstruturaUltimoNivel(classesN4)
	classesN4 = []

	let classesN3 = await this.obterTodasClassesPorId(idsNivel3, 3)
	const nivel3 = construcaoEstrutura(nivel4, classesN3)
	classesN3 = []

	let classesN2 = await this.obterTodasClassesPorId(idsNivel2, 2)
	const nivel2 = construcaoEstrutura(nivel3, classesN2)
	classesN2 = []

	let classesN1 = await this.obterTodasClassesPorId(idsNivel1, 1)
	const nivel1 = construcaoEstruturaPrimeiroNivel(nivel2, classesN1)
	classesN1 = []

	return nivel1
}

ListaConsolidada.obterTodasClassesPorId = async (ids, nivel) => {
	const classes = []
	let classe = {}

	await Promise.all(
		ids.map(async (id) => {
			switch (nivel) {
				case 1:
				case 2:
					classe = await Classes.obtencaoDadosNivel1_2(id.id)
					break
				case 3:
					classe = await Classes.obtencaoDadosNivel3(id.id)
					break
				case 4:
					classe = await Classes.obtencaoDadosNivel4(id.id)
					break
				default:
					break
			}

			classes.push(classe)
		})
	)

	return classes
}
