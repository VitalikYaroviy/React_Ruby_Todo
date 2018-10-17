import React, { Component } from 'react';
import {BrowserRouter as Router, Route, browserHistory} from 'react-router-dom'
import './App.css';
import Signin from './component/Signin/Signin'
import Registration from './component/Registration/Registration'
import Tasks from './component/Task/Tasks'
import Confirm_email from './component/Confirm_email/Confirm_email'

class App extends Component {
  render() {
    return (
      <div>
        <Router history={browserHistory}>
            <Route exact path='/' component={Signin} />
            <Route exact path='/user/confirm_email/' component={Confirm_email}/>
            <Route exact path='/registration' component={Registration} />
            <Route exact path='/tasks' component={Tasks} />
        </Router>
      </div>
    );
  }
}

export default App;
