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

        if(codigo in nivelAnterior){
            
            if(!current.filhos){
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

        if(codigo in nivelAnterior){
            
            if(!current.filhos){
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