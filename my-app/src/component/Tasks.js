import React, {Component} from 'react';
import PropTypes from 'prop-types';
// import EditableLabel from 'react-inline-editing';
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
    this.buildTask = this.buildTask.bind(this);
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

  buildTask = (data) => {
    this.setState({tasks: data})
    // for (let i = 0; i < this.state.tasks.length; i++) {
    //   let tr = document.createElement('tr');
    //   // tr.id = data[i].id;
    //   let tbody = document.getElementById('tbody');
    //   let tdActive = document.createElement('td');
    //   let active = document.createElement('input');
    //   let select = document.createElement('input');
    //   active.type = 'checkbox';
    //   let title = document.createElement('td');
    //   // title.innerText = data[i].title;
    //   title.innerText = this.state.tasks[i].title;
    //   let priority = document.createElement('td');
    //   priority.innerText = data[i].priority;
    //   let date = document.createElement('td');
    //   // date.innerText = data[i].date_task;
    //   date.innerText = this.state.tasks[i].date_task;
    //   let tdSelect = document.createElement('td');
    //   select.type = 'checkbox';
    //   let blockButtons = document.createElement('td');
    //   let edit = document.createElement('button');
    //   let destroy = document.createElement('button');
    //   edit.innerText = 'Edit';
    //   destroy.innerText = 'Destroy';
    //   destroy.id = this.state.tasks[i].id
    //   destroy.onclick = this.destroyTask;
    //   tdActive.append(active);
    //   tdSelect.append(select);
    //   blockButtons.append(edit, destroy);
    //   tr.append(tdActive, title, priority, date, tdSelect, blockButtons);
    //   tbody.append(tr)
    // }

  };

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
    debugger
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
            <tr id="addr0" key={i}>
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
                {/*<input type="text" name="priority" defaultValue={this.state.tasks[i].priority}/>*/}
              </td>
              <td>
                {item.date_task}
              </td>
              <td>
                <input type='checkbox'/>
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