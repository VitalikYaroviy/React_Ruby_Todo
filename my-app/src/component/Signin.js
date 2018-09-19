import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {Button} from 'reactstrap';
import PropTypes from 'prop-types';


class Signin extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }


  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  };

  handleSubmit = e => {
    e.preventDefault();
    const loginInfo = `username=${this.state.email}&password=${this.state.password}&grant_type=password`;

    fetch('http://localhost:3000/api/oauth/token',
      {
        method: 'POST',
        headers: new Headers({'Content-Type': 'application/x-www-form-urlencoded'}),
        body: loginInfo
      }).then(response => response.json())
      .then(function (data) {
          let token = JSON.parse(JSON.stringify(data))['access_token'];
          localStorage.setItem('token', token);
        }
      ).then(() => this.props.history.push('/tasks'))

    // axios.post(`http://localhost:3000/oauth/token`, loginInfo,  {'Content-Type': 'application/x-www-form-urlencoded'})
    //   .then(res => {
    //     console.log(res);
    //     console.log(res.data);
    //   })

  };

  render() {
    return (
      <div>
        <form>

          <label htmlFor='email'>Email</label> <br/>
          <input type="email" id="email" name="email" onChange={this.handleChange}/>
          <br/>

          <label htmlFor='password'>Password</label> <br/>
          <input type="password" id="password" name="password" onChange={this.handleChange}/>
          <br/>
          {/*<button onClick={this.handleSubmit}>*/}
          {/*<Link to="/Tasks">Sign in</Link>*/}
          {/*</button>*/}
          <Link to='/tasks'>
            <button type="button" onClick={this.handleSubmit}>Sing in</button>
          </Link>
          <br/>
          <Link to='/registration'>Registration</Link>
        </form>
      </div>
    )
  }
}

// Signin.propTypes = {
//   history: PropTypes.string.isRequired
// };

export default Signin