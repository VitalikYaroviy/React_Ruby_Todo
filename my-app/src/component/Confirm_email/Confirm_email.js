import React, {Component} from 'react';

class Confirm_email extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let link = window.location.href.split('id');
    let idUser = link[link.length - 1];
    if (window.location.href.includes("confirm_email/?")) {
      fetch(`/api/user/${idUser}/confirm_email`,
        {
          method: "GET",
          headers: new Headers({
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }),
        }).then(response => (response.statusText === 'OK') ? this.props.history.push('/?true') : false )
    }
  }


  render() {
    return (
      <div>
      </div>
    )
  }
}

export default Confirm_email
