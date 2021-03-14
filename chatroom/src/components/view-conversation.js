import React, { Component } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Navbar from './navbar';
import SendMessage from './send-message';

const Message = props => (
  <div className='message'>
    <h3>{props.message.user_from}</h3>
    <div>
        <p>{props.message.message}</p>
        <small>{"sent on " + props.message.createdAt.replace('T', ' at ').slice(0, -5)}</small>
    </div>
  </div>
)

export default class ViewConversation extends Component {
  constructor(props) {
    super(props);

    this.state = {current_user: '', other_user: '', messages: [], loading: true};
  }

  componentDidMount() {
    //find current user's username
    const currentUserID = localStorage.getItem('currentUserID');
    axios.get('http://localhost:5000/users/'+currentUserID)
      .then(currentUserResponse => {
          this.setState({
            current_user: currentUserResponse.data.username
      })
      //find other user's username
      axios.get('http://localhost:5000/users/'+this.props.match.params.id)
      .then(otherUserResponse => {
      this.setState({
          other_user: otherUserResponse.data.username
      })

      //get messages to other_user from current_user
      axios.get('http://localhost:5000/messages/'+ this.state.other_user + '/' + this.state.current_user)
      .then(toOtherFromCurrentResponse => {
        this.setState({ messages: toOtherFromCurrentResponse.data})

        //get messages to current_user from other_user
        axios.get('http://localhost:5000/messages/'+ this.state.current_user + '/' + this.state.other_user)
        .then(toCurrentFromOtherResponse => {
          this.setState({ messages: this.state.messages.concat(toCurrentFromOtherResponse.data), loading: false })
        })
        .catch((error) => {
          console.log(error);
        })
      })
      .catch((error) => {
        console.log(error);
      })
    })
    .catch(() => {
      window.location = "/messages/view/conversation/notfound";
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
    <div className='view-conversation'>
        <Navbar/>
        <br/>
        {this.state.loading && <div>Loading...</div>}
        {!this.state.loading && (
        <div className="message-log">
            <h1>Conversation with {this.state.other_user}:</h1>
            <div>
                { this.messageList() }
            </div>
        </div>)}
        <div className='send-message'>{!this.state.loading && !(this.props.match.params.id === this.state.currentUserID) && <Button href={"/message/" + this.props.match.params.id} render={() => <SendMessage/>}>Send Message</Button> } </div>
    </div>
    )
  }
}