import React from 'react';
import { observer } from 'mobx-react';

@observer
class Main extends React.Component {
  render() {
    const store = this.props.store;
    console.log(store);
    return (
      <div>
        {store.loggedIn && <div>Logged in...</div>}
        <button onClick={this.login}>Click me</button>
      </div>
    );
  }

  login = () => {
    if (this.props.store.loggedIn) {
      this.props.store.user = null;
    } else {
      this.props.store.user = 'hello world';
    }
  };
}

export default Main;
