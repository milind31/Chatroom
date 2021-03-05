import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

    render() {
        return (
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <Link to="/" className="navbar-brand">Chat.io</Link>
                <div className="collapse navbar-collapse">
                <ul className="navbar-nav mr-auto">
                    <li className="navbar-item">
                        <Link to="/user" className="nav-link">Home</Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/" className="nav-link">My Profile</Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/create" className="nav-link">My Messages</Link>
                    </li>
                </ul>
                </div>
            </nav>
        );
    }
};