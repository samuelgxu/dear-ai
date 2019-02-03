import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from "react-router";

import MainNavbar from './navbar.js'

import HomePage from './home.js'
import AddEntry from './addentry.js'
import ViewLogs from './viewlogs.js'
import Results from './results.js'

class App extends Component {


  render() {
    return (
      <div className="App" style={{height: '100%'}}>

          <MainNavbar />

          <Switch>
            
            <Route exact path="/" component={HomePage} />
            <Route path="/addentry" component={AddEntry} />
            <Route path="/viewlogs" component={ViewLogs} />
            <Route path="/results" component={Results} />
            
          </Switch>
      </div>
      );
  }
}

export default App;
