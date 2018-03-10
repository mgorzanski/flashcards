import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './Header';
import Main from './Main';

class App extends Component {
  render() {
    return (
      <Router>
        <React.Fragment>
          <Header />
          <main className="main">
            <Route exact path="/" component={Main} />
            <Route path="/sets/new" />
            <Route path="/sets/:id" />
          </main>
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
