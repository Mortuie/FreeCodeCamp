import React, { useState, useEffect } from 'react';
import { TodoPage } from './Todos';
import axios from 'axios';

const App = ({ userObject }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    if (userObject) {
      setUser(userObject);
    } else checkUsername('Please enter your name!');
  }, []);

  const login = user => {
    localStorage.setItem('user', JSON.stringify(user));
    setUser(user);
  };

  const checkUsername = message => {
    let username = prompt(message, '');

    if (username !== '') {
      axios
        .post(`http://localhost:3000/api/v1/user/${username}`)
        .then(res => {
          console.log('gucci', res);
          if (res.data.code === 1) {
            checkUsername(res.data.status);
          } else login(res.data[0]);
        })
        .catch(err => {
          console.log(err);
          alert(err.data.status);
          checkUsername('Please try again!');
        });
    } else checkUsername('Please enter a valid name!');
  };

  if (!user) {
    return <div>Loading...</div>;
  } else {
    return <TodoPage userid={user.id} />;
  }
};

export default App;
