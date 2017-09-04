import React from 'react';
import {StyleSheet, css} from 'aphrodite';
import ClockFace from './ClockFace.js';

// this is the main component in the whole view
export default class App extends React.Component {

	constructor() {
		super();
		this.state = {
			timer: 25,
		};
	}


	changeTimer(increment) {
		this.setState({timer: this.state.timer + increment});
	}


	render() {
    		return (
			<div>
    				<div className={css(styles.titleText)}>Pomodoro timer</div>
				<ClockFace timer={this.state.timer} />
				
				<div>
					<button onClick={() => this.changeTimer(-1)} >-</button>
					{this.state.timer}
					<button onClick={() => this.changeTimer(1)} >+</button>
				</div>
			</div>
		);
  	}

}

const styles = StyleSheet.create({
	titleText: {
		color: 'white',
		textAlign: 'center',
		marginTop: '50px',
	},
});

