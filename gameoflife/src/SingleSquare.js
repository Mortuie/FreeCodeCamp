import React from 'react';
import {StyleSheet, css} from 'aphrodite';

export default class SingleSquare extends React.Component {


	render() {

		var state = (this.props.isAlive) ? styles.alive : styles.dead;

		return (

			<div className={css(state, styles.box)}></div>


		);
	}
}

const styles = StyleSheet.create({
	box: {
		width: '10px',
		height: '10px',
	},
	alive: {
		backgroundColor: 'red',
	},
	dead: {
		backgroundColor: 'black',
	},
});