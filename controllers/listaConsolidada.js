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

ListaConsolidada.listar = async () => {

    let classesN1 = await Classes.listarClassesPorNivelComPai(1)
    let classesN2 = await Classes.listarClassesPorNivelComPai(2)
    let classesN3 = await Classes.listarClassesPorNivelComPai(3)
    let classesN4 = await Classes.listarClassesPorNivelComPai(4)

    // code : hashmap

    // construir a estrutura de baixo para cima. 4 -> 3 -> 2 -> 1
    let nivel4 = {}
    for (n4 in classesN4) {

        let current = classesN4[n4]

        if (!nivel4[current.pai]) {
            nivel4[current.pai] = []
        }
        let pai = current.pai
        delete current.pai
        nivel4[pai].push(current)
    }

    let nivel3 = construcaoEstrutura(nivel4, classesN3)
    let nivel2 = construcaoEstrutura(nivel3, classesN2)

    let nivel1 = [] 

    // Apenas difere por armazenar no array em vez de dic.
    for (n1 in classesN1) {

        let current = classesN1[n1]

        if (!nivel1[current.pai]) {
            nivel1[current.pai] = []
        }

        let codigo = "c" + current.codigo
        let codigoPai = current.pai

        if(codigo in nivel2){
            
            if(!current.filhos){
                current.filhos = []
            }
            current.filhos.push(nivel2[codigo])
        }

        delete current.pai
        nivel1.push(current)
    }

    return nivel1 
}