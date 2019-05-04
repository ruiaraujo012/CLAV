import React, { Component } from 'react';
import axios from 'axios';
import { host } from '../../common/common';
import Loading from '../Loading/Loading';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

import '../../../node_modules/react-table/react-table.css';
import '../../common/react-table.css';
import './DailyStats.css';

/*

Documentacao Recharts: http://recharts.org/en-US/examples/SimpleLineChart

*/

class DailyStats extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            quantity: 10,
            data: []
        }
    }


    async componentDidMount() {

        try {
            let data = await axios.get(`${host}/stats/dailyAccess/${this.state.quantity}`)
            console.log("HELLO")
            console.log(data.data)
            this.setState({ loading: false, data: data.data })
        } catch (error) {
            this.setState({ loading: true })
            console.error(error)
        }

    }

    render() {

        const { data, loading } = this.state;


        if (loading)
            return (
                <Loading loading={this.state.loading} />
            );

        return (

            <div>
                <h4>Quantidade de acessos total diário</h4>

                <div className="chart">
                    <LineChart
                        width={768}
                        height={300}
                        data={data}
                        margin={{
                            top: 5, right: 30, left: 20, bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="quantity" stroke="#8884d8" activeDot={{ r: 6 }} />
                        {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
                    </LineChart>
                </div>
            </div>

        );
    }
}

export default DailyStats;