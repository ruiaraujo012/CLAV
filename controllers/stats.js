const Stat = require('../models/stats')

const Stats = module.exports

// Quantidade de acessos por utilizador por dia / mes
// Quantidade de acessos por url
// Tempo do pedido

Stats.processFromDb = async () => {
	// _id, url, email, accessDate
	const statsFromDb = await this.export()

	const data = []

	Object.keys(statsFromDb).forEach((key) => {
		const info = this.extractInformationFromUrl(statsFromDb[key])
		data.push(info)
	})

	return data
}

Stats.extractInformationFromUrl = (info) => {
	const { url } = info

	const urlBlocks = url.split('/')
	urlBlocks.shift()

	let queriesString = []
	if (urlBlocks.length > 0) {
		queriesString = urlBlocks[urlBlocks.length - 1].split(/[?&]/)
		queriesString.shift()
	}

	const queryStringValues = []
	queriesString.map((q) => {
		const qq = q.split('=')
		queryStringValues.push({ [qq[0]]: qq[1] })
	})

	const blocksLength = urlBlocks.length - 1

	if (blocksLength > 0) {
		const urlSplit = urlBlocks[blocksLength].split('?')[0]
		if (urlSplit === '') urlBlocks.pop()
	}

	return {
		url: info.url,
		urlBlocks,
		queriesString,
		email: info.email,
		accessDate: info.accessDate
	}
}

Stats.listByUsername = (username) => {
	return Stat.findOne({
		username
	}).exec()
}

Stats.insertMany = (listStats) => {
	return Stat.insertMany(listStats)
}

Stats.insert = (stat) => {
	return Stat.create(stat)
}

Stats.export = () => {
	return Stat.find().exec()
}
