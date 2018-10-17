import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import './App.css';
import Signin from './component/Signin/Signin'
import Registration from './component/Registration/Registration'
import Tasks from './component/Task/Tasks'
import Confirm_email from './component/Confirm_email/Confirm_email'

class App extends Component {
  render() {
    return (
      <div>
        <Router>
            <Route exact path='/' component={Signin} />
            <Route  path='/user/confirm_email/' component={Confirm_email}/>
            <Route  path='/registration' component={Registration} />
            <Route  path='/tasks' component={Tasks} />
        </Router>
      </div>
    );
  }
}

export default App;
