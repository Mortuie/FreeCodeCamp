import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

@inject('userStore')
@observer
class TwitterLogin extends Component {
  render() {
    const { userStore } = this.props;
    console.log('USERSTORE:', userStore);
    return (
      <div>
        <a
          href={`http://localhost:3002/api/v1/login/twitter?lat=${
            userStore.latitude
          }&long=${userStore.longitude}`}
        >
          Login
        </a>
      </div>
    );
  }
}

export default TwitterLogin;
