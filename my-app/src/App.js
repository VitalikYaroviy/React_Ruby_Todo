import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import './App.css';
import Signin from './component/Signin/Signin'
import Registration from './component/Registration/Registration'
import Tasks from './component/Task/Tasks'

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
