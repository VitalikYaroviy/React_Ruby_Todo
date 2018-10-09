import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Button, Form, FormGroup, Label, Input, Card, CardBody, Container, Col} from 'reactstrap';

class Registration extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      lastName: '',
      email: '',
      password: '',
      password_confirmation: '',
      errors: {},
      isSubmitted: false
    };
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
    console.log()
  };

  handleValidation = () => {
    let errors = {};
    let formIsValid = true;

    if (!this.state.name) {
      formIsValid = false;
      errors['name'] = 'Name cannot be empty';
    }

    if (!this.state.lastName) {
      formIsValid = false;
      errors['lastName'] = 'Last name cannot be empty';
    }

    if (!this.state.email) {
      formIsValid = false;
      errors['email'] = 'Email cannot be empty';
    }

    if (this.state.password.length < 5) {
      formIsValid = false;
      errors['password_length'] = 'Password is too short (minimum is 5 characters)';
    }

    if (this.state.password !== this.state.password_confirmation) {
      formIsValid = false;
      errors['password_confirmation'] = 'Passwords must match';
    }

    this.setState({errors: errors});
    return formIsValid;
  };

  sendData = (e) => {
    e.preventDefault();
    if (this.handleValidation()) {
      let user = {
        name: this.state.name,
        last_name: this.state.lastName,
        email: this.state.email,
        password: this.state.password
      };
      const par = JSON.stringify(user);
      fetch('http://localhost:3000/api/user',
        {
          method: "POST",
          type: 'application/json',
          body: par
        }).then((response) => (response.ok) ? this.props.history.push('/') : false)
    }
  };

  render() {
    return (
      <Container className="w-25 my-5">
        <Col>
          <Card>
            <CardBody>
              <form className='registration'>
                <FormGroup>
                  <Label htmlFor='name'>Name</Label>
                  <Input type="text" id="name" name="name" onChange={this.handleChange}/>
                  <div className='text-danger text-center'> {this.state.errors['name']} </div>
                </FormGroup>
                <FormGroup>
                  <Label htmlFor='lasName'>LastName</Label>
                  <Input type="text" id="lastName" name="lastName" onChange={this.handleChange}/>
                  <div className='text-danger text-center'> {this.state.errors['lastName']} </div>
                </FormGroup>
                <FormGroup>
                  <Label htmlFor='email'>Email</Label>
                  <Input type="email" id="email" name="email" onChange={this.handleChange}/>
                  <div className='text-danger text-center'> {this.state.errors['email']} </div>
                </FormGroup>
                <FormGroup>
                  <Label htmlFor='password'>Password</Label>
                  <Input type="password" id="password" name="password" onChange={this.handleChange}/>
                  <div className='text-danger text-center'> {this.state.errors['password_length']} </div>
                </FormGroup>
                <FormGroup>
                  <Label htmlFor='password'>Password confirmation</Label>
                  <Input type="password" id="password_confirmation" name="password_confirmation"
                         onChange={this.handleChange}/>
                  <div className='text-danger text-center'> {this.state.errors['password_confirmation']} </div>
                </FormGroup>
                <div className="text-center">
                  <Button className="w-25" color="primary" id='sendData' onClick={this.sendData}>Add</Button>
                </div>
                <hr/>
                <div className="text-center">
                  <Link color="link" to='/'>Sing in</Link>
                </div>
              </form>
            </CardBody>
          </Card>
        </Col>
      </Container>
    )
  }
}

export default Registration
