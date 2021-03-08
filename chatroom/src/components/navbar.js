import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {
    constructor(props) {
        super(props);

        this.state = {currentUserID: ''};
    }


    componentDidMount() {
        const currentUserID = localStorage.getItem('currentUserID');
        this.setState({ currentUserID: currentUserID});
      }

    render() {
        return (
                <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <Link to="/" className="navbar-brand">Chat.io</Link>
                <div className="collapse navbar-collapse">
                <ul className="navbar-nav mr-auto">
                    <li className="navbar-item">
                        <Link to="/users" className="nav-link">View Users</Link>
                    </li>
                    <li className="navbar-item">
                        <Link to={`/${this.state.currentUserID}`} className="nav-link">My Profile</Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/" className="nav-link">My Messages</Link>
                    </li>
                </ul>
                </div>
                </nav>
        );
    }
};