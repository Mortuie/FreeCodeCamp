import React from 'react';
import { observer } from 'mobx-react';

@observer
class Main extends React.Component {
  render() {
    const store = this.props.store;
    console.log(store);
    return (
      <div>
        <button onClick={this.newTodo}>Click me</button>
        {store.todos.map(t => (
          <ul>{t.task}</ul>
        ))}
      </div>
    );
  }

  newTodo = () => {
    this.props.store.addTodo(prompt('New todo task: ', 'example'));
  };
}

export default Main;
