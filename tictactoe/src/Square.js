import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

export default class Square extends React.Component {

	constructor() {
		super();
		this.state = {
			value: null,
		};
	}


  render() {
    return (
      <button className="square" onClick={() => this.setState({value: 'X'})}>
        {this.state.value}
      </button>
    );
  }

}