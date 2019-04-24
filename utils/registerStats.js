exports.extractStats = (req, res, next) => {

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

    urlBlocks[urlBlocks.length - 1] = urlBlocks[urlBlocks.length - 1].split("?")[0]
    console.log("Information about url")
    console.log(url)
    console.log(urlBlocks)
    console.log(queriesString)
    console.log(queryStringValues)
    console.log("\n\n\n\n\n")
    next()

}
