import React, { Component } from 'react';
import axios from 'axios';
import { host } from '../../common/common';
import Loading from '../Loading/Loading';
import ContentHeader from '../ContentHeader/ContentHeader';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import { dailyAccess } from '../../api/api';

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
            const data = await dailyAccess(this.state.quantity);
            this.setState({ loading: false, data: data.data })
        } catch (error) {
            this.setState({ loading: true })
            console.error(error)
        }

    }

    teste = () => {
        console.log("TESTE")
    }

    render() {

        const { data, loading } = this.state;

        if (loading)
            return (
                <Loading loading={this.state.loading} />
            );

        return (

            <div>
                <ContentHeader header="Quantidade total de acessos diários"
                    description="Gráfico que reúne a quantidade total de acessos realizados por dia. Clicando num determinado dia
                    poderá obter um resumo de informação relativamente aos pedidos que dizem respeito a esse dia e por quem foram realizados." />
                <div className="chart">
                    <ResponsiveContainer width="100%" height={400}>
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
                            <Line type="monotone" dataKey="quantity" stroke="#8884d8" activeDot={{ r: 6 }} onClick={this.teste} />
                            {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

        );
    }
}

export default DailyStats;