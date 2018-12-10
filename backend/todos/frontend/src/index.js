import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

let username = '';

while (username === '') {
  username = prompt('Please enter your username', '');
}

ReactDOM.render(<App username={username} />, document.getElementById('root'));
