import React, { Component } from 'react';
import { quantityOfAccessPerUser } from '../../api/api';

import Loading from '../Loading/Loading';
import Table from '../Table/Table';
import ContentHeader from '../ContentHeader/ContentHeader';

class StatsUsers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            quantityOfUsers: 10,
            users: []
        }
    }

    async componentDidMount() {
        try {
            const data = await quantityOfAccessPerUser(10);
            this.setState({ loading: false, users: data.data })
        } catch (error) {
            // TODO : lidar com o erro somehow
            this.setState({ loading: true })
        }
    }

    render() {

        let { users, loading } = this.state;

        if (loading)
            return (
                <Loading loading={true} />
            );

        console.log("Users", users)

        users.map(u => u.user === "undefined" ? u.user = 'Não autenticado' : u.user)

        const columns = [
            {
                Header: "User",
                id: "user",
                accessor: u => u.user
            },
            {
                Header: "#Acessos",
                id: "quantity",
                accessor: u => u.quantity
            }
        ]

        return (
            <div>
                <ContentHeader header="Quantidade de acessos por utilizador" />
                <Table data={users} columns={columns} />
            </div>
        );
    }
}

export default StatsUsers;