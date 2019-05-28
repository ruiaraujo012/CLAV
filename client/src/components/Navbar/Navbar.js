import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css'

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <nav className="navbar navbar-expand-md bg-faded">
                <div className="container">

                    <a className="navbar-brand" href="#">CLAV</a>
                    <div className="collapse navbar-collapse " id="navbarText">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <NavLink to="/daily_stats" activeClassName="active">
                                    <span className="nav-link">Acessos Diários</span>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/stats_rotas" activeClassName="active">
                                    <span className="nav-link">Rotas</span>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/stats_utilizadores" activeClassName="active">
                                    <span className="nav-link">Utilizadores</span>
                                </NavLink>
                            </li>
                        </ul>

                    </div>

                </div>
            </nav>
        );
    }
}

export default Navbar;