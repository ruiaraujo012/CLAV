import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import logo from './logo.svg';
import './App.css';

// Components
import Navbar from './components/Navbar/Navbar';
import Overview from './components/Overview/Overview';
import Dashboard from './components/Dashboard/Dashboard';
import StatsRotas from './components/StatsRotas/StatsRotas';

function App() {
    return (
        <div>
            {/* TODO: Add navbar */}
            <Router>
                <Navbar />
                <div className="container mt-4">
                    <Switch>
                        <Route exact path="/stats_rotas" component={StatsRotas} />
                        <Route exact path="/stats_utilizadores" component={Overview} />
                        <Route path="/" component={Dashboard} />
                    </Switch>
                </div>
            </Router>
        </div >
    );
}

export default App;
