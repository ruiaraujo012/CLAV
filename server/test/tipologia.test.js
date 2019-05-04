const axios = require('axios');
const Tipologias = require('../controllers/tipologias');

const { host } = require('../common/common')

// Data
const tipologias = require('./data/tipologias.json');
const tip_AAC = require('./data/tip_AAC.json');
const tip_AAGR = require('./data/tip_AAGR.json');
// Routes

test('verificar a listagem de todas as tipologias', async () => {

    const tipo = await Tipologias.listarTipologias();
    expect(tipologias).toEqual(tipo);
})


test.each([[tip_AAC], [tip_AAGR]])
    ('verificar a listagem de uma tipolodia por id', async (tipologia) => {

        const url = `${host}/tipologias/tip_${tipologia.sigla}`
        console.log(tipologia)
        const tipo = await axios.get(url)
        expect(tipo.data).toEqual(tipologia)
    })
