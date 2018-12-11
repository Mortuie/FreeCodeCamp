import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const TodoPage = ({ userid }) => {
  useEffect(() => {
    console.log(userid);
    axios
      .get(`http://localhost:3000/api/v1/todo/${userid}`)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }, []);

  return <div>Hello World!</div>;
};

export default TodoPage;
