import React, { Component } from 'react';
import axios from 'axios';
import Navbar from './navbar';

const Message = props => (
  <div className='message'>
    <h3>{props.message.user_from}</h3>
    <body>
        <p>{props.message.message}</p>
        <small>{"sent on " + props.message.createdAt.replace('T', ' at ').slice(0, -5)}</small>
    </body>
  </div>
)

export default class ViewConversation extends Component {
  constructor(props) {
    super(props);

    this.state = {current_user: '', other_user: '', messages: []};
  }

  componentDidMount() {
    //find current user and add messages
    const currentUserID = localStorage.getItem('currentUserID');
    axios.get('http://localhost:5000/users/'+currentUserID)
      .then(response => {
          this.setState({
            current_user: response.data.username
      })
      axios.get('http://localhost:5000/messages/userto/'+this.state.current_user)
        .then(response => {
          this.setState({ messages: response.data })
      })
        .catch((error) => {
          console.log(error);
      })

      //find other user and add messages
      axios.get('http://localhost:5000/users/'+this.props.match.params.id)
      .then(response => {
      this.setState({
          other_user: response.data.username
      })
      axios.get('http://localhost:5000/messages/userto/'+this.state.other_user)
      .then(response => {
        this.setState({ messages: this.state.messages.concat(response.data) })
      })
      .catch((error) => {
        console.log(error);
      })
    })
  })
  }

  sortedMessages(){
      return this.state.messages.sort(function(a,b){
        return new Date(a.createdAt) - new Date(b.createdAt);
      });
  }

  messageList() {
    return this.sortedMessages().map(currentmessage => {
      return <Message message={currentmessage} key={currentmessage._id}/>;
    })
  }

  render() {
    return (
    <div>
    <Navbar/>
    <br/>
    <div className="messageLog">
          <h1>Conversation with {this.state.other_user}:</h1>
          <body>
            { this.messageList() }
          </body>
      </div>
    </div>
    )
  }
}