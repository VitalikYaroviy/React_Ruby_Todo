import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, Form, FormGroup, Label, Input, Card, CardHeader, CardBody, Container, Col, Table} from 'reactstrap';
import InlineEditable from "react-inline-editable-field";
import DayPickerInput from 'react-day-picker/DayPickerInput';


import 'react-day-picker/lib/style.css';


class Tasks extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body: '',
      priority: '',
      date_task: '',
      checked: false,
      tasks: [],
      value: '',
      errors: {}
    };
    this.clearLocal = this.clearLocal.bind(this);
    this.createTask = this.createTask.bind(this);
    this.removeCheckTasks = this.removeCheckTasks.bind(this);
  }

  static contextTypes = {
    history: PropTypes.object
  };


  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  };

  componentDidMount() {
    let token = localStorage.getItem('token');
    (token === null) ? this.props.history.push('/') : true;
    fetch('/api/tasks',
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
    this.props.history.push('/');
  }

  handleValidation = () => {
    let errors = {};
    let formIsValid = true;

    if (!this.state.title) {
      formIsValid = false;
      errors['title'] = 'Title cannot be empty';
    }

    if (!this.state.body) {
      formIsValid = false;
      errors['body'] = 'Body cannot be empty';
    }

    if (!this.state.priority) {
      formIsValid = false;
      errors['priority'] = 'Priority cannot be empty';
    }

    if (!this.state.date_task) {
      formIsValid = false;
      errors['date_task'] = 'Date cannot be empty';
    }

    this.setState({errors: errors});
    return formIsValid;
  };


  createTask = (e) => {
    e.preventDefault();
    if (this.handleValidation()) {
      let task = {
        title: this.state.title,
        body: this.state.body,
        priority: this.state.priority,
        date_task: this.state.date_task
      };
      fetch('/api/tasks',
        {
          method: "POST",
          body: JSON.stringify(task),
          headers: new Headers({
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }),
        }).then((response) => response.json()).then((data) => this.setState({tasks: data}))
      let inputs = document.querySelectorAll("input[class='data form-control']");
      for (let i = 0; i < inputs.length; i++) {
        inputs[i].value = '';
      }
    }
  };

  handleRemoveSpecificRow = (i, item) => () => {
    const rows = [...this.state.tasks];
    rows.splice(i, 1);
    this.setState({tasks: rows});
    fetch(`/api/tasks/${item.id}`,
      {
        method: "DELETE",
        headers: new Headers({
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }),
      }).then(response => response.json())
  };

  toggleChange = () => {
    this.setState({checked: !this.state.checked});
  };

  removeCheckTasks = (e) => {
    e.preventDefault();
    let checkedBoxes = document.querySelectorAll('input[name=select]:checked');
    let listTask = [];
    for (let i = 0; i < checkedBoxes.length; i++) {
      listTask.push(checkedBoxes[i].id)
    }
    fetch('/api/destroy_multiple',
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

  changeTask = (task, index) => (e) => {
    if (e.target.checked) {
      task.status = 1;
    } else {
      task.status = 0;
    }
    fetch(`/api/tasks/${task.id}`,
      {
        method: "PUT",
        body: JSON.stringify(task),
        headers: new Headers({
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }),
      }).then((response) => response.json()).then((data) => {
      const newTasks = this.state.tasks;
      newTasks[index] = data;
      this.setState({tasks: newTasks})
    })
  };

  updateListing(item, val, index, string) {
    if (string === 'title') {
      item.title = val;
    } else if (string === 'date') {
      item.date_task = val;
    } else if (string === 'priority') {
      item.priority = val;
    }
    fetch(`/api/tasks/${item.id}`,
      {
        method: "PUT",
        body: JSON.stringify(item),
        headers: new Headers({
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }),
      }).then((response) => response.json()).then((data) => {
      const newTasks = this.state.tasks;
      newTasks[index] = data;
      this.setState({tasks: newTasks})
    })
  }

  updateDate = (item, i, string) => (date) => {
    let newDate = date.toISOString().slice(0, 10);
    this.updateListing(item, newDate, i, string)
  };

  render() {
    return (
      <div>

        <div className='w-100'>
          <Button className='float-right mr-5' id='exit' onClick={this.clearLocal}>Exit</Button>
        </div>

        <div className='d-flex w-25 my-5'>
          <Button className='mx-3' id='selectAll' color="primary" onClick={this.toggleChange}>Select all</Button>
          <Button className='mx-3' id='uncheckAll' color="primary" onClick={this.toggleChange}>Uncheck all</Button>
          <Button className='mx-3' color="warning" onClick={this.removeCheckTasks}>Remove all</Button>
        </div>

        <div className='d-flex w-100'>

          <div className='w-75 mx-5'>
            <h3>Active</h3>
            <Table className='my-5'>
              <thead>
              <tr className='text-center'>
                <th>Select</th>
                <th>Title</th>
                <th>Priority</th>
                <th>Date</th>
                <th>Complete</th>
                <th>Setup</th>
              </tr>
              </thead>
              <tbody id="tbody" className='active'>
              {(this.state.tasks !== []) ? this.state.tasks.map((item, i) => {
                return (item.status === 0) ?
                  <tr key={i} className='text-center tr-active'>
                    <td><input name="select" type='checkbox' checked={this.state.checked}/></td>
                    <td>
                      <InlineEditable content={item.title} inputType="input" onBlur={(val) => {this.updateListing(item, val, i, 'title')}}/>
                    </td>
                    <td>
                      <InlineEditable content={item.priority} inputType="input" onBlur={(val) => {this.updateListing(item, val, i, 'priority')}}/>
                    </td>
                    <td style={{width: '10%'}}>
                      <DayPickerInput value={new Date(item.date_task)} onDayChange={this.updateDate(item, i, 'date')} inputProps={{ style: { border: 'none', textAlign: 'center' } }} />
                    </td>
                    <td><input type='checkbox' name="status" onChange={this.changeTask(item, i)}/></td>
                    <td><Button color="danger" id={`task_${item.id}`} onClick={this.handleRemoveSpecificRow(i, item)}>Remove</Button></td>
                  </tr> : false
              }) : false}
              </tbody>
            </Table>
            <h3>Finish</h3>
            <Table className='my-5'>
              <thead>
              <tr className='text-center'>
                <th>Select</th>
                <th>Title</th>
                <th>Priority</th>
                <th>Date</th>
                <th>Restore</th>
                <th>Setup</th>
              </tr>
              </thead>
              <tbody id="tbody" className='finish'>
              {(this.state.tasks !== []) ? this.state.tasks.map((item, i) => (
                (item.status === 1) ?
                  <tr key={i} className='text-center tr-finish'>
                    <td><input name="select" type='checkbox' checked={this.state.checked}/></td>
                    <td className="description">
                      <InlineEditable content={item.title} inputType="input" onBlur={(val) => {this.updateListing(item, val, i, 'title')}}/>
                    </td>
                    <td className="description">
                      <InlineEditable content={item.priority} inputType="input" onBlur={(val) => {this.updateListing(item, val, i, 'priority')}}/>
                    </td>
                    <td className="description" style={{width: '10%'}} >
                      <DayPickerInput value={new Date(item.date_task)} onDayChange={this.updateDate(item)} inputProps={{ style: { border: 'none', textAlign: 'center' } }} />
                    </td>
                    <td><Input type='checkbox' checked='checked' name="status" onChange={this.changeTask(item, i)}/></td>
                    <td><Button color="danger" id={item.id} onClick={this.handleRemoveSpecificRow(i, item)}>Remove</Button></td>
                  </tr> : false
              )) : false}
              </tbody>
            </Table>
          </div>

          <Container className='w-25 mx-5 mt-5'>
            <Col>
              <Card>
                <CardHeader className='text-center'>New task</CardHeader>
                <CardBody>
                  <Form>
                    <FormGroup>
                      <p>Title</p>
                      <Input type="text" id="title" name="title" className='data' onChange={this.handleChange}/>
                      <div className='text-danger text-center'> {this.state.errors['title']} </div>
                    </FormGroup>
                    <FormGroup>
                      <p>Body</p>
                      <Input type="text" id="body" name="body" className='data' onChange={this.handleChange}/>
                      <div className='text-danger text-center'> {this.state.errors['body']} </div>
                    </FormGroup>
                    <FormGroup>
                      <p>Priority</p>
                      <Input type="text" id="priority" maxLength="1" name="priority" className='data'
                             onChange={this.handleChange}/>
                      <div className='text-danger text-center'> {this.state.errors['priority']} </div>
                    </FormGroup>
                    <FormGroup>
                      <p>Date</p>
                      <Input type="date" id="date_task" name="date_task" className='data' onChange={this.handleChange}/>
                      <div className='text-danger text-center'> {this.state.errors['date_task']} </div>
                    </FormGroup>
                    <div className='text-center'>
                      <button className='w-50' color="success" id='but-create' onClick={this.createTask}>Add</button>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Container>
        </div>
      </div>
    )
  }
}

export default Tasks
