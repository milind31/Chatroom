import React, { Component } from 'react';
import axios from 'axios';
import Navbar from './navbar';

export default class SendMessage extends Component {
    constructor(props) {
        super(props);

        this.onChangeMessageBody = this.onChangeMessageBody.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            message_body:'',
            user_to:'',
            user_to_id:'',
            user_from:'',
            user_from_id:''
        }
    }

    componentDidMount() {
        const currentUserID = localStorage.getItem('currentUserID');
        axios.get('http://localhost:5000/users/'+currentUserID)
        .then(response => {
            this.setState({
                user_from: response.data.username,
                user_from_id: currentUserID

            })
        })
        axios.get('http://localhost:5000/users/'+this.props.match.params.id)
        .then(response => {
            this.setState({
                user_to: response.data.username,
                user_to_id: this.props.match.params.id
            })
        })
    }

    onChangeMessageBody(e)  {
        this.setState({
            message_body: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const message = {
            user_from: this.state.user_from,
            user_from_id: this.state.user_from_id,
            user_to: this.state.user_to,
            user_to_id:this.state.user_to_id,
            message: this.state.message_body
        }

        axios.post('http://localhost:5000/messages/add', message)
            .then(res => console.log(res.data));

        window.location = "/messages/view/conversation/" + this.props.match.params.id;
    }

    render() {
        return (
        <div>
            <Navbar/><br/>
            <h3>Enter Message</h3>
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label>Enter Message: </label>
                    <textarea type="text"
                        required
                        className="form-control"
                        value={this.state.message_body}
                        onChange={this.onChangeMessageBody}
                        />
                </div>
                <div className="form-group">
                    <input type="submit" value="Send" className="btn btn-primary"></input>
                </div>
            </form>
        </div>
        )
    }
 }