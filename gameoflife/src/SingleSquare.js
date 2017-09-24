import React from 'react';
import {StyleSheet, css} from 'aphrodite';

export default class SingleSquare extends React.Component {


	render() {

		var state = (this.props.isAlive === 0) ? styles.alive : styles.dead;

		return (

			<div className={css(state, styles.box)}></div>


		);
	}
}

const styles = StyleSheet.create({
	box: {
		width: '5px',
		height: '5px',
		border: 'white solid 1px',
	},
	alive: {
		backgroundColor: 'red',
	},
	dead: {
		backgroundColor: 'white',
	},
});