import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { RIEToggle, RIEInput, RIETextArea, RIENumber, RIETags, RIESelect } from 'riek'
import _ from 'lodash'

class Tasks extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body: '',
      priority: '',
      date_task: '',
      tasks: [],
    };
    this.clearLocal = this.clearLocal.bind(this);
    this.createTask = this.createTask.bind(this);
  }

  static contextTypes = {
    router: PropTypes.object
  };

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  };

  componentWillMount() {
    let token = localStorage.getItem('token');
    (token === null) ? this.props.history.push('/') : true;
    fetch('http://localhost:3000/api/tasks',
      {
        method: "GET",
        headers: new Headers({
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }),
      }).then(response => response.json())
      .then((data) => this.setState({tasks: data}))
  }

  clearLocal() {
    localStorage.removeItem('token');
    this.context.router.history.push(`/`)
  }

  createTask = (e) => {
    e.preventDefault();
    let task = {
      title: this.state.title,
      body: this.state.body,
      priority: this.state.priority,
      date_task: this.state.date_task
    };
    fetch('http://localhost:3000/api/tasks',
      {
        method: "POST",
        body: JSON.stringify(task),
        headers: new Headers({
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }),
      }).then((response) => response.json()).then((data) => this.setState({tasks: data}))
  };

  handleRemoveSpecificRow = (i, item) => () => {
    const rows = [...this.state.tasks];
    rows.splice(i, 1);
    this.setState({tasks: rows});
    fetch(`http://localhost:3000/api/tasks/${item.id}`,
      {
        method: "DELETE",
        headers: new Headers({
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }),
      }).then(response => response.json())
  };

  httpTaskCallback = (task) => (text) => {
    task.title = text.title;
    fetch(`http://localhost:3000/api/tasks/${task.id}`,
      {
        method: "PUT",
        body: JSON.stringify(task),
        headers: new Headers({
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }),
      }).then((response) => response.json())
  };

  selectAllTasks = (e)  => {
    e.preventDefault();
    let checkbox = document.querySelectorAll('input[name=select]');
    for(let i = 0; i < checkbox.length; i++){
      checkbox[i].checked = true
    }
  };

  uncheckAllTasks = (e)  => {
    e.preventDefault();
    let checkbox = document.querySelectorAll('input[name=select]');
    for(let i = 0; i < checkbox.length; i++){
      checkbox[i].checked = false
    }
  };

  removeCheckTasks = (e) => {
    e.preventDefault();
    let checkedBoxes = document.querySelectorAll('input[name=select]:checked');
    let listTask = [];
    for (let i = 0; i < checkedBoxes.length; i++ ) {
      listTask.push(checkedBoxes[i].id)
    }
    fetch('http://localhost:3000/api/destroy_multiple',
      {
        method: "DELETE",
        body: JSON.stringify({ids: listTask}),
        headers: new Headers({
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }),
      }).then((response) => response.json())
      .then((data) => this.setState({tasks: data}))
  };

  render() {
    return (
      <div>

        <header>
          <button onClick={this.clearLocal}>Exit</button>
        </header>

        <div>
          <form className="form-control">
            <p>Title</p>
            <input type="text" id="title" name="title" className='data' onChange={this.handleChange}/>
            <p>Body</p>
            <input type="text" id="body" name="body" className='data' onChange={this.handleChange}/>
            <p>Priority</p>
            <input type="number" id="priority" name="priority" className='data' onChange={this.handleChange}/>
            <p>Date</p>
            <input type="date" id="date_task" name="date_task" className='data' onChange={this.handleChange}/>
            <br/>
            <button onClick={this.createTask}>Add</button>
            <button onClick={this.selectAllTasks}>Select all</button>
            <button onClick={this.uncheckAllTasks}>Uncheck all</button>
            <button onClick={this.removeCheckTasks}>Remove all</button>
          </form>
        </div>

        <table>
          <thead>
          <tr>
            <th>Active</th>
            <th>Title</th>
            <th>Priority</th>
            <th>Date</th>
            <th>Select</th>
            <th>Setup</th>
          </tr>
          </thead>
          <tbody id="tbody">
          {this.state.tasks.map((item, i) => (
            <tr key={i}>
              <td><input type='checkbox'/></td>
              <td>
                <RIEInput
                  id={item.id}
                  value={item.title}
                  change={this.httpTaskCallback(item)}
                  propName='title'
                  validate={_.isString} />
              </td>
              <td>
                {item.priority}
              </td>
              <td>
                {item.date_task}
              </td>
              <td>
                <input id={item.id} name="select" type='checkbox'/>
              </td>
              <td>
                <button onClick={this.handleRemoveSpecificRow(i, item)}>Remove</button>
              </td>
            </tr>
          ))}
          </tbody>
        </table>

      </div>
    )
  }
}

export default Tasks