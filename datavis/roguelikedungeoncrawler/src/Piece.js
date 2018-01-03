import React, {Component} from 'react';
import {StyleSheet, css} from 'aphrodite';

export default class Piece extends Component {


	render() {
		var style;
		var size;

		switch (this.props.typeOfPiece) {
			case 0: // wall
				style = styles.black;
				break;
			case 1: // walkway
				style = styles.red;
				break;
			case 2: // player
				style = styles.blue;
				break;
			case 3: // monster
				style = styles.yellow;
				break;
			case 4: // health
				style = styles.green;
				break;
			case 5: // weapon
				style = styles.cyan;
				break;
			case 6:
				style = styles.grey;
				break;
			default:
				style = styles.black;
				break;
		}

		switch (this.props.size) {
			case 0:
				size = styles.boxSmall;
				break;
			case 1:
				size = styles.boxBig;
				break;
			default:
				size = styles.boxSmall;
				break;
		}



		return <div className={css(style, size)}></div>;
	}
}

const styles = StyleSheet.create({
	boxSmall: {
		width: '5px',
		height: '5px',
	},
	boxBig: {
		width: '25px',
		height: '25px',
	},
	black: {
		backgroundColor: 'black',
	},
	red: {
		backgroundColor: 'red',
	},
	blue: {
		backgroundColor: 'blue',
	},
	yellow: {
		backgroundColor: 'yellow',
	},
	cyan: {
		backgroundColor: 'cyan',
	},
	green: {
		backgroundColor: 'green',
	},
	grey: {
		backgroundColor: 'grey',
	},
});