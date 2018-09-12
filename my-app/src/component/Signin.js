import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';


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

    fetch('http://localhost:3000/oauth/token',
      {
        method:'POST',
        headers: new Headers({'Content-Type': 'application/x-www-form-urlencoded'}),
        body: loginInfo
      }).then(function (res) {
        debugger
        let token = JSON.parse(JSON.stringify(res))['access_token']
        console.log(token)
    })
  };

  render() {
    return (
      <div>
        <form>

          <label htmlFor='email'>Email</label> <br/>
          <input type="email" id="email" name="email"  onChange={this.handleChange} />
          <br/>

          <label htmlFor='password'>Password</label> <br/>
          <input type="password" id="password" name="password"   onChange={this.handleChange}/>
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

export default Signin