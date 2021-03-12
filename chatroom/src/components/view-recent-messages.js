import React, { Component } from 'react';
import axios from 'axios';
import Navbar from './navbar';
import { Link } from 'react-router-dom';

const Message = props => (
  <div className='message'>
    <h3>{props.message.user_from}</h3>
    <p>{props.message.message}</p>
    <Link to={`/messages/view/conversation/${props.message.user_from_id}`}>View Full Conversation</Link>
  </div>
)

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
      //get messages
      axios.get('http://localhost:5000/messages/userto/'+this.state.current_user)
        .then(response => {
          this.setState({ incoming_messages: response.data })
      })
        .catch((error) => {
          console.log(error);
      })
    })

    //find other user
    axios.get('http://localhost:5000/users/'+this.props.match.params.id)
      .then(response => {
        this.setState({
            other_user: response.data.username
      })
      axios.get('http://localhost:5000/messages/userto/'+this.state.other_user)
      .then(response => {
        this.setState({ outgoing_messages: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
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
      <div className="messageLog">
          <h1>Recent Messages:</h1>
          <body>
            { this.incomingMessageList() }
          </body>
      </div>
    </div>
    )
  }
}