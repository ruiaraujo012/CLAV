import axios from 'axios';
import { host } from '../../common/common';
import React, { Component } from 'react';

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

        const { urls } = this.state;

        return (
            <div>
                {this.state.urls.map((u, i) =>
                    <p key={i}>
                        Url: {u[0]} - Hits: {u[1].quantity}
                    </p>
                )}


            </div>

        );
    }
}

export default StatsRotas;