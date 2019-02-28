const Entidades = module.exports
const Graphdb = require('./graphdb')

Entidades.listarEntidades = () => {

    query = `

    `
    return Graphdb.fetch(query)
}

Entidades.listarEntidadePorId = (id) => {

    query = `

    `
    return Graphdb.fetch(query)
}