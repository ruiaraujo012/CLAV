const ListaConsolidada = module.exports
const Classes = require('../controllers/classes')

construcaoEstrutura = (nivelAnterior, classesAtuais) => {
    let nivel = {}
    for (n in classesAtuais) {
        let current = classesAtuais[n]
        let codigo = "c" + current.codigo

        if (!nivel[current.pai]) {
            nivel[current.pai] = []
        }

        if (codigo in nivelAnterior) {

            if (!current.filhos) {
                current.filhos = []
            }
            current.filhos.push(nivelAnterior[codigo])
        }

        let pai = current.pai
        delete current.pai
        nivel[pai].push(current)
    }

    return nivel;
}

construcaoEstruturaUltimoNivel = (classes) => {

    let nivel = {}
    for (n in classes) {

        let current = classes[n]

        if (!nivel[current.pai]) {
            nivel[current.pai] = []
        }
        let pai = current.pai
        delete current.pai
        nivel[pai].push(current)
    }
    return nivel
}

construcaoEstruturaPrimeiroNivel = (nivelAnterior, classesAtuais) => {

    let nivel = []

    for (n in classesAtuais) {

        let current = classesAtuais[n]

        if (!nivel[current.pai]) {
            nivel[current.pai] = []
        }

        let codigo = "c" + current.codigo
        let codigoPai = current.pai

        if (codigo in nivelAnterior) {

            if (!current.filhos) {
                current.filhos = []
            }
            current.filhos.push(nivelAnterior[codigo])
        }

        delete current.pai
        nivel.push(current)
    }
    return nivel
}

ListaConsolidada.listar = async () => {

    let classesN1 = await Classes.listarClassesPorNivelComPai(1)
    let classesN2 = await Classes.listarClassesPorNivelComPai(2)
    let classesN3 = await Classes.listarClassesPorNivelComPai(3)
    let classesN4 = await Classes.listarClassesPorNivelComPai(4)

    // construir a estrutura de baixo para cima. 4 -> 3 -> 2 -> 1

    let nivel4 = construcaoEstruturaUltimoNivel(classesN4)
    let nivel3 = construcaoEstrutura(nivel4, classesN3)
    let nivel2 = construcaoEstrutura(nivel3, classesN2)
    let nivel1 = construcaoEstruturaPrimeiroNivel(nivel2, classesN1)

    return nivel1
}


ListaConsolidada.listarComTodosCampos = async () => {

    // Obter lista de IDs para cada nivel
    let idsNivel1 = await Classes.listarClassesApenasComIdPorNivel(1)
    let idsNivel2 = await Classes.listarClassesApenasComIdPorNivel(2)
    let idsNivel3 = await Classes.listarClassesApenasComIdPorNivel(3)
    let idsNivel4 = await Classes.listarClassesApenasComIdPorNivel(4)

    // pai : "c100.10.101"
    // codigoPai : "100.10.101"

    let classesN4 = await this.obterTodasClassesPorId(idsNivel4, 4)
    let nivel4 = construcaoEstruturaUltimoNivel(classesN4)
    classesN4 = []

    let classesN3 = await this.obterTodasClassesPorId(idsNivel3, 3)
    let nivel3 = construcaoEstrutura(nivel4, classesN3)
    classesN3 = []

    let classesN2 = await this.obterTodasClassesPorId(idsNivel2, 2)
    let nivel2 = construcaoEstrutura(nivel3, classesN2)
    classesN2 = []

    let classesN1 = await this.obterTodasClassesPorId(idsNivel1, 1)
    let nivel1 = construcaoEstruturaPrimeiroNivel(nivel2, classesN1)
    classesN1 = []

    return nivel1 
}

ListaConsolidada.obterTodasClassesPorId = async (ids, nivel) => {

    let classes = []
    let classe = {}

    for (key in ids) {
        console.log("Id : " + ids[key].id)
        switch (nivel) {
            case 1:
            case 2:
                classe = await Classes.obtencaoDadosNivel1_2(ids[key].id)
                break;
            case 3:
                classe = await Classes.obtencaoDadosNivel3(ids[key].id)
                break;
            case 4:
                classe = await Classes.obtencaoDadosNivel4(ids[key].id)
                break;
            default:
                break;
        }
        classes.push(classe)
    }

    return classes
}