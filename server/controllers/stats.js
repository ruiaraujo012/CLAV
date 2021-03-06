const Stat = require('../models/stats')

const Stats = module.exports

// Quantidade de acessos por utilizador por dia / mes
// Quantidade de acessos por url
// Tempo do pedido

Stats.dailyAccess = async (quantPreviousDates) => {

	// j_id, url, email, accessDate
	const data = await this.export()

	let dates = {}
	data.forEach(obj => {

		const currDate = new Date(obj.accessDate)
		dates[currDate.toDateString()]
		if (dates[currDate.toDateString()]) {
			dates[currDate.toDateString()].quantity += 1
		} else {
			dates[currDate.toDateString()] = { quantity: 1 }
		}
	})

	return Object.keys(dates).map(i => {
		return {
			date: i,
			quantity: dates[i].quantity
		}
	})
}

Stats.quantityOfAccessPerUser = async (numberOfUsers) => {
	// j_id, url, email, accessDate
	const data = await this.export()

	let users = {}
	data.forEach(obj => {
		const currUser = obj.email
		if (users[currUser]) {
			users[currUser].quantity += 1
		} else {
			users[currUser] = { quantity: 1 }
		}
	})

	return Object.keys(users).map(u => {
		return {
			user: u,
			quantity: users[u].quantity
		}
	})

}

Stats.quantityOfAcessPerUrl = async (numberOfUrls) => {

	//url: "/classes/c100?format=xml", urlBlocks: Array(2), queriesString: Array(1), email: "", accessDate: "2019-04-27T14:38:51.540Z"
	let data = await this.fetchDatabaseAndExtract()

	let urls = {}
	for (let n of data) {
		if (n.url) {
			if (urls[n.url]) {
				urls[n.url].quantity += 1
				urls[n.url].accessDates.push(n.accessDate)
			} else {
				urls[n.url] = { quantity: 1, accessDates: [n.accessDate] }
			}
		}
	}

	return Object.entries(urls).sort((a, b) => b[1].quantity - a[1].quantity).slice(0, numberOfUrls)
}

Stats.fetchDatabaseAndExtract = async () => {
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
