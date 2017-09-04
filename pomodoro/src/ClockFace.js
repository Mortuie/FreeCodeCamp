import React from 'react';

export default class ClockFace extends React.Component {

	constructor() {
		super();
		this.state = {
			date: Date(),
		};
	}

	componentDidMount() {
		this.interval = setInterval(() => this.setState({date: Date()}), 1000);
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	
	render() {
		var test = new Date();
		var newDate = new Date(test);
		newDate.setMinutes(test.getMinutes() + 25);
		
		return (
			<div>{newDate}</div>
		);
	}

}
