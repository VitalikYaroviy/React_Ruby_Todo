import React from 'react';
import Registration from '../Registration/Registration';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import fetchMock from 'fetch-mock'

configure({adapter: new Adapter()});

const wrapper = shallow(<Registration />);

describe('The main app', () => {
  it('should render without throwing an error', () => {
    expect(wrapper.find('form.registration').exists()).toBe(true)
  });

  it('renders a email input', () => {
    expect(wrapper.find('#email').length).toEqual(1)
  });

  it('renders a password input', () => {
    expect(wrapper.find('#password').length).toEqual(1)
  })

});

describe('valid', () => {
  it('', () => {
    wrapper.find('#sendData').simulate('click', { preventDefault() {} });
    expect(wrapper.state().errors).toEqual({email: "Email cannot be empty", lastName: "Last name cannot be empty", name: "Name cannot be empty", password_length: "Password is too short (minimum is 5 characters)"});
  })
});

describe('Email input', () => {

  it('should respond to change event and change the state of the Registration Component', () => {
    wrapper.find('#name').simulate('change', {target: {name: 'name', value: 'name'}});
    expect(wrapper.state('name')).toEqual('name');
  })
});

describe('Email input', () => {

  it('should respond to change event and change the state of the Registration Component', () => {
    wrapper.find('#lastName').simulate('change', {target: {name: 'lastName', value: 'lastName'}});
    expect(wrapper.state('lastName')).toEqual('lastName');
  })
});

describe('Email input', () => {

  it('should respond to change event and change the state of the Registration Component', () => {
    wrapper.find('#email').simulate('change', {target: {name: 'email', value: 'example@gmail.com'}});
    expect(wrapper.state('email')).toEqual('example@gmail.com');
  })
});

describe('Password input', () => {

  it('should respond to change event and change the state of the Registration Component', () => {
    wrapper.find('#password').simulate('change', {target: {name: 'password', value: '12345'}});
    expect(wrapper.state('password')).toEqual('12345');
  })
});

describe('Password input', () => {

  it('should respond to change event and change the state of the Registration Component', () => {
    wrapper.find('#password_confirmation').simulate('change', {target: {name: 'password_confirmation', value: '12345'}});
    expect(wrapper.state('password_confirmation')).toEqual('12345');
  })
});

describe('Password input', () => {

  beforeAll(() => {
    fetchMock.post('http://localhost:3000/api/user', 200);
    wrapper.find('#sendData').simulate('click',{ preventDefault() {} });
    wrapper.update(<Registration />)
  })

  it('', () => {
    expect(wrapper.state()).toEqual({ name: 'name', lastName: 'lastName', email: 'example@gmail.com', password: '12345', password_confirmation: '12345', errors: {}, isSubmitted: false })
  })
});