import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const user = JSON.parse(localStorage.getItem('user'));

ReactDOM.render(<App userObject={user} />, document.getElementById('root'));
