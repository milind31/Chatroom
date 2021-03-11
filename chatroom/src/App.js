import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import UsersList from './components/view-users';
import SelectUser from './components/select-user';
import ViewProfile from './components/view-profile';
import EditProfile from './components/edit-profile';
import CreateProfile from './components/create-user';
import SendMessage from './components/send-message';
import ViewMessages from './components/view-messages';


class App extends Component{
  constructor(props){
    super(props);
    this.state={currentUserID:''};
  }

  getCurrentUserID(id){
    this.setState({currentUserID: id});
  }

  render() {
    return (
      <Router>
        <div className="container">
          <Switch>
            <Route exact path="/" render={() => <SelectUser setCurrentUserID={this.getCurrentUserID.bind(this)}/>}/>
            <Route exact path="/users" component={UsersList} />
            <Route exact path={"/users/create"} component={CreateProfile} />
            <Route exact path={"/users/:id"} component={ViewProfile} />
            <Route exact path={"/users/edit/:id"} component={EditProfile} />
            <Route exact path={"/message/:id"} component={SendMessage} />
            <Route exact path={"/messages/view/:id"} component={ViewMessages} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
