import React from 'react';
import SingleSquare from './SingleSquare';
import {StyleSheet, css} from 'aphrodite';


export default class Board extends React.Component {

	constructor() {
		super();
		this.state = {
			board: null,
		};
		this.newBoard = this.newBoard.bind(this);
	}


	newBoard() {
		var tempBoard = [];

		for (var i = 0; i < this.props.height; i++) {
				tempBoard.push([]);
			for (var j = 0; j < this.props.width; j++) {
				tempBoard[i].push(Math.floor(Math.random() * 2));
			}
		}
		this.setState({board: tempBoard});
	}

	componentWillMount() {
		this.newBoard();
	}

	componentDidMount() {

		//setInterval(() => {
			var tempBoard = this.state.board;
			console.log(tempBoard);
			for (var i = 0; i < this.props.height; i++) {
				for (var j = 0; j < this.props.width; j++) {
					if (this.isAlive(j, i, tempBoard)) {
						console.log("alive");
						tempBoard[i][j] = 0;
					} else {
						console.log("dead");
						tempBoard[i][j] = 1;
					}
				}
			} this.setState({board: tempBoard});
			console.log(this.state.board);
		//}, 2000);

	}

	isAlive(x, y, board) {
		var neighbours = 0;
		for (var i = y - 1; i <= y + 1; i++) {
			for (var j = x - 1; j <= x + 1; j++) {
				if (j === x && y === i) {
					continue;
				} else if (x < 0 || x >= this.props.height || y < 0 || y >= this.props.width) {
					continue;
				} else {
					if (board[y][x] === 0) {
						neighbours++;
					}
				}
			}
		}
		
		var selfPiece = board[y][x];

		if (selfPiece === 0 && neighbours < 2) {
			return false;
		} else if (selfPiece === 0 && neighbours >= 2 && neighbours <= 3) {
			return true;
		} else if (selfPiece === 0 && neighbours > 3) {
			return false;
		} else if (selfPiece !== 0 && neighbours === 3) {
			return true;
		} return selfPiece === 0;
	}

	render() {
		var b = this.state.board;
		
		return (
			<div>
				
				{b.map(j => 
					<div className={css(styles.row)}>{j.map(i => <SingleSquare isAlive={i}/>)}</div>
				)}

			</div>
		);
	}
}

const styles = StyleSheet.create({
	row: {
		display: 'flex',
		flexDirection: 'row',
	}
});