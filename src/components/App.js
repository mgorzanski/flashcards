import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import AddSet from './AddSet';
import Sets from './Sets';
import './App.scss';

class App extends Component {
  render() {
    return (
      <Router>
        <React.Fragment>
          <Header />
          <main className="main">
            <Route exact path="/" component={Main} />
            <Switch>
              <Route path="/sets/new" component={AddSet} />
              <Route path="/sets/:id" component={Sets} />
            </Switch>
          </main>
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
