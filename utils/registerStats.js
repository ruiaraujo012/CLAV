const Stats = require("../controllers/stats")

const msDifference = 3*1000;
let lastTimer = Date.now();

exports.extractStats = async (req, res, next) => {

    await Stats.insert({url : "www.google.com", username: "Uminho", accessDate: Date.now()})
    
    let data = await Stats.listByUsername("Uminho")
    console.log("DADOS DA BD")
    console.log(data)

    let url = req.originalUrl

    let urlBlocks = url.split("/")
    urlBlocks.shift()

    let queriesString = urlBlocks[urlBlocks.length - 1].split(/[?&]/)
    queriesString.shift()

    let queryStringValues = [] 
    queriesString.map(q => {
        let qq = q.split("=") 
        queryStringValues.push({[qq[0]] :qq[1]})   
    })

    let blocksLength = urlBlocks.length - 1
    urlBlocks[blocksLength] = urlBlocks[blocksLength].split("?")[0]

    if(urlBlocks[blocksLength] == "")
        urlBlocks.pop()

    // TODO: Fazer a extracao do bearer token


    if(Date.now() - lastTimer >= msDifference) {
        // REALIZAR O DUMP DAS STATS
        console.log("PASSOU DO TEMPO")
    }


    lastTimer = Date.now() 
    console.log("Information about url")
    console.log(url)
    console.log(urlBlocks)
    console.log(queryStringValues)
    console.log("\n\n\n")

    next()

}
