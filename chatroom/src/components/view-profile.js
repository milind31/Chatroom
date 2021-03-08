import React, { Component } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Navbar from './navbar';

export default class ViewProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            occupation: '',
            city: '',
            state: '',
            country: '',
            favorite_music_genre: '',
            likes_sports:'',
            likes_to_travel:''
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/users/'+this.props.match.params.id)
        .then(response => {
            this.setState({
                username: response.data.username,
                occupation: response.data.occupation,
                city: response.data.city,
                state: response.data.state,
                country: response.data.country,
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
            <h2>Location: {this.state.city}, {this.state.state}, {this.state.country}</h2>
            <h2>Favorite Music Genre: {this.state.favorite_music_genre}</h2>
            <h2>Likes Sports?: {this.state.likes_sports? "Yes":"No"}</h2>
            <h2>Likes To Travel?: {this.state.likes_to_travel? "Yes":"No"}</h2>
            <Button>Message</Button>
        </div>
        )
    }
 }