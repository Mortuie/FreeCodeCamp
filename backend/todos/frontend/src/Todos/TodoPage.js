import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import axios from 'axios';

const Div = styled.div`
  ${props =>
    props.strike &&
    css`
      text-decoration: line-through;
    `};
`;

const Todo = ({ todo, toggle }) => {
  console.log(todo);

  return (
    <Div strike={todo.completed} onClick={() => toggle(todo)}>
      {todo.title}
    </Div>
  );
};

const TodoPage = ({ userid }) => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/v1/todo/${userid}`)
      .then(res => {
        setTodos(res.data);
        setLoading(false);
      })
      .catch(err => console.log(err));
  }, []);

  const toggleTodo = todo => {
    console.log(todo);

    axios
      .patch(`http://localhost:3000/api/v1/todo/${todo.id}`, {
        completed: !todo.completed,
        userid
      })
      .then(res => {
        console.log(res);
        setTodos(res.data);
      })
      .catch(err => console.log(err));
  };

  if (loading) {
    return <div>Loading...</div>;
  } else if (todos === []) {
    return <div>No todos</div>;
  } else {
    return (
      <div>
        {todos.map(t => (
          <Todo key={t.id} todo={t} toggle={toggleTodo} />
        ))}
      </div>
    );
  }
};

export default TodoPage;
