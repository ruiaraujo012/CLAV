const Stats = require("../controllers/stats")
var jwt = require('jsonwebtoken');

const msDifference = 5 * 1000;
let lastTimer = Date.now();
let savedStats = []

// TODO : alterar como pretendido
processStats = () => {

    let url = req.originalUrl
    let urlBlocks = url.split("/")
    urlBlocks.shift()

    let queriesString = urlBlocks[urlBlocks.length - 1].split(/[?&]/)
    queriesString.shift()

    let queryStringValues = []
    queriesString.map(q => {
        let qq = q.split("=")
        queryStringValues.push({ [qq[0]]: qq[1] })
    })

    let blocksLength = urlBlocks.length - 1
    urlBlocks[blocksLength] = urlBlocks[blocksLength].split("?")[0]

    if (urlBlocks[blocksLength] == "")
        urlBlocks.pop()
}

exports.extractStats = async (req, res, next) => {

    const token = req.headers.authorization || req.query.api_key
    let userData = {}

    if (token)
        userData = jwt.decode(token) //id, email, fullName, role

    let url = req.originalUrl
    let accessInformation = { url: url, email: userData.user.email || "", accessDate: Date.now() }
    savedStats.push(accessInformation);

    if (Date.now() - lastTimer >= msDifference) {
        // REALIZAR O DUMP DAS STATS
        Stats.insertMany(savedStats)
        console.log("A enviar estatisticas para a BD")
        savedStats = []
    }

    lastTimer = Date.now()
    next()
}
