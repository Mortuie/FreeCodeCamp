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
		var startTime = new Date();
		var projectedTime = new Date();
		projectedTime.setMinutes(startTime.getMinutes() + this.props.timer);
		
		return (
			<div>
				<div>{this.props.timer}</div>
				<div>{projectedTime.getMinutes()}</div>
			</div>
		);
	}

}
