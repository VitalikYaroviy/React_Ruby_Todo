import React from 'react';
import Signin from '../Signin/Signin';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import fetchMock from "fetch-mock";

configure({adapter: new Adapter()});

const wrapper = shallow(<Signin/>);

describe('The main app', () => {
  it('should render without throwing an error', () => {
    expect(wrapper.find('form.signin').exists()).toBe(true)
  });

  it('renders a email input', () => {
    expect(wrapper.find('#email').length).toEqual(1)
  });

  it('renders a password input', () => {
    expect(wrapper.find('#password').length).toEqual(1)
  })

});

describe('Email input', () => {

  it('should respond to change event and change the state of the Signin Component', () => {
    wrapper.find('#email').simulate('change', {target: {name: 'email', value: 'example@gmail.com'}});

    expect(wrapper.state('email')).toEqual('example@gmail.com');
  })
});

describe('Password input', () => {

  it('should respond to change event and change the state of the Signin Component', () => {

    wrapper.find('#password').simulate('change', {target: {name: 'password', value: '12345'}});

    expect(wrapper.state('password')).toEqual('12345');
  })
});

describe('Password input', () => {

  beforeAll(() => {
    fetchMock.post('/api/oauth/token', {access_token: 'token'});
    wrapper.find('#submit').simulate('click', {preventDefault() {}});
    wrapper.update(<Signin/>)
  })

  it('', () => {
    expect(localStorage.getItem('token')).toEqual('token');
  })
});