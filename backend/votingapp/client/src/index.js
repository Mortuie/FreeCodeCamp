import React from 'react';
import ReactDOM from 'react-dom';
import { Entry } from './components/Entry';
import { BrowserRouter as Router } from 'react-router-dom';


ReactDOM.render(
  <Router>
    <Entry />
  </Router>, 
  document.getElementById('root')
);
