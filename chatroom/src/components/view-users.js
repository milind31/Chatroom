import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from './navbar';

const User = props => (
  <tr>
    <td>{props.user.username}</td>
    <td>{props.user.occupation}</td>
    <td>{props.user.city}</td>
    <td>{props.user.state}</td>
    <td>{props.user.country}</td>
    <td>{props.user.favorite_music_genre}</td>
    <td>{props.user.likes_sports? "Yes":"No"}</td>
    <td>{props.user.likes_to_travel? "Yes":"No"}</td>
    <td>
      <Link to={"/users/"+props.user._id}>View</Link>
    </td>
  </tr>
)

export default class UsersList extends Component {
  constructor(props) {
    super(props);

    this.state = {users: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/users/')
      .then(response => {
        this.setState({ users: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  usersList() {
    return this.state.users.map(currentuser => {
      return <User user={currentuser} key={currentuser._id}/>;
    })
  }

  render() {
    return (
      <div>
        <Navbar/>
        <br/>
        <h3>Users</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Occupation</th>
              <th>City</th>
              <th>State</th>
              <th>Country</th>
              <th>Favorite Music Genre</th>
              <th>Likes Sports</th>
              <th>Likes to Travel</th>
            </tr>
          </thead>
          <tbody>
            { this.usersList() }
          </tbody>
        </table>
      </div>
    )
  }
}