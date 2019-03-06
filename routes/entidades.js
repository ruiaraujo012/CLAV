const express = require('express')
const router = express.Router()
const Entidades = require('../controllers/entidades')
const authenticate = require('../auth/auth').authenticate

/**
* @swagger
* /entidades/:
*   get:
*     tags:
*       - Obter lista de todas as entidades
*     description: Devolve um array de entidades
*     produces:
*       - application/json
*     responses:
*       200:
*         description:
*         examples:
*           application/json: [{"sigla":{"type":"literal","value":"ACSS"},"sioe":{"type":"literal","value":"149110000"},"designacao":{"type":"literal","value":"Administração Central do Sistema de Saúde, IP"},"id":{"type":"uri","value":"http://jcr.di.uminho.pt/m51-clav#ent_ACSS"},"internacional":{"type":"literal","value":"Não"}},{"sigla":{"type":"literal","value":"ARS-LVT"},"sioe":{"type":"literal","value":"146000000"},"designacao":{"type":"literal","value":"Administração Regional de Saúde de Lisboa e Vale do Tejo"},"id":{"type":"uri","value":"http://jcr.di.uminho.pt/m51-clav#ent_ARS-LVT"},"internacional":{"type":"literal","value":"Não"}}]
*/

router.get('/', authenticate(), (req, res) => {

    Entidades.listarEntidades().then(data => res.json(data.data.results.bindings)).catch(err => res.send(err))

})


/**
* @swagger
* /entidades/{id}:
*   get:
*     tags:
*       - Obter informação sobre uma entidade
*     description:
*     parameters:
*       - in: path
*         name: id
*     produces:
*       - application/json
*     responses:
*       200:
*         description:
*         examples:
*           application/json: {"entidade":{"estado":{"type":"literal","value":"Ativa"},"sigla":{"type":"literal","value":"INEM"},"sioe":{"type":"literal","value":"142300000"},"designacao":{"type":"literal","value":"Instituto Nacional de Emergência Médica, IP"},"internacional":{"type":"literal","value":"Não"}},"tipologiasPertencentes":[{"sigla":{"type":"literal","value":"AP"},"designacao":{"type":"literal","value":"Administração Pública"},"id":{"type":"uri","value":"http://jcr.di.uminho.pt/m51-clav#tip_AP"}},{"sigla":{"type":"literal","value":"IP"},"designacao":{"type":"literal","value":"Institutos Públicos"},"id":{"type":"uri","value":"http://jcr.di.uminho.pt/m51-clav#tip_IP"}}],"intervencaoComoDono":[{"codigo":{"type":"literal","value":"450.10.077"},"titulo":{"type":"literal","value":"Licenciamento ou autorização de atividades de prestação de serviços de saúde humana"},"id":{"type":"uri","value":"http://jcr.di.uminho.pt/m51-clav#c450.10.077"}},{"codigo":{"type":"literal","value":"700.20.300"},"titulo":{"type":"literal","value":"Prestação de cuidados de emergência médica"},"id":{"type":"uri","value":"http://jcr.di.uminho.pt/m51-clav#c700.20.300"}}],"intervencaoComoParticipante":[{"codigo":{"type":"literal","value":"450.10.649"},"titulo":{"type":"literal","value":"Categorização de bens e produtos"},"id":{"type":"uri","value":"http://jcr.di.uminho.pt/m51-clav#c450.10.649"}},{"codigo":{"type":"literal","value":"550.20.006"},"titulo":{"type":"literal","value":"Atendimento telefónico de emergência"},"id":{"type":"uri","value":"http://jcr.di.uminho.pt/m51-clav#c550.20.006"}},{"codigo":{"type":"literal","value":"700.20.102"},"titulo":{"type":"literal","value":"Prevenção de crises pandémicas e situações de emergência sanitária ou de saúde pública"},"id":{"type":"uri","value":"http://jcr.di.uminho.pt/m51-clav#c700.20.102"}}]}
*/

router.get('/:id', authenticate(), async (req, res) => {

    let entidade = await Entidades.listarEntidadePorId(req.params.id)
    entidade = entidade.data.results.bindings[0]

    let tipologiasPertencentes = await Entidades.tipologiasPertencentes(req.params.id)
    tipologiasPertencentes = tipologiasPertencentes.data.results.bindings

    let intervencaoComoDono = await Entidades.intervencaoComoDono(req.params.id)
    intervencaoComoDono = intervencaoComoDono.data.results.bindings

    let intervencaoComoParticipante = await Entidades.intervencaoComoParticipante(req.params.id)
    intervencaoComoParticipante = intervencaoComoParticipante.data.results.bindings

    res.json({ entidade, tipologiasPertencentes, intervencaoComoDono, intervencaoComoParticipante })
})

module.exports = router