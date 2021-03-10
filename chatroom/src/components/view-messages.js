import React, { Component } from 'react';
import axios from 'axios';
import Navbar from './navbar';
import ViewProfile from './view-profile';
import { Link } from 'react-router-dom';

export default class ViewMessages extends Component {
  constructor(props) {
    super(props);

    this.state = {current_user: '', other_user: '', outgoing_messages: [], incoming_messages: []};
  }

  componentDidMount() {
    //find current user
    const currentUserID = localStorage.getItem('currentUserID');
    axios.get('http://localhost:5000/users/'+currentUserID)
      .then(response => {
        this.setState({
            current_user: response.data.username
      })
    })

    //find other user
    axios.get('http://localhost:5000/users/'+this.props.match.params.id)
      .then(response => {
        this.setState({
            other_user: response.data.username
      })
    })

    //get messages
    axios.get('http://localhost:5000/messages/userfrom/'+this.state.current_user)
      .then(response => {
        this.setState({ outgoing_messages: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
    axios.get('http://localhost:5000/messages/userfrom/'+this.state.other_user)
      .then(response => {
        this.setState({ incoming_messages: response.data })
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
    <div className="blog-list">
        <h2>{ title }</h2>
        { blogs.map((blog) => (
            <div className="blog-preview" key={blog.id}>
                <Link to={`/blogs/${blog.id}`}>
                    <h2>{ blog.title }</h2>
                    <p>Written by { blog.author }</p>
                </Link>
            </div>
        ))}
    </div>
    )
  }
}