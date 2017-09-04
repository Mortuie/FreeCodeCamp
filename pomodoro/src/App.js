import React from 'react';
import {StyleSheet, css} from 'aphrodite';
import ClockFace from './ClockFace.js';

// this is the main component in the whole view
export default class App extends React.Component {

	render() {
    		return (
			<div>
    				<div className={css(styles.titleText)}>Pomodoro timer</div>
					<ClockFace />
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

