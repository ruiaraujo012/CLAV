import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
                            <li className="nav-item active">
                                <Link to="/daily_stats">
                                    <span className="nav-link" href="#">Acessos Diários</span>
                                </Link>
                            </li>
                            <li className="nav-item active">
                                <Link to="/stats_rotas">
                                    <span className="nav-link" href="#">Rotas</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/stats_utilizadores">
                                    <span className="nav-link" href="#">Utilizadores</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/stats_utilizadores">
                                    <span className="nav-link" href="#">Stuff</span>
                                </Link>
                            </li>
                        </ul>

                    </div>

                </div>
            </nav>
        );
    }
}

export default Navbar;