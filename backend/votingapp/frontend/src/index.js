import React from 'react';
import ReactDOM from 'react-dom';
import { Main } from './Main';
import { BrowserRouter as Router } from 'react-router-dom';
import Store from './Redux/Store';
import { Provider } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';

ReactDOM.render(
  <CssBaseline>
    <Provider store={Store}>
      <Router>
        <Main />
      </Router>
    </Provider>
  </CssBaseline>,
  document.getElementById('root')
);
