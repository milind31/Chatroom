import React, { Component } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Navbar from './navbar';
import EditProfile from './edit-profile';
import SendMessage from './send-message';

export default class ViewProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            occupation: '',
            city: '',
            state: '',
            favorite_music_genre: '',
            likes_sports:'',
            likes_to_travel:'',
            currentUserID: ''
        }
    }

    componentDidMount() {
        const currentUserID = localStorage.getItem('currentUserID');
        this.setState({ currentUserID: currentUserID});
        axios.get('http://localhost:5000/users/'+this.props.match.params.id)
        .then(response => {
            this.setState({
                username: response.data.username,
                occupation: response.data.occupation,
                city: response.data.city,
                state: response.data.state,
                favorite_music_genre: response.data.favorite_music_genre,
                likes_sports: response.data.likes_sports,
                likes_to_travel: response.data.likes_to_travel
            })
        })
    }

    render() {
        return (
        <div>
            <Navbar/>
            <br/>
            <h1>{this.state.username}</h1>
            <h2>Occupation: {this.state.occupation}</h2>
            <h2>Location: {this.state.city}, {this.state.state}</h2>
            <h2>Favorite Music Genre: {this.state.favorite_music_genre}</h2>
            <h2>Likes Sports?: {this.state.likes_sports? "Yes":"No"}</h2>
            <h2>Likes To Travel?: {this.state.likes_to_travel? "Yes":"No"}</h2>
            { this.props.match.params.id === this.state.currentUserID && <Button href={"/users/edit/" + this.state.currentUserID} render={() => <EditProfile/>}>Edit</Button> }
            { !(this.props.match.params.id === this.state.currentUserID) && <Button href={"/message/" + this.props.match.params.id} render={() => <SendMessage/>}>Message</Button> }
            { !(this.props.match.params.id === this.state.currentUserID) && <Button href={"/messages/view/conversation/" + this.props.match.params.id} render={() => <SendMessage/>}>See Conversation</Button> }
        </div>
        )
    }
 }