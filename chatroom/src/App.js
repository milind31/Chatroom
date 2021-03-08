import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import UsersList from './components/view-users';
import SelectUser from './components/select-user';
import ViewProfile from './components/view-profile';


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
            <Route exact path={"/users/:id"} component={ViewProfile} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
