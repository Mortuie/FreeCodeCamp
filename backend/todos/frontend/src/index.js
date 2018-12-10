import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import axios from 'axios';

let username = '';

while (username === '') {
  username = prompt('Please enter your username', '');

  if (username !== '') {
    axios
      .post(`http://localhost:3000/api/v1/user/${username}`)
      .then(res => {
        console.log(res);
        username = '';
      })
      .catch(err => {
        console.log(err);
        username = '';
      });
  }
}

ReactDOM.render(<App username={username} />, document.getElementById('root'));
