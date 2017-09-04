import React from 'react';

export default class ClockFace extends React.Component {
	
	render() {
		return (
			<div>{this.props.time}</div>
		);
	}

}
