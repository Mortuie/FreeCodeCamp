import React from 'react';
import ReactDOM from 'react-dom';
import Main from './Main';
import UserStore from './UserStore';

ReactDOM.render(<Main store={UserStore} />, document.getElementById('root'));
