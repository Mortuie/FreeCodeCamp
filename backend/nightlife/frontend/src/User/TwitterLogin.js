import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

@inject('userStore')
@observer
class TwitterLogin extends Component {
  render() {
    const { userStore } = this.props;
    console.log(userStore.city);
    return (
      <div>
        <a href={'http://127.0.0.1:3000/api/v1/login/twitter?lat=123&long=123'}>
          Login
        </a>
      </div>
    );
  }
}

export default TwitterLogin;
