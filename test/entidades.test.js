const axios = require('axios');
const Entidades = require('../controllers/tipologias');

const { host } = require('../common/common');

// Data
const entidadesJSON = require('../test/data/entidades/entidades.json')
const ent_ACSS = require('../test/data/entidades/ent_ACSS.json')
const ent_ARS_C = require('../test/data/entidades/ent_ARS-C.json')
const ent_GNR = require('../test/data/entidades/ent_GNR.json')
const ent_IGDC = require('../test/data/entidades/ent_IGDC.json')

// Routes
test('verificar a listagem de todas as entidades', async () => {

    const entidades = await axios.get(`${host}/entidades`)
    expect(entidades.data).toEqual(entidadesJSON);

})

// , [ent_ARS_C], [ent_GNR], [ent_IGDC]]
test.each([[ent_GNR]])
    ('verificar a listagem de uma entidade por id', async (entidade) => {

        console.log
        const ent = await axios.get(`${host}/entidades/ent_${entidade.sigla}`);

        expect(ent.data).toEqual(entidade);

    })
