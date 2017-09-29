import React, {Component} from 'react';
import Piece from './Piece';
import {StyleSheet, css} from 'aphrodite';


export default class Map extends Component {

	constructor() {
		super();
		this.state = {
			map: null,
		}
	}


	componentWillMount() { // generation of the map
		var tempMap = [];

		for (var i = 0; i < this.props.dimensions[1]; i++) { // height
			tempMap.push([]);
			for (var j = 0; j < this.props.dimensions[0]; j++) { // width
				tempMap[i].push(0);
			}
		}

		//console.log(tempMap);
		var nodes = [];


		for (var i = 0; i < 5; i++) {
			nodes.push(this.generateAnotherNode());
			tempMap[nodes[i][1]][nodes[i][0]] = 1;
		}

		//console.log(nodes);

		var closest = [];

		for (var i = 0; i < nodes.length; i++) {
			for (var j = 0; j < 5; j++) {
				if (i === j) {
					continue;
				} else {
					var distance = this.calculateDistance(nodes[i][0], nodes[i][1], nodes[j][0], nodes[j][1]);
					if (distance === 0) {
						continue;
					} else {
						if (closest.length <= 1) {
							closest.push([j, distance]);
						} else {
							var d1 = distance - closest[0][1];
							var d2 = distance - closest[1][1]; // if negative, new distance is smaller, if bigger new distance is bigger

							if (d1 < 0 && d2 < 0) { // if both smaller....find greatest difference.... i.e. bigger number
								if (d1 <= d2) {
									closest[0] = [j, distance];
								} else {
									closest[1] = [j, distance];
								}
							} else if (d1 < 0) {
								closest[0] = [j, distance];
							} else if (d2 < 0) {
								closest[1] = [j, distance];
							}
						}
					}
				}
				tempMap = this.connectNodes(tempMap, closest, nodes, i);
			}
		}
		this.setState({map: tempMap});
	}


	connectNodes(realMap, closestNodes, nodes, index) {

		for (var i = 0; i < closestNodes.length; i++) {
			var node = closestNodes[i];

			var dx = nodes[index][0] - nodes[node[0]][0];
			var dy = nodes[index][1] - nodes[node[0]][1];

			var x = nodes[index][0];
			var y = nodes[index][1];

			while (dx !== 0 && dy !== 0) {
				if (Math.abs(dx) >= Math.abs(dy)) {
					if (dx < 0) {
						x++, dx++;
						realMap[y][x] = 1;
					} else if (dx > 0) {
						x--, dx--;
						realMap[y][x] = 1;
					}
				} else {
					if (dy < 0) {
						y++, dy++;
						realMap[y][x] = 1;
					} else if (dy > 0) {
						y--, dy--;
						realMap[y][x] = 1;
					}
				}	
			}

		}
		return realMap;

	}

	calculateDistance(x1, y1, x2, y2) {
		return Math.sqrt(this.square(x1 + x2) + this.square(y1 + y2));
	}

	generateAnotherNode() {
		var width = this.props.dimensions[0];
		var height = this.props.dimensions[1];


		var boundaryWidth = Math.floor(width / 3);
		var boundaryHeight = Math.floor(height / 3);


		return [this.getRandomInteger(boundaryWidth) + boundaryWidth, this.getRandomInteger(boundaryHeight) + boundaryHeight];
	}

	square(number) {
		return number * number;
	}


	getRandomInteger(upTo) {
		return Math.floor(Math.random() * upTo);
	}



	render() {

		console.log(this.props.dimensions); // width x height
		console.log(this.state.map);

		var MAP = this.state.map;

		return (
			<div>
				
				{
					MAP.map((i) => <div className={css(styles.row)}> {i.map((j) => <Piece typeOfPiece={j} />)} </div>)
				}





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