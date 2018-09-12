import React, {Component} from 'react';

class Tasks extends Component {

  render() {
    return (
      <div>

        <div>
          <form>
            <p>Title</p>
            <input type='text' />
            <p>Priority</p>
            <input type='number' />
            <p>Date</p>
            <input type='date' />
            <br/>
            <button>Add</button>
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
          <tbody >
          <tr>
            <td>
              <input type="checkbox"/>
            </td>
            <td>Title</td>
            <td>Priority</td>
            <td>Data</td>
            <td><input type='checkbox'/></td>
            <td>
              <button>Edit</button>
              <button>Destroy</button>
            </td>
          </tr>
          </tbody>
        </table>

      </div>
    )
  }
}

export default Tasks