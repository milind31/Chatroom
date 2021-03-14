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
            currentUserID: '',
            loading: true
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
                likes_to_travel: response.data.likes_to_travel,
                loading: false
            })
        })
        .catch(() => {
            window.location = "/users/notfound";
        })
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.id !== prevProps.match.params.id) {
            const currentUserID = localStorage.getItem('currentUserID');
            this.setState({ currentUserID: currentUserID, loading: true });
            axios.get('http://localhost:5000/users/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    username: response.data.username,
                    occupation: response.data.occupation,
                    city: response.data.city,
                    state: response.data.state,
                    favorite_music_genre: response.data.favorite_music_genre,
                    likes_sports: response.data.likes_sports,
                    likes_to_travel: response.data.likes_to_travel,
                    loading: false
                })
            })
            .catch(() => {
                window.location = "/users/notfound";
            })
        }
      }

    render() {
        return (
        <div>
            <Navbar/>
            <br/>
            <div className="userInfo">
            {this.state.loading && <h1>Loading...</h1>}
            <h1 className="usernameHeader">{!this.state.loading && this.state.username}</h1>
                <h3>Occupation: {this.state.occupation}</h3>
                <h3>Location: {this.state.city}, {this.state.state}</h3>
                <h3>Favorite Music Genre: {this.state.favorite_music_genre}</h3>
                <h3>Likes Sports?: {this.state.likes_sports? "Yes":"No"}</h3>
                <h3>Likes To Travel?: {this.state.likes_to_travel? "Yes":"No"}</h3>
                    <div className='edit'>{ this.props.match.params.id === this.state.currentUserID && <Button href={"/users/edit/" + this.props.match.params.id} render={() => <EditProfile/>}>Edit</Button> }</div>
                    <div className='message'>{ !(this.props.match.params.id === this.state.currentUserID) && <Button href={"/message/" + this.props.match.params.id} render={() => <SendMessage/>}>Message</Button>}</div>
                    <div className='view-conversation'></div>{ !(this.props.match.params.id === this.state.currentUserID) && <Button className='view-conversation' href={"/messages/view/conversation/" + this.props.match.params.id} render={() => <SendMessage/>}>See Conversation</Button> }</div>
        </div>
        )
    }
 }