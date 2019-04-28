const Stat = require('../models/stats')

const Stats = module.exports

// Quantidade de acessos por utilizador por dia / mes
// Quantidade de acessos por url
// 

Stats.processFromDb = async () => {

    // _id, url, email, accessDate
    let statsFromDb = await this.export();
    console.log(statsFromDb)

    let data = []
    for (stat in statsFromDb) {
        let info = this.extractInformationFromUrl(statsFromDb[stat])
        console.log(info)
        data.push(info)
    }

}

Stats.extractInformationFromUrl = (info) => {

    let url = info.url

    let urlBlocks = url.split("/")
    urlBlocks.shift()

    let queriesString = []
    if (urlBlocks.length > 0) {
        queriesString = urlBlocks[urlBlocks.length - 1].split(/[?&]/)
        queriesString.shift()
    }

    let queryStringValues = []
    queriesString.map(q => {
        let qq = q.split("=")
        queryStringValues.push({ [qq[0]]: qq[1] })
    })

    let blocksLength = urlBlocks.length - 1

    if (blocksLength > 0) {
        urlBlocks[blocksLength] = urlBlocks[blocksLength].split("?")[0]
        if (urlBlocks[blocksLength] == "")
            urlBlocks.pop()
    }

    return {
        url: info.url,
        urlBlocks,
        queriesString,
        email: info.email,
        accessDate: info.accessDate
    }
}

Stats.listByUsername = username => {
    return Stat
        .findOne({
            username: username
        })
        .exec()
}

Stats.insertMany = listStats => {
    return Stat.insertMany(listStats)
}

Stats.insert = stat => {
    return Stat.create(stat)
}

Stats.export = () => {
    return Stat
        .find()
        .exec()
}
