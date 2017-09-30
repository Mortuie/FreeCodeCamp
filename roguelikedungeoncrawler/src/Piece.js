import React, {Component} from 'react';
import {StyleSheet, css} from 'aphrodite';

export default class Piece extends Component {


	render() {
		var style;
		var size;

		switch (this.props.typeOfPiece) {
			case 0: 
				style = styles.black;
				break;
			case 1:
				style = styles.red;
				break;
			case 2:
				style = styles.blue;
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
	}

});