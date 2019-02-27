const axios = require('axios')
const Graphdb = module.exports

const graphdbAdress = 'http://localhost:7200'
const graphdbRepository = 'clav'

Graphdb.fetch = (query) => {
    query = encodeURIComponent(query)

    return axios.get(graphdbAdress + '/repositories/' + graphdbRepository + '?query=' + query)
    .then(data => data.data)
    .catch(err => err)
}

