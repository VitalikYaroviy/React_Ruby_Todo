import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import './App.css';
import Signin from './component/Signin/Signin'
import Registration from './component/Registration/Registration'
import Tasks from './component/Task/Tasks'
import Confirm_email from './component/Confirm_email/Confirm_email'
import { HashRouter } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div>
        <HashRouter>
            <Route exact path='/' component={Signin} />
            <Route exact path='/user/confirm_email/' component={Confirm_email}/>
            <Route exact path='/registration' component={Registration} />
            <Route exact path='/tasks' component={Tasks} />
        </HashRouter>
      </div>
    );
  }
}

export default App;
