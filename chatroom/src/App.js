import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import UsersList from './components/view-users';
import SelectUser from './components/select-user';
import ViewProfile from './components/view-profile';
import EditProfile from './components/edit-profile';
import CreateProfile from './components/create-user';
import SendMessage from './components/send-message';
import ViewMessages from './components/view-recent-messages';
import ViewConversation from './components/view-conversation';
import PageNotFound from './components/page-not-found';
import UserNotFound from './components/user-not-found';
import ConversationNotFound from './components/conversation-not-found';
import CannotAddUser from './components/cannot-add-user';

class App extends Component{
  render() {
    return (
      <Router>
        <div className="container">
          <Switch>
            <Route exact path="/" render={() => <SelectUser/>}/>
            <Route exact path="/users" component={UsersList} />
            <Route exact path={"/users/notfound"} component={UserNotFound} />
            <Route exact path={"/users/failtoadd"} component={CannotAddUser} />
            <Route exact path={"/users/create"} component={CreateProfile} />
            <Route exact path={"/users/:id"} component={ViewProfile}/>
            <Route exact path={"/users/edit/:id"} component={EditProfile} />
            <Route exact path={"/message/:id"} component={SendMessage} />
            <Route exact path={"/messages/view/conversation/notfound"} component={ConversationNotFound} />
            <Route exact path={"/messages/view/:id"} component={ViewMessages} />
            <Route exact path={"/messages/view/conversation/:id"} component={ViewConversation} />
            <Route path="*" component={PageNotFound} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
