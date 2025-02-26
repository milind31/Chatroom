import React, { Component } from 'react';
import axios from 'axios';

export default class SelectUser extends Component{
    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {username: '', userID: '', users: []};
    }

    componentDidMount() {
        axios.get('http://localhost:5000/users/')
            .then(response => {
                if (response.data.length > 0){
                    this.setState({
                        users: response.data.map(user => user),
                        username: response.data[0].username,
                        userID: response.data[0]._id,
                    })
                }
            })
    }

    onChangeUsername(e) {
        this.setState({
            userID: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();
        window.location = '/users';
        localStorage.setItem('currentUserID', this.state.userID);
    }

    render() {
        return (
            <div className="select-user">
                <h1>Welcome!</h1>
                <h2>Please select your username to begin!</h2>
                <form onSubmit={this.onSubmit.bind(this)}>
                    <div className="form-group">
                        <select ref="userInput"
                            required
                            className="form-control"
                            value={this.state.user}
                            onChange={this.onChangeUsername}>
                            {
                                this.state.users.map(function(user) {
                                    return <option
                                        value={user._id}>{user.username}
                                        </option>;
                                })
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Select User" className="btn btn-primary"></input>
                    </div>
                </form>
                <a href="/users/create">Create New User</a>
            </div>
        )
    }
 }
