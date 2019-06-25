import axios from 'axios'
//import { host } from '../common/common';
const host = 'http://localhost:8000'

const fetchStats = async () => {
	console.log('HOST', host)
	const data = await axios.get(`${host}/stats`)
	console.log(data.data)
}

const quantityOfAccessPerUrl = async (quantity) => {
	try {
		const data = await axios.get(`${host}/stats/quantityOfAccessPerUrl/${quantity}`)
		return data
	} catch (error) {
		return error
	}
}

const quantityOfAccessPerUser = async (quantity) => {
	try {
		const data = await axios.get(`${host}/stats/quantityOfAccessPerUser/${quantity}`)
		return data
	} catch (error) {
		return error
	}
}

const dailyAccess = async (quantity) => {
	try {
		const data = await axios.get(`${host}/stats/dailyAccess/${quantity}`)
		return data
	} catch (error) {
		return error
	}
}

export { fetchStats, quantityOfAccessPerUrl, quantityOfAccessPerUser, dailyAccess }
