import React from 'react';
import Task from '../Task/Tasks';
import {configure, shallow, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import fetchMock from 'fetch-mock'
import { createMemoryHistory } from 'history'


configure({adapter: new Adapter()});
const tasks = [{
  id: 32,
  title: 'test1',
  body: 'test',
  priority: '1',
  date_task: '01.01.11',
  status: 0
}, {
  id: 33,
  title: 'test6',
  body: 'test6',
  priority: '6',
  date_task: '06.06.66',
  status: 0
}];

fetchMock.get('http://localhost:3000/api/tasks', tasks);
const history = createMemoryHistory('/dashboard')

const wrapper = shallow(<Task history={history} />);

describe('componentDidMount', () => {
  it('', () => {
    wrapper.instance().componentDidMount();
    expect(wrapper.find('.tr-active').length).toEqual(2)
  })
});

describe('Select all and Uncheck all', () => {
  it('', () => {
    wrapper.find('#uncheckAll').simulate('click');
    let checkbox = wrapper.find('input[name="select"]');
    expect(checkbox.first().props().checked).toEqual(true)
  })
});


describe('handleValidation', () => {
  it('', () => {
    wrapper.find('#but-create').simulate('click', { preventDefault() {} });
    expect(wrapper.state().errors).toEqual({ title: 'Title cannot be empty', body: 'Body cannot be empty', priority: 'Priority cannot be empty', date_task: 'Date cannot be emty' });
  })
});


describe('handleChange', () => {
  it('', () => {
    wrapper.find('#title').simulate('change', {target: {name: 'title', value: 'title1'}});
    expect(wrapper.state('title')).toEqual('title1');
  })
});

describe('clearLocal', () => {
  it('', () => {
    localStorage.setItem('token', 'string');
    wrapper.find('#exit').simulate('click');
    const token = localStorage.getItem('token');
    expect(token).toEqual(null)
  })
});

describe('create task', () => {

  beforeAll(() => {
    fetchMock.post('http://localhost:3000/api/tasks', tasks);
    wrapper.find('#but-create').simulate('click', { preventDefault() {} });
    wrapper.update(<Task/>);
  });

  it('', () => {
    expect(wrapper.state().tasks).toEqual(tasks);
    expect(wrapper.find('.tr-active').length).toEqual(2)
  });
});

describe('put task', () => {
  beforeAll(() => {
    fetchMock.put('http://localhost:3000/api/tasks/32', [{id: 32, title: 'test1', body: 'test', priority: '1', date_task: '01.01.11', status: 1},
      {id: 33, title: 'test6', body: 'test6', priority: '6', date_task: '06.06.66', status: 0}]);
    wrapper.find('input[name="status"]').first().simulate('change', {target: {checked: true}});
    wrapper.update(<Task/>)
  })

  it('', () => {
    expect(wrapper.state().tasks).toEqual([{id: 32, title: 'test1', body: 'test', priority: '1', date_task: '01.01.11', status: 1},
      {id: 33, title: 'test6', body: 'test6', priority: '6', date_task: '06.06.66', status: 0}]);
  });
})


describe('updateListing', () => {
  beforeAll(() => {
    fetchMock.put('http://localhost:3000/api/tasks/33', [{id: 32, title: 'test1', body: 'test', priority: '1', date_task: '01.01.11', status: 1},
      {id: 33, title: 'working', body: 'test6', priority: '6', date_task: '06.06.66', status: 0}]);
    wrapper.instance().updateListing({id: 33, title: 'working', body: 'test6', priority: '6', date_task: '06.06.66', status: 0}, 'working');
    wrapper.update(<Task/>)
  })

  it('', () => {
    expect(wrapper.state().tasks).toEqual([{id: 32, title: 'test1', body: 'test', priority: '1', date_task: '01.01.11', status: 1},
      {id: 33, title: 'working', body: 'test6', priority: '6', date_task: '06.06.66', status: 0}]);
  })
});

describe('remove', () => {
  it('', () => {
    fetchMock.delete('http://localhost:3000/api/tasks/33', {});
    wrapper.find('#task_33').simulate('click');
    expect(wrapper.find('.tr-active').length).toEqual(0)
    expect(wrapper.state().tasks).toEqual([{id: 32, title: 'test1', body: 'test', date_task: '01.01.11', priority: '1', status: 1}])
  })
});
