import React, { Component } from 'react';
import axios from 'axios';
import Navbar from './navbar';
import ViewProfile from './view-profile';
import { Link } from 'react-router-dom';
import { Form, Row, Col, Card, CardGroup } from 'react-bootstrap';

const User = props => (
  <div className='user-card'>
    <Card
      bg='dark'
      text='white'
      style={{ width: '20rem' }}
    >
      <Card.Body>
        <Card.Text>
          <h1>{props.user.username}</h1>
          <h3>{props.user.city}, {props.user.state}</h3>
          <h4>{props.user.occupation}</h4>
          <p>Favorite Music Genre: {props.user.favorite_music_genre}</p>
          <p>{props.user.likes_sports? "Likes Sports":"Doesn't Like Sports"}</p>
          <p>{props.user.likes_to_travel? "Likes to Travel":"Doesn't Like to Travel"}</p>
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <Link to={"/users/" + props.user._id} className="link" render={() => <ViewProfile/>}>View</Link>
      </Card.Footer>
    </Card>
  </div>
)

export default class UsersList extends Component {
  constructor(props) {
    super(props);

    this.onFilterGenre = this.onFilterGenre.bind(this);
    this.onFilterTravel = this.onFilterTravel.bind(this);
    this.onFilterSports = this.onFilterSports.bind(this);

    this.state = {users: [], loading: true, filter_genre_by: '', filter_travel_by: '', filter_sports_by: ''};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/users/')
      .then(response => {
        this.setState({ users: response.data , loading: false})
      })
      .catch((error) => {
        console.log(error);
      })
  }

  onFilterGenre(e) {
    this.setState({
      filter_genre_by: e.target.value
    });
}

  onFilterTravel(e) {
    this.setState({
      filter_travel_by: e.target.value
    });
  }

  onFilterSports(e) {
    this.setState({
      filter_sports_by: e.target.value
    });
  }

  usersList() {
    let filteredUsers = this.state.users;
    if (this.state.filter_genre_by !== ''){
      filteredUsers = filteredUsers.filter(el => el.favorite_music_genre === this.state.filter_genre_by);
    }
    if (this.state.filter_sports_by !== ''){
      filteredUsers = filteredUsers.filter(el => (el.likes_sports? "Yes":"No") === this.state.filter_sports_by);
    }
    if (this.state.filter_travel_by !== ''){
      filteredUsers = filteredUsers.filter(el => (el.likes_to_travel? "Yes":"No") === this.state.filter_travel_by);
    }
    return filteredUsers.map(currentuser => {
      return <User user={currentuser} key={currentuser._id}/>;
    })
  }

  render() {
    return (
      <div>
        <Navbar/>
        <br/>
        { this.state.loading && <div>Loading...</div> }
        { !this.state.loading && <h1>Users</h1> }
        
        {/*Filter Bar*/}
        { !this.state.loading && (
        <Form>
            <Row>
                <Col>
                    <div className="form-group">
                        <select ref="userInput"
                            className="form-control"
                            value={this.state.filter_genre_by}
                            onChange={this.onFilterGenre}>
                            <option value="">Filter Favorite Music Genre</option>
                            <option value="Rap">Rap</option>
                            <option value="Country">Country</option>
                            <option value="Rock">Rock</option>
                            <option value="Metal">Metal</option>
                            <option value="Jazz">Jazz</option>
                            <option value="Classic">Classic</option>
                        </select>
                    </div>
                </Col>
                <Col>
                    <select ref="userInput"
                        className="form-control"
                        onChange={this.onFilterSports}>
                        <option value="">Filter Likes Sports</option>
                        <option value={"Yes"}>Yes</option>
                        <option value={"No"}>No</option>
                    </select>
                </Col>
                <Col>
                    <select ref="userInput"
                        className="form-control"
                        onChange={this.onFilterTravel}>
                        <option value="">Filter Likes to Travel</option>
                        <option value={"Yes"}>Yes</option>
                        <option value={"No"}>No</option>
                    </select>
                </Col>
            </Row>
        </Form> )}
        <CardGroup className="card-group">
          {!this.state.loading && this.usersList() }
        </CardGroup>
      </div>
    )
  }
}