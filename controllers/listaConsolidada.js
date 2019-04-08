const ListaConsolidada = module.exports
const Classes = require('../controllers/classes')

ListaConsolidada.listar = async () => {

    let classesN1 = await Classes.listarClassesPorNivelComPai(1)
    let classesN2 = await Classes.listarClassesPorNivelComPai(2)
    let classesN3 = await Classes.listarClassesPorNivelComPai(3)
    let classesN4 = await Classes.listarClassesPorNivelComPai(4)

    // code : hashmap

    // construir a estrutura de baixo para cima. 4 -> 3 -> 2 -> 1
    let nivel4 = {}
    for (n4 in classesN4) {
        nivel4[classesN4[n4].pai] = classesN4[n4]
    }


    let nivel3 = {}
    for (n3 in classesN3) {
        let codigo = "c" + classesN3[n3].codigo
        let codigoPai = classesN3[n3].pai
        nivel3[codigoPai] = classesN3[n3]
        if (codigo in nivel4) {

            if (!(nivel3[codigoPai].nivel4 in nivel3))
                nivel3[codigoPai].nivel4 = []
            else 
                nivel3[codigoPai].nivel4.push(nivel4[codigo])
        }
    }


    let nivel2 = {}
    for (n2 in classesN2) {
        let codigo = "c" + classesN2[n2].codigo
        let codigoPai = classesN2[n2].pai
        nivel2[codigoPai] = classesN2[n2]
        if (codigo in nivel3) {
            nivel2[codigoPai].nivel3 = nivel3[codigo]
        }

    }

    console.log(nivel2)

    // let nivel1 = {}
    // for (n1 in classesN1) {
    //     let codigo = "c" + classesN1[n1].codigo
    //     nivel1[codigo] = classesN1[n1]
    //     if (codigo in nivel2) {
    //         nivel1[codigo].nivel2 = nivel2[codigo]
    //     }
    // }

    return {}

}

// c900.10.001
// c900.10.002

/*
HashMap
    c100
        c100.10
            c100.10.001
                c100.10.001.01
        c100.20
    c200
        c200.10
    c300

    nivel4--

    'c950.10.600' : 
    {
        'codigo' : '950.10.600.02
    }, 
    'c950.10.602' : 
    {
        'codigo' : '950.10.602.02
    } 



    nivel3--
    'c950.30': 
    {
        'codigo': '950.30.001'
    }, 
    'c950.20':
    {
        'codigo':'950.20.001'
    }



    nivel2 --

    'c900':
    {
        'codigo' : '900:500'
    },
    'c950':
    {
        'codigo' : '950:30' 
    }


*/