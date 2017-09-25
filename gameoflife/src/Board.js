import React from 'react';
import SingleSquare from './SingleSquare';
import {StyleSheet, css} from 'aphrodite';


export default class Board extends React.Component {

	constructor() {
		super();
		this.state = {
			board: null,
			generation: 0,
			interval: null,
		};
		this.newBoard = this.newBoard.bind(this);
		this.isAlive = this.isAlive.bind(this);
	}

	componentWillMount() {
		this.newBoard();
	}

	newBoard() {
		var tempBoard = [];
		for (var i = 0; i < this.props.height; i++) {
			tempBoard.push([]);
			for (var j = 0; j < this.props.width; j++) {
				tempBoard[i].push(Math.floor(Math.random() * 2));
			}
		} 
		this.setState({board: tempBoard, generation: 0});
	}

	componentDidMount() {
		this.start();
	}

	change = (j, i) => {
		var grid = this.state.board;
		grid[j][i] = (grid[j][i] === 0) ? 1 : 0;
		this.setState({board: grid});
	}


	start = () => {
		var inter = setInterval(() => {
			var newBoard = [];

			for (var i = 0; i < this.props.height; i++) {
				newBoard.push([]);
				for (var j = 0; j < this.props.width; j++) {
					if (this.isAlive(i, j)) {
						newBoard[i].push(0);
					} else {
						newBoard[i].push(1);
					}
				}
			}
			this.setState({board: newBoard, generation: this.state.generation + 1});
		}, 500);
		this.setState({interval: inter});
	}

	stop = () => {
		clearInterval(this.state.interval);
	}

	startNewGame = () => {
		this.stop();
		this.newBoard();
		this.start();
	}

	clear = () => {
		this.stop();

		var tempBoard = [];
		for (var i = 0; i < this.props.height; i++) {
			tempBoard.push([]);
			for (var j = 0; j < this.props.width; j++) {
				tempBoard[i].push(1);
			}
		} 
		this.setState({board: tempBoard, generation: 0});
	}


	isAlive(i, j) {
		var neighbours = 0;
		var cell = this.state.board[i][j];

		for (var y = i - 1; y <= i + 1; y++) {
			for (var x = j - 1; x <= j + 1; x++) {
				if (x === j && y === i) {
					continue;
				} else if (x < 0 || y < 0 || x >= this.props.width || y >= this.props.height) {
					continue;
				} else if (this.state.board[y][x] === 0) {
					neighbours++;
				}
			}
		}

		if (cell === 0 && neighbours < 2) {
			return false;
		} else if (cell === 0 && (neighbours === 2 || neighbours ===  3)) {
			return true;
		} else if (cell === 0 && neighbours > 3) {
			return false;
		} else if (cell !== 0 && neighbours === 3) {
			return true;
		} return cell;
	}


	render() {
		var b = this.state.board;
		return (
			<div>
				<div>{"Generations: " + this.state.generation}</div>
				{Object.keys(b).map(j => <div className={css(styles.row)}>{Object.keys(b[j]).map(i => <SingleSquare i={i} j={j} clickSquare={this.change} isAlive={b[j][i]}/>)}</div>)}
				<button onClick={this.stop}>Stop</button>
				<button onClick={this.start}>Start</button>
				<button onClick={this.startNewGame}>New Game</button>
				<button onClick={this.clear}>Clear Game</button>
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