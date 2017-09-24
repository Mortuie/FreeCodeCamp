import React from 'react';
import './App.css';
import Board from './Board';

export default class App extends React.Component {

	constructor() {
		super();	
		this.state = {
			width: 100,
			height: 80,
		};
	}


	render() {
		return (

			<Board width={this.state.width} height={this.state.height}/>
		
		);

	}
}