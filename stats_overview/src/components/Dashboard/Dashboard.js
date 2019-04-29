import React, { Component } from 'react';
import { fetchStats } from '../../api/api';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        fetchStats();
    }

    render() {
        return (
            <div>
                <h2>ii</h2>
            </div>
        );
    }
}

export default Dashboard;