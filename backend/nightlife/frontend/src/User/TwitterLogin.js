import React, { Component } from 'react';
import axios from 'axios';
import { observer } from 'mobx-react';

@observer
class TwitterLogin extends Component {
  render() {
    const { store } = this.props;

    store.getCity();
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
