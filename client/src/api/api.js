import axios from 'axios';
//import { host } from '../common/common';

const host = process.env.BACKEND;

const fetchStats = async () => {
    console.log(host)
    const data = await axios.get(`${host}/stats`)
    console.log(data.data)
}

const quantityOfAccessPerUrl = async (quantity) => {
    console.log(host)
    try {
        const data = await axios.get(`${host}/stats/quantityOfAccessPerUrl/${quantity}`)
        return data
    } catch (error) {
        return error
    }
}

const quantityOfAccessPerUser = async (quantity) => {
    console.log(host)
    try {
        const data = await axios.get(`${host}/stats/quantityOfAccessPerUser/${quantity}`)
        return data
    } catch (error) {
        return error
    }
}

const dailyAccess = async (quantity) => {
    console.log(host)
    try {
        const data = await axios.get(`${host}/stats/dailyAccess/${quantity}`)
        return data
    } catch (error) {
        return error
    }
}



export {
    fetchStats,
    quantityOfAccessPerUrl,
    quantityOfAccessPerUser,
    dailyAccess
}
