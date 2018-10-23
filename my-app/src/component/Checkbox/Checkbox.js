import React, {Component} from 'react';

class Checkbox extends Component {

  constructor(props) {
    super(props);
    this.state = {
      checked: false
    };
    this.toggleChange = this.toggleChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({checked: nextProps.status});
  }

  toggleChange = () => {
    this.setState({checked: !this.state.checked})
  };

  render() {
    return (
      <input name="select" type='checkbox' id={this.props.id  } checked={this.state.checked} onChange={this.toggleChange}/>
    )
  }
}

export default Checkbox