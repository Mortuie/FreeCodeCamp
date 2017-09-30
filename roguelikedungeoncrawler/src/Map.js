import React, {Component} from 'react';
import Piece from './Piece';
import {StyleSheet, css} from 'aphrodite';


export default class Map extends Component {

	constructor() {
		super();
		this.k = this.k.bind(this);
	}


	componentDidMount() {
		document.addEventListener('keydown', this.k);
	}

	componentWillUnmount() {
		document.removeEventListener('keydown', this.k);
	}


	k(e) {
		console.log(e.keyCode);
	}

	render() {
		return <div>HI</div>
	}

	// constructor() {
	// 	super();
	// 	this.state = {
	// 		map: null,
	// 		playerX: null,
	// 		playerY: null,
	// 	}
	// }

	// componentDidMount(){
	// 	document.addEventListener("keydown", this.handleKeyPress);
	// 	console.log("DID DIS");
	// }

	// componentWillUnmount(){
	// 	document.removeEventListener("keydown", this.handleKeyPress);
	// 	console.log("dis triggered");
	// }


	// componentWillMount() { // generation of the map
	// 	var tempMap = [];

	// 	for (var i = 0; i < this.props.dimensions[1]; i++) { // height
	// 		tempMap.push([]);
	// 		for (var j = 0; j < this.props.dimensions[0]; j++) { // width
	// 			tempMap[i].push(0);
	// 		}
	// 	}

	// 	//console.log(tempMap);
	// 	var nodes = [];


	// 	for (var i = 0; i < 7; i++) {
	// 		nodes.push(this.generateAnotherNode());
	// 		tempMap[nodes[i][1]][nodes[i][0]] = 1;
	// 	}

	// 	tempMap = this.createNodes(tempMap, nodes);
	// 	console.log(tempMap);
	// 	//console.log(nodes);

	// 	var closest = [];

	// 	for (var i = 0; i < nodes.length; i++) {
	// 		for (var j = 0; j < 5; j++) {
	// 			if (i === j) {
	// 				continue;
	// 			} else {
	// 				var distance = this.calculateDistance(nodes[i][0], nodes[i][1], nodes[j][0], nodes[j][1]);
	// 				if (distance === 0) {
	// 					continue;
	// 				} else {
	// 					if (closest.length <= 1) {
	// 						closest.push([j, distance]);
	// 					} else {
	// 						var d1 = distance - closest[0][1];
	// 						var d2 = distance - closest[1][1]; // if negative, new distance is smaller, if bigger new distance is bigger

	// 						if (d1 < 0 && d2 < 0) { // if both smaller....find greatest difference.... i.e. bigger number
	// 							if (d1 <= d2) {
	// 								closest[0] = [j, distance];
	// 							} else {
	// 								closest[1] = [j, distance];
	// 							}
	// 						} else if (d1 < 0) {
	// 							closest[0] = [j, distance];
	// 						} else if (d2 < 0) {
	// 							closest[1] = [j, distance];
	// 						}
	// 					}
	// 				}
	// 			}
	// 			tempMap = this.connectNodes(tempMap, closest, nodes, i);
	// 		}
	// 	}

	// 	tempMap = this.placePlayer(tempMap);


	// 	this.setState({map: tempMap});
	// }

	// //handleKeyPress = (e) => {
	// //	console.log("banger");
	// 	// var tempMap = this.state.map;

	// 	// if (e.keyCode === 38) { // move player up
	// 	// 	var tile = tempMap[this.state.playerY - 1][this.state.playerX];
	// 	// 	if (tile === 1) {
	// 	// 		tempMap[this.state.playerY][this.state.playerX] = 1;
	// 	// 		tempMap[this.state.playerY - 1][this.state.playerX] = 2;
	// 	// 	}
	// 	// }
	// 	//this.setState({map: tempMap, playerY: this.state.playerY - 1});
	// //}


	// placePlayer(tempMap) {

	// 	var width = this.props.dimensions[0];
	// 	var height = this.props.dimensions[1];


	// 	var randWidth = Math.floor(Math.random() * width);
	// 	var randHeight = Math.floor(Math.random() * height);

	// 	while (tempMap[randHeight][randWidth] !== 1) {
	// 		randWidth = Math.floor(Math.random() * width);
	// 		randHeight = Math.floor(Math.random() * height);
	// 	}
	// 	tempMap[randHeight][randWidth] = 2;
	// 	this.setState({playerX: randWidth, playerY: randHeight});
	// 	return tempMap;

	// }

	// createNodes(tempMap, nodes) {
	// 	var radius  = 5;
	// 	var mapWidth = this.props.dimensions[0];
	// 	var mapHeight = this.props.dimensions[1];


	// 	for (var i = 0; i < nodes.length; i++) {
	// 		var x = nodes[i][0];
	// 		var y = nodes[i][1];

	// 		for (var j = -5; j < 5; j++) {
	// 			for (var k = -5; k < 5; k++) {
	// 				tempMap[y + j][x + k] = 1;
	// 			}
	// 		}

	// 	}
	// 	return tempMap;
	// }


	// connectNodes(realMap, closestNodes, nodes, index) {


	// 	function makeThickerWalkways(direction) {
	// 		var thickness = 2;
	// 		if (direction === "y") {
	// 			for (var i = ((-1) * thickness); i < thickness; i++) {
	// 				realMap[y + i][x] = 1;
	// 			}
	// 		} else {
	// 			for (var i = ((-1) * thickness); i < thickness; i++) {
	// 				realMap[y][x + i] = 1;
	// 			}
	// 		}
	// 	}

	// 	for (var i = 0; i < closestNodes.length; i++) {
	// 		var node = closestNodes[i];

	// 		var dx = nodes[index][0] - nodes[node[0]][0];
	// 		var dy = nodes[index][1] - nodes[node[0]][1];

	// 		var x = nodes[index][0];
	// 		var y = nodes[index][1];

	// 		while (dx !== 0 && dy !== 0) {
	// 			if (Math.abs(dx) >= Math.abs(dy)) {
	// 				if (dx < 0) {
	// 					x++, dx++;
	// 					makeThickerWalkways("y");
	// 				} else if (dx > 0) {
	// 					x--, dx--;
	// 					makeThickerWalkways("y");
	// 				}
	// 			} else {
	// 				if (dy < 0) {
	// 					y++, dy++;
	// 					makeThickerWalkways("x");
	// 				} else if (dy > 0) {
	// 					y--, dy--;
	// 					makeThickerWalkways("x");
	// 				}
	// 			}	
	// 		}

	// 	}
	// 	return realMap;

	// }

	// calculateDistance(x1, y1, x2, y2) {
	// 	return Math.sqrt(this.square(x1 + x2) + this.square(y1 + y2));
	// }

	// generateAnotherNode() {
	// 	var width = this.props.dimensions[0];
	// 	var height = this.props.dimensions[1];


	// 	var boundaryWidth = Math.floor(width / 10);
	// 	var boundaryHeight = Math.floor(height / 10);

	// 	return [this.getRandomInteger(width - (2 * boundaryWidth)) + boundaryWidth, this.getRandomInteger(height - (2 * boundaryHeight)) + boundaryHeight];
	// }

	// square(number) {
	// 	return number * number;
	// }


	// getRandomInteger(upTo) {
	// 	return Math.floor(Math.random() * upTo);
	// }



	// render() {


	// 	var MAP = this.state.map;

	// 	return (
	// 		<div>
				
	// 			{
	// 				MAP.map((i) => <div className={css(styles.row)}> {i.map((j) => <Piece typeOfPiece={j} />)} </div>)
	// 			}

	// 		</div>
	// 	);		
	// }
}

const styles = StyleSheet.create({
	row: {
		display: 'flex',
		flexDirection: 'row',
	}
});