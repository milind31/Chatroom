import React, { Component } from 'react';
import axios from 'axios';
import Navbar from './navbar';
import { Link } from 'react-router-dom';

const Message = props => (
  <div className='message'>
    <h3>{props.message.user_from}</h3>
    <p>{props.message.message}</p>
    <div className="msg-link"><Link to={`/messages/view/conversation/${props.message.user_from_id}`} style={{ textDecoration: 'none' }}>View Full Conversation</Link></div>
  </div>
)

export default class ViewMessages extends Component {
  constructor(props) {
    super(props);

    this.state = {current_user: '', other_user: '', outgoing_messages: [], incoming_messages: [], loading: true};
  }

  componentDidMount() {
    //find current user
    const currentUserID = localStorage.getItem('currentUserID');
    axios.get('http://localhost:5000/users/'+currentUserID)
        .then(response => {
          this.setState({
            current_user: response.data.username
        })
      //get messages
      axios.get('http://localhost:5000/messages/userto/'+this.state.current_user)
        .then(response => {
          this.setState({ incoming_messages: response.data, loading: false })
        })
        .catch((error) => {
          console.log(error);
        })
      })
      .catch(() => {
        window.location = "/messages/view/conversation/notfound";
      })

  }

  incomingMessageList() {
    return this.state.incoming_messages.reverse().map(currentmessage => {
      return <Message message={currentmessage} key={currentmessage._id}/>;
    })
  }

  render() {
    return (
    <div>
    <Navbar/>
    <br/>
      <div className="message-log">
          {this.state.loading && <div>Loading...</div> }
          {!this.state.loading && <h1>Recent Messages:</h1> }
          <div className="recent-msgs">
            { !this.state.loading && this.incomingMessageList() }
          </div>
      </div>
    </div>
    )
  }
}