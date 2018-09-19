import React, { Component } from 'react';
import Signin from "./Signin";
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Registration extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      lastName: '',
      email: '',
      password: '',
      password_confirmation: ''
    };
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  };

  sendData = (e) => {
    e.preventDefault();
    let user = {name: this.state.name, last_name: this.state.lastName, email: this.state.email, password: this.state.password};
    const par = JSON.stringify(user);
    fetch('http://localhost:3000/api/user',
      {
        method: "POST",
        type: 'application/json',
        body: par
      }).then((response) => console.log(response))
  };

  render() {
    return (
      <div>
        <form>
          <label htmlFor='name'>Name</label> <br/>
          <input type="text" id="name" name="name" onChange={this.handleChange} />
          <br/>

          <label htmlFor='lasName'>LastName</label> <br/>
          <input type="text" id="lastName" name="lastName" onChange={this.handleChange} />
          <br/>

          <label htmlFor='email'>Email</label> <br/>
          <input type="email" id="email" name="email" onChange={this.handleChange} />
          <br/>

          <label htmlFor='password'>Password</label> <br/>
          <input type="password" id="password" name="password" onChange={this.handleChange} />
          <br/>

          <label htmlFor='password'>Password confirmation</label> <br/>
          <input type="password" id="password_confirmation" name="password_confirmation" onChange={this.handleChange}/>
          <br/>

          <button onClick={this.sendData}>Add</button>
          <br/>
          <Link to='/'>Sing in</Link>
        </form>
      </div>
    )
  }

}

export default Registration