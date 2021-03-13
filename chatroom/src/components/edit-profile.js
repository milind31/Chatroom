import React, { Component } from 'react';
import axios from 'axios';
import Navbar from './navbar';

export default class EditProfile extends Component {
    constructor(props) {
        super(props);

        this.onChangeOccupation = this.onChangeOccupation.bind(this);
        this.onChangeCity = this.onChangeCity.bind(this);
        this.onChangeState = this.onChangeState.bind(this);
        this.onChangeFavoriteMusicGenre = this.onChangeFavoriteMusicGenre.bind(this);
        this.onChangeLikesSports = this.onChangeLikesSports.bind(this);
        this.onChangeLikesToTravel = this.onChangeLikesToTravel.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            occupation: '',
            city: '',
            state: '',
            favorite_music_genre: '',
            likes_sports: '',
            likes_to_travel: ''
        }
    }

    componentDidMount() {
        const currentUserID = localStorage.getItem('currentUserID');
        axios.get('http://localhost:5000/users/'+currentUserID)
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
        console.log(this.state);
    }

    onChangeOccupation(e) {
        this.setState({
            occupation: e.target.value
        });
    }

    onChangeCity(e) {
        this.setState({
            city: e.target.value
        });
    }

    onChangeState(e) {
        this.setState({
            state: e.target.value
        });
    }

    onChangeLikesToTravel(e) {
        this.setState({
            likes_to_travel: e.target.value
        });
    }

    onChangeLikesSports(e) {
        this.setState({
            likes_sports: e.target.value
        });
    }

    onChangeFavoriteMusicGenre(e) {
        this.setState({
            favorite_music_genre: e.target.value
        });
    }
    

    onSubmit(e) {
        e.preventDefault();
        const user = {
            username: this.state.username,
            occupation: this.state.occupation,
            city: this.state.city,
            state: this.state.state,
            favorite_music_genre: this.state.favorite_music_genre,
            likes_sports: this.state.likes_sports,
            likes_to_travel: this.state.likes_to_travel
        }

        axios.post('http://localhost:5000/users/update/'+this.props.match.params.id, user)
            .then(res => console.log(res.data));

        window.location = '/users/';
    }

    render() {
        return (
        <div>
            <Navbar/>
            <br/>
            <h3>Edit User Info</h3>
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label>Occupation: </label>
                    <input type="text"
                        className="form-control"
                        value={this.state.occupation}
                        onChange={this.onChangeOccupation}
                        />
                </div>
                <div className="form-group">
                    <label>City: </label>
                    <input type="text"
                        className="form-control"
                        value={this.state.city}
                        onChange={this.onChangeCity}
                        />
                </div>
                <div className="form-group">
                    <label>State:</label>
                    <select ref="userInput"
                        className="form-control"
                        value={this.state.state}
                        onChange={this.onChangeState}
                    >
                        <option value="AL">Alabama</option>
                        <option value="AK">Alaska</option>
                        <option value="AZ">Arizona</option>
                        <option value="AR">Arkansas</option>
                        <option value="CA">California</option>
                        <option value="CO">Colorado</option>
                        <option value="CT">Connecticut</option>
                        <option value="DE">Delaware</option>
                        <option value="DC">District of Columbia</option>
                        <option value="FL">Florida</option>
                        <option value="GA">Georgia</option>
                        <option value="HI">Hawaii</option>
                        <option value="ID">Idaho</option>
                        <option value="IL">Illinois</option>
                        <option value="IN">Indiana</option>
                        <option value="IA">Iowa</option>
                        <option value="KS">Kansas</option>
                        <option value="KY">Kentucky</option>
                        <option value="LA">Louisiana</option>
                        <option value="ME">Maine</option>
                        <option value="MD">Maryland</option>
                        <option value="MA">Massachusetts</option>
                        <option value="MI">Michigan</option>
                        <option value="MN">Minnesota</option>
                        <option value="MS">Mississippi</option>
                        <option value="MO">Missouri</option>
                        <option value="MT">Montana</option>
                        <option value="NE">Nebraska</option>
                        <option value="NV">Nevada</option>
                        <option value="NH">New Hampshire</option>
                        <option value="NJ">New Jersey</option>
                        <option value="NM">New Mexico</option>
                        <option value="NY">New York</option>
                        <option value="NC">North Carolina</option>
                        <option value="ND">North Dakota</option>
                        <option value="OH">Ohio</option>
                        <option value="OK">Oklahoma</option>
                        <option value="OR">Oregon</option>
                        <option value="PA">Pennsylvania</option>
                        <option value="RI">Rhode Island</option>
                        <option value="SC">South Carolina</option>
                        <option value="SD">South Dakota</option>
                        <option value="TN">Tennessee</option>
                        <option value="TX">Texas</option>
                        <option value="UT">Utah</option>
                        <option value="VT">Vermont</option>
                        <option value="VA">Virginia</option>
                        <option value="WA">Washington</option>
                        <option value="WV">West Virginia</option>
                        <option value="WI">Wisconsin</option>
                        <option value="WY">Wyoming</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Favorite Music Genre:</label>
                    <select ref="userInput"
                        className="form-control"
                        value={this.state.favorite_music_genre}
                        onChange={this.onChangeFavoriteMusicGenre}
                    >
                        <option value="Rap">Rap</option>
                        <option value="Country">Country</option>
                        <option value="Rock">Rock</option>
                        <option value="Metal">Metal</option>
                        <option value="Jazz">Jazz</option>
                        <option value="Classic">Classic</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Do You Like To Travel?:</label>
                    <select ref="userInput"
                        className="form-control"
                        value={this.state.likes_to_travel}
                        onChange={this.onChangeLikesToTravel}
                    >
                        <option value={true}>Yes</option>
                        <option value={false}>No</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Do You Like Sports:</label>
                    <select ref="userInput"
                        className="form-control"
                        value={this.state.likes_sports}
                        onChange={this.onChangeLikesSports}
                    >
                        <option value={true}>Yes</option>
                        <option value={false}>No</option>
                    </select>
                </div>
                <div className="form-group">
                    <input type="submit" value="Edit User Info" className="btn btn-primary"></input>
                </div>
            </form>
        </div>
        )
    }
 }