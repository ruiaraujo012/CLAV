import React, { Component } from 'react';
import { fetchStats } from '../../api/api';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        let data = fetchStats();
        console.log(data)
    }

    render() {
        return (
            <div>
                <h2>Dashboard</h2>
            </div>
        );
    }
}

export default Dashboard;