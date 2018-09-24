import React, {Component} from 'react';
import PropTypes from 'prop-types';
import EditableLabel from 'react-inline-editing';
import {Button, Form, FormGroup, Label, Input, Card, CardHeader, CardBody, Container, Col, Table} from 'reactstrap';

class Tasks extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body: '',
      priority: '',
      date_task: '',
      tasks: [],
      value: '',
      errors: {}
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
      errors['date_task'] = 'Date cannot be emty';
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
      fetch('http://localhost:3000/api/tasks',
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
    fetch(`http://localhost:3000/api/tasks/${item.id}`,
      {
        method: "DELETE",
        headers: new Headers({
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }),
      }).then(response => response.json())
  };

  selectAllTasks = (e) => {
    e.preventDefault();
    let checkbox = document.querySelectorAll('input[name=select]');
    for (let i = 0; i < checkbox.length; i++) {
      checkbox[i].checked = true
    }
  };

  uncheckAllTasks = (e) => {
    e.preventDefault();
    let checkbox = document.querySelectorAll('input[name=select]');
    for (let i = 0; i < checkbox.length; i++) {
      checkbox[i].checked = false
    }
  };

  removeCheckTasks = (e) => {
    e.preventDefault();
    let checkedBoxes = document.querySelectorAll('input[name=select]:checked');
    let listTask = [];
    for (let i = 0; i < checkedBoxes.length; i++) {
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

  changeTask = (task) => (e) => {
    if (e.target.checked) {
      task.status = 1;
      fetch(`http://localhost:3000/api/tasks/${task.id}`,
        {
          method: "PUT",
          body: JSON.stringify(task),
          headers: new Headers({
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }),
        }).then((response) => response.json()).then((data) => this.setState({tasks: data}))
    } else {
      task.status = 0;

      fetch(`http://localhost:3000/api/tasks/${task.id}`,
        {
          method: "PUT",
          body: JSON.stringify(task),
          headers: new Headers({
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }),
        }).then((response) => response.json()).then((data) => this.setState({tasks: data}))
    }
  };

  _handleFocusOut = (item) => (text) => {
    item.title = text;
    fetch(`http://localhost:3000/api/tasks/${item.id}`,
      {
        method: "PUT",
        body: JSON.stringify(item),
        headers: new Headers({
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }),
      }).then((response) => response.json())
  };

  render() {
    return (
      <div>

        <div className='w-100'>
          <Button className='float-right mr-5' onClick={this.clearLocal}>Exit</Button>
        </div>

        <div className='d-flex w-25 my-5'>
          <Button className='mx-3' color="primary" onClick={this.selectAllTasks}>Select all</Button>
          <Button className='mx-3' color="primary" onClick={this.uncheckAllTasks}>Uncheck all</Button>
          <Button className='mx-3' color="warning" onClick={this.removeCheckTasks}>Remove all</Button>
        </div>


        <div className='d-flex w-100'>

          <div className='w-75 mx-5'>
            <h3>Active</h3>
            <Table hover className='my-5'>
              <thead>
              <tr className='text-center'>
                <th>Active</th>
                <th>Title</th>
                <th>Priority</th>
                <th>Date</th>
                <th>Select</th>
                <th>Setup</th>
              </tr>
              </thead>
              <tbody id="tbody" className='active'>
              {(this.state.tasks.length) ? this.state.tasks.sort((a, b) => b.id - a.id).map((item, i) => (

                (item.status === 0) ?
                  <tr key={i} className='text-center'>
                    <td><Input type='checkbox' name="status" onChange={this.changeTask(item)}/></td>
                    <td>
                      <EditableLabel text={item.title} onFocusOut={this._handleFocusOut(item)}/>
                    </td>
                    <td>{item.priority}</td>
                    <td>{item.date_task}</td>
                    <td><Input id={item.id} name="select" type='checkbox'/></td>
                    <td><Button color="danger" onClick={this.handleRemoveSpecificRow(i, item)}>Remove</Button></td>
                  </tr> : false
              )) : false}
              </tbody>
            </Table>
            <h3>Finish</h3>
            <Table hover className='my-5'>
              <thead>
              <tr className='text-center'>
                <th>Active</th>
                <th>Title</th>
                <th>Priority</th>
                <th>Date</th>
                <th>Select</th>
                <th>Setup</th>
              </tr>
              </thead>
              <tbody id="tbody" className='finish'>
              {(this.state.tasks.length) ? this.state.tasks.sort((a, b) => b.id - a.id).map((item, i) => (
                (item.status === 1) ?
                  <tr key={i} className='text-center'>
                    <td><Input type='checkbox' id={item.id} checked='checked' name="status"
                               onChange={this.changeTask(item)}/></td>
                    <td><EditableLabel text={item.title} onFocusOut={this._handleFocusOut(item)}/></td>
                    <td className="description">{item.priority}</td>
                    <td className="description">{item.date_task}</td>
                    <td><Input id={item.id} name="select" type='checkbox'/></td>
                    <td><Button color="danger" onClick={this.handleRemoveSpecificRow(i, item)}>Remove</Button></td>
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
                      <Button className='w-50' color="success" onClick={this.createTask}>Add</Button>
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
