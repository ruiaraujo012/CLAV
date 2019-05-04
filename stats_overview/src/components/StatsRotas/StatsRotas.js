import React, { Component } from 'react';
import axios from 'axios';
import { host } from '../../common/common';
import Loading from '../Loading/Loading';
import ReactTable from 'react-table';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

import '../../../node_modules/react-table/react-table.css';
import '../../common/react-table.css';

class StatsRotas extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            quantityOfUrls: 15,
            urls: []
        }
    }


    async componentDidMount() {

        try {
            let topRotas = await axios.get(`${host}/stats/quantityOfAccessPerUrl/${this.state.quantityOfUrls}`)
            this.setState({ loading: false, urls: topRotas.data })
            console.log(topRotas.data)
        } catch (error) {
            this.setState({ loading: true })
            console.error(error)
        }

    }

    render() {

        const { urls, loading } = this.state;

        if (loading)
            return (
                <Loading loading={this.state.loading} />
            );

        return (

            <div>
                <h4>Quantidade de acessos por rota</h4>

                <ReactTable
                    noDataText="There is no one on the leaderboard"
                    data={this.state.urls}
                    columns={[
                        {
                            Header: "Url",
                            id: "url",
                            accessor: u => u[0]
                        },
                        {
                            Header: "#Access",
                            id: "access",
                            accessor: u => u[1].quantity
                        }
                    ]}
                    defaultPageSize={10}
                    pageSize={10}
                    style={{
                    }}
                    showPagination={true}
                    className="-highlight"
                />

            </div>

        );
    }
}

export default StatsRotas;