import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Button, Form, FormGroup, Label, Input, Card, CardHeader, CardBody, Container, Col} from 'reactstrap';


class Signin extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: {},
      message: '',
      display: 'block'
    };
  }

  componentDidMount() {
    if (window.location.href.includes("true")) {
      this.setState({message: 'Your account has now been confirmed'})
    }
    setTimeout(() => {
      this.setState({display: 'none'})
    }, 3000)
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const loginInfo = `username=${this.state.email}&password=${this.state.password}&grant_type=password`;
    fetch('/api/oauth/token',
      {
        method: 'POST',
        headers: new Headers({'Content-Type': 'application/x-www-form-urlencoded'}),
        body: loginInfo
      }).then(response => response.json())
      .then((data) => {
          let token = JSON.parse(JSON.stringify(data))['access_token'];
          if (token) {
            localStorage.setItem('token', token);
            this.props.history.push('/tasks')
          } else {
            let errors = {};
            errors['error'] = data.message;
            this.setState({errors: errors});
          }
        }
      )
  };

  render() {
    return (
      <div>
        {this.state.message ? <div id='popup' className="w-100 text-center align-middle mb-3 bg-success text-white" style={{height: 50, display: this.state.display}}>
          {this.state.message}</div> : false}
        <Container className="w-25 my-5">
          <Col>
            <Card>
              <CardBody>
                <form className='signin'>
                  <FormGroup>
                    <Label htmlFor='email'>Email</Label>
                    <Input type="email" id="email" name="email" onChange={this.handleChange}/>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor='password'>Password</Label>
                    <Input type="password" id="password" name="password" onChange={this.handleChange}/>
                  </FormGroup>
                  <div className="text-center">
                    <Link to='/tasks'>
                      <Button type="button" color="success" id='submit' onClick={this.handleSubmit}>Sing in</Button>
                    </Link>
                    <div className='text-danger text-center'>{this.state.errors['error']}</div>
                  </div>
                  <hr/>
                  <div className="text-center">
                    <Link to='/registration'>Registration</Link>
                  </div>
                </form>
              </CardBody>
            </Card>
          </Col>
        </Container>
      </div>
    )
  }
}

export default Signin
