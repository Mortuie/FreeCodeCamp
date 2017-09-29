import React, { Component } from 'react';
import Map from './Map';

export default class App extends Component {

	constructor() {
		super();
		this.state = {
			width: 100,
			height: 100,
		}
	}





	render() {
		return (
			<div>
				<Map dimensions={[this.state.width, this.state.height]}/>
			</div>
		);
	}
}

