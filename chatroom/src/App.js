import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar";
import UsersList from './components/view-users';
import SelectUser from './components/select-user';

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br/>
        <Switch>
          <Route exact path="/" component={SelectUser}/>
          <Route exact path="/users" component={UsersList} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
