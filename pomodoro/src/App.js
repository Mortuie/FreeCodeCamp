import React from 'react';
import {StyleSheet, css} from 'aphrodite';
import ClockFace from './ClockFace.js';

// this is the main component in the whole view
export default class App extends React.Component {

	constructor() {
		super();
		this.state = {
			lengthOfTimer: 25,
			dummyTimer: 25,
		};
	}


	changelengthOfTimer(increment) {
		this.setState({lengthOfTimer: this.state.lengthOfTimer + increment});
		this.setState({dummyTimer: this.state.lengthOfTimer});
	}


	decrease() {
		this.setState({dummyTimer: this.state.dummyTimer - 1});
	}


	render() {
    		return (
			<div>
    				<div className={css(styles.titleText)}>Pomodoro lengthOfTimer</div>
				<ClockFace lengthOfTimer={this.state.dummyTimer} decrease={this.decrease}/>
				
				<div>
					<button onClick={() => this.changelengthOfTimer(-1)} >-</button>
					{this.state.lengthOfTimer}
					<button onClick={() => this.changelengthOfTimer(1)} >+</button>
				</div>

				<div className={css(styles.side)}>
					<button onClick={() => this.decrease()}>Start/Stop</button>
					<button>Reset</button>
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
	side: {
		display: 'flex',
	},
});

