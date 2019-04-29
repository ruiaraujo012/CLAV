import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import logo from './logo.svg';
import './App.css';

// Components
import Overview from './components/Overview/Overview';
import Dashboard from './components/Dashboard/Dashboard';

function App() {
    return (
        <div>
            {/* TODO: Add navbar */}
            <Router>
                <Switch>
                    <Route exact path="/dashboard" component={Dashboard} />
                    <Route exact path="/overview" component={Overview} />
                    <Route path="/" component={Dashboard} />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
