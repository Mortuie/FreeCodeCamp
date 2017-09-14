import React from 'react';

export default class ClockFace extends React.Component {

	constructor() {
		super();
		this.state = {
			seconds: 0,
		};
	}

	componentDidMount() {
		this.interval = setInterval(() => this.setState({seconds: this.state.seconds - 1}), 1000);
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	
	render() {

		if (this.state.seconds < 0) {
			this.setState({seconds: 59});
			this.props.decrease();
		}

		
		return (
			<div>
				<div>{this.props.lengthOfTimer + ':' + this.state.seconds}</div>
			</div>
		);
	}

}
