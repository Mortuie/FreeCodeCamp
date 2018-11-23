import React, { Component } from 'react';
import axios from 'axios';

export default class TwitterLogin extends Component {
  render() {
    return (
      <div>
        <a href={'http://127.0.0.1:3000/api/v1/login/twitter?lat=123&long=123'}>
          Login
        </a>
      </div>
    );
  }
}
