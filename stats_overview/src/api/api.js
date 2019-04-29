import axios from 'axios';
import { host } from '../common/common';

const fetchStats = async () => {
    let data = await axios.get(`${host}/stats`)
    console.log(data.data)
}

export { fetchStats }