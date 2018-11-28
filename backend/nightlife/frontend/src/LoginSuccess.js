import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

@inject('userStore')
@observer
class LoginSuccess extends Component {
  login() {
    this.props.userStore.login();
  }

  componentDidMount() {
    console.log(this.props.match.params.CONFIRMED);
    if (this.props.match.params.CONFIRMED === 'LOGGEDIN') {
      // we got itttt...
      this.login();
      this.props.history.push('/');
    } else {
      console.error("Parameter didn't match...");
    }
  }

  render() {
    return <div>HELLO WORLD YOU HAVE LOGGED IN!!!!</div>;
  }
}

export default LoginSuccess;
