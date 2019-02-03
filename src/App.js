import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from "react-router";

import MainNavbar from './navbar.js'

import HomePage from './home.js'
import AddEntry from './addentry.js'
import ViewLogs from './viewlogs.js'
import Results from './results.js'

class App extends Component {

  renderHomePage() {
    return <HomePage />;
  }

  renderAddPage() {
    return <AddEntry />;
  }

  renderLogPage() {
    return <ViewLogs />;
  }

  renderResultsPage() {
    return <Results />;
  }

  render() {
    return (
      <div className="App">

          <MainNavbar />

          <Switch>
            
            <Route exact path="/" render={() => this.renderHomePage()} />
            <Route exact path="/addentry" render={() => this.renderAddPage()} />
            <Route exact path="/viewlogs" render={() => this.renderLogPage()} />
            <Route exact path="/results" render={() => this.renderResultsPage()} />
            
          </Switch>
      </div>
      );
  }
}

export default App;
