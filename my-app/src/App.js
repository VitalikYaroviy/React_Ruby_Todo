import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import './App.css';
import Signin from './component/Signin'
import Registration from './component/Registration'
import Tasks from './component/Tasks'

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <div>
            <Route exact path='/' component={Signin} />
            <Route exact path='/registration' component={Registration} />
            <Route exact path='/tasks' component={Tasks} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
