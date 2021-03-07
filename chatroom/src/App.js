import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar";
import UsersList from './components/view-users';
import SelectUser from './components/select-user';

import { UserIDProvider } from './components/userIDContext';

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
      <UserIDProvider value={this.state.currentUserID}>
      <Router>
        <div className="container">
          <Navbar/>
          <br/>
          <Switch>
            <Route exact path="/" render={() => <SelectUser setCurrentUserID={this.getCurrentUserID.bind(this)}/>}/>
            <Route exact path="/users" component={UsersList} />
          </Switch>
        </div>
      </Router>
      </UserIDProvider>
    );
  }
}

export default App;
