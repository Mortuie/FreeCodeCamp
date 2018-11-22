import React from 'react';
import ReactDOM from 'react-dom';
import { observable, computed } from 'mobx';
import * as mobx from 'mobx';
import TodoList from './TodoList';
import Main from './Main';

class ObservableTodoStore {
  @observable todos = [];
  @observable pendingRequests = 0;

  @computed get completedTodosCount() {
    return this.todos.filter(todo => todo.completed === true).length;
  }

  @computed get report() {
    if (this.todos.length === 0) return '<none>';
    return (
      `Next todo: "XD". ` +
      `Progress: ${this.completedTodosCount}/${this.todos.length}`
    );
  }

  addTodo(task) {
    this.todos.push({
      task: task,
      completed: false,
      assignee: null
    });
  }
}

const observableTodoStore = new ObservableTodoStore();

class TodoTest {
  @observable todos = [];
  @observable pendingRequests = 0;

  constructor() {
    mobx.autorun(() => console.log(this.report));
  }

  @computed get report() {
    if (this.todos.length === 0) return '<none>';
    return (
      `Next todo: "XD". ` +
      `Progress: ${this.completedTodosCount}/${this.todos.length}`
    );
  }

  addTodo(task) {
    this.todos.push({
      task: task,
      completed: false,
      assignee: null
    });
  }
}

const ObservableTodoTest = new TodoTest();

ReactDOM.render(
  <div>
    <TodoList store={observableTodoStore} />
    <Main store={ObservableTodoTest} />
  </div>,
  document.getElementById('root')
);
