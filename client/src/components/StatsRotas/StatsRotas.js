import React, { Component } from 'react';
import axios from 'axios';
import { host } from '../../common/common';
import Loading from '../Loading/Loading';
import ContentHeader from '../ContentHeader/ContentHeader';
import Table from '../Table/Table';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

import { quantityOfAccessPerUrl } from '../../api/api';


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
            let data = await quantityOfAccessPerUrl(this.state.quantityOfUrls)
            this.setState({ loading: false, urls: data.data })
        } catch (error) {
            this.setState({ loading: true })
            console.error(error)
        }

    }

    render() {

        const { urls, loading } = this.state;

        if (loading)
            return (
                <Loading loading={loading} />
            );

        const columns = [
            {
                Header: "Url",
                id: "url",
                accessor: u => u[0]
            },
            {
                Header: "#Acessos",
                id: "access",
                accessor: u => u[1].quantity
            }
        ]

        return (

            <div>
                <ContentHeader header="Quantidade de acessos por rota" />
                <Table data={urls} columns={columns} />
            </div>

        );
    }
}

export default StatsRotas;