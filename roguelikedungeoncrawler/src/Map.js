import React, {Component} from 'react';
import Piece from './Piece';
import {StyleSheet, css} from 'aphrodite';


export default class Map extends Component {

	componentDidMount() {
		document.addEventListener("keydown", this.keyPressed);
	}

	componentWillUnmount() {
		document.removeEventListener("keydown", this.keyPressed);
	}


	keyPressed = (e) => {
		var status = "";
		if (e.keyCode === 38) {
			var tempMap = this.state.map;

			var x = this.state.playerX;
			var y = this.state.playerY;

			var tile = tempMap[y - 1][x];


			if (tile === 1) {
				tempMap[y - 1][x] = 2;
				tempMap[y][x] = 1;
				this.setState({map: tempMap, playerY: y - 1});
			} else if (tile === 3) {


				var monsterRandomDamage = Math.floor(Math.random() * 10);

				var monsterArray = this.state.monsterArray;
				var playerHealth = this.state.playerHealth;


				for (var i = 0; i < monsterArray.length; i++) {
					if (x === monsterArray[i][0] && y - 1 === monsterArray[i][1]) { // found monster...
						monsterArray[i][2] = monsterArray[i][2] - this.state.damageInflicted;
						playerHealth -= monsterRandomDamage;
						console.log("here");
						if (monsterArray[i][2] <= 0) { // monster has died...
							tempMap[y - 1][x] = 1;
							monsterArray.splice(i, 1);
						} else if (playerHealth <= 0) {
							tempMap[y][x] = 1;
							this.setState({playerX: null, playerY: null, gameOver: true});
						}
					}

					
				}
				this.setState({map: tempMap, monsterArray: monsterArray, playerHealth: playerHealth});
			} else if (tile === 4) {
				var health = this.state.playerHealth;

				if (health <= 86) {
					this.setState({playerHealth: health + 14});
				} else {
					this.setState({playerHealth: 100});
				}

				tempMap[y - 1][x] = 2;
				tempMap[y][x] = 1;
				this.setState({map: tempMap, playerY: y - 1});
			} else if (tile === 5) {
				// loop through the array, finding the weapon, then check if it's damage is higher, if so, switch weapons, move player....

				var weaponDamage = this.state.damageInflicted;
				var weaponArray = this.state.weaponArray;

				for (var i = 0; i < weaponArray.length; i++) {
					if (x === weaponArray[i][0] && y - 1 === weaponArray[i][1]) {
						if (weaponArray[i][2] > weaponDamage) {
							weaponDamage = weaponArray[i][2];
						}
						tempMap[y - 1][x] = 2;
						tempMap[y][x] = 1;
						weaponArray.splice(i, 1);
					}
				}
				this.setState({map: tempMap, damageInflicted: weaponDamage, weaponArray: weaponArray, playerY: y - 1});
			} else if (tile === 6) {
				var monsterRandomDamage = Math.floor(Math.random() * 30);

				var bossHealth = this.state.bossHealth;
				var playerHealth = this.state.playerHealth;

				var bossX = this.state.bossX;
				var bossY = this.state.bossY;


				bossHealth -= this.state.damageInflicted;
				playerHealth -= monsterRandomDamage;

				if (bossHealth <= 0) { // monster has died...
					tempMap[y - 1][x] = 1;
				} else if (playerHealth <= 0) { // player has died....	
					tempMap[y][x] = 1;					
					status = "You have died, press play again to try again!";
					this.setState({playerX: null, playerY: null, gameOver: true});
				}

					
				this.setState({map: tempMap, playerHealth: playerHealth, bossHealth: bossHealth, status: status});
			}
		} else if (e.keyCode === 37) {
			var tempMap = this.state.map;

			var x = this.state.playerX;
			var y = this.state.playerY;

			var tile = tempMap[y][x - 1];


			if (tile === 1) {
				tempMap[y][x - 1] = 2;
				tempMap[y][x] = 1;
				this.setState({map: tempMap, playerX: x - 1});
			} else if (tile === 3) {


				var monsterRandomDamage = Math.floor(Math.random() * 10);

				var monsterArray = this.state.monsterArray;
				var playerHealth = this.state.playerHealth;


				for (var i = 0; i < monsterArray.length; i++) {
					if (x - 1 === monsterArray[i][0] && y === monsterArray[i][1]) { // found monster...
						monsterArray[i][2] = monsterArray[i][2] - this.state.damageInflicted;
						playerHealth -= monsterRandomDamage;
						if (monsterArray[i][2] <= 0) { // monster has died...
							tempMap[y][x - 1] = 1;
							monsterArray.splice(i, 1);
						} else if (playerHealth <= 0) {
							tempMap[y][x] = 1;
							this.setState({playerX: null, playerY: null, gameOver: true});
						}
					}

					
				}
				this.setState({map: tempMap, monsterArray: monsterArray, playerHealth: playerHealth}); 
			} else if (tile === 4) {
				var health = this.state.playerHealth;

				if (health <= 86) {
					this.setState({playerHealth: health + 14});
				} else {
					this.setState({playerHealth: 100});
				}

				tempMap[y][x - 1] = 2;
				tempMap[y][x] = 1;
				this.setState({map: tempMap, playerX: x - 1});
			} else if (tile === 5) {
				// loop through the array, finding the weapon, then check if it's damage is higher, if so, switch weapons, move player....

				var weaponDamage = this.state.damageInflicted;
				var weaponArray = this.state.weaponArray;

				for (var i = 0; i < weaponArray.length; i++) {
					if (x - 1 === weaponArray[i][0] && y === weaponArray[i][1]) {
						if (weaponArray[i][2] > weaponDamage) {
							weaponDamage = weaponArray[i][2];
						}
						tempMap[y][x - 1] = 2;
						tempMap[y][x] = 1;
						weaponArray.splice(i, 1);
					}
				}
				this.setState({map: tempMap, damageInflicted: weaponDamage, weaponArray: weaponArray, playerX: x - 1});
			} else if (tile === 6) {
				var monsterRandomDamage = Math.floor(Math.random() * 30);

				var bossHealth = this.state.bossHealth;
				var playerHealth = this.state.playerHealth;

				var bossX = this.state.bossX;
				var bossY = this.state.bossY;


				bossHealth -= this.state.damageInflicted;
				playerHealth -= monsterRandomDamage;

				if (bossHealth <= 0) { // monster has died...
					tempMap[y][x - 1] = 1;
				} else if (playerHealth <= 0) { // player has died....	
					tempMap[y][x] = 1;					
					status = "You have died, press play again to try again!";
					this.setState({playerX: null, playerY: null, gameOver: true});
				}

					
				this.setState({map: tempMap, playerHealth: playerHealth, bossHealth: bossHealth, status: status});
			}

		} else if (e.keyCode === 39) {
			var tempMap = this.state.map;

			var x = this.state.playerX;
			var y = this.state.playerY;

			var tile = tempMap[y][x + 1];


			if (tile === 1) {
				tempMap[y][x + 1] = 2;
				tempMap[y][x] = 1;
				this.setState({map: tempMap, playerX: x + 1});
			} else if (tile === 3) {


				var monsterRandomDamage = Math.floor(Math.random() * 10);

				var monsterArray = this.state.monsterArray;
				var playerHealth = this.state.playerHealth;


				for (var i = 0; i < monsterArray.length; i++) {
					if (x + 1 === monsterArray[i][0] && y === monsterArray[i][1]) { // found monster...
						monsterArray[i][2] = monsterArray[i][2] - this.state.damageInflicted;
						playerHealth -= monsterRandomDamage;
						if (monsterArray[i][2] <= 0) { // monster has died...
							tempMap[y][x + 1] = 1;
						} else if (playerHealth <= 0) {
							tempMap[y][x] = 1;
							this.setState({playerX: null, playerY: null, gameOver: true});
						}
					}

					
				}
				this.setState({map: tempMap, monsterArray: monsterArray, playerHealth: playerHealth});
			} else if (tile === 4) {
				var health = this.state.playerHealth;

				if (health <= 86) {
					this.setState({playerHealth: health + 14});
				} else {
					this.setState({playerHealth: 100});
				}

				tempMap[y][x + 1] = 2;
				tempMap[y][x] = 1;
				this.setState({map: tempMap, playerX: x + 1});
			} else if (tile === 5) {
				// loop through the array, finding the weapon, then check if it's damage is higher, if so, switch weapons, move player....

				var weaponDamage = this.state.damageInflicted;
				var weaponArray = this.state.weaponArray;

				for (var i = 0; i < weaponArray.length; i++) {
					if (x + 1 === weaponArray[i][0] && y === weaponArray[i][1]) {
						if (weaponArray[i][2] > weaponDamage) {
							weaponDamage = weaponArray[i][2];
						}
						tempMap[y][x + 1] = 2;
						tempMap[y][x] = 1;
						weaponArray.splice(i, 1);
					}
				}
				this.setState({map: tempMap, damageInflicted: weaponDamage, weaponArray: weaponArray, playerX: x + 1});
			} else if (tile === 6) {
				var monsterRandomDamage = Math.floor(Math.random() * 30);

				var bossHealth = this.state.bossHealth;
				var playerHealth = this.state.playerHealth;

				var bossX = this.state.bossX;
				var bossY = this.state.bossY;


				bossHealth -= this.state.damageInflicted;
				playerHealth -= monsterRandomDamage;

				if (bossHealth <= 0) { // monster has died...
					tempMap[y][x + 1] = 1;
				} else if (playerHealth <= 0) { // player has died....	
					tempMap[y][x] = 1;					
					status = "You have died, press play again to try again!";
					this.setState({playerX: null, playerY: null, gameOver: true});
				}

					
				this.setState({map: tempMap, playerHealth: playerHealth, bossHealth: bossHealth, status: status});
			}

		} else if (e.keyCode === 40) {
			var tempMap = this.state.map;

			var x = this.state.playerX;
			var y = this.state.playerY;

			var tile = tempMap[y + 1][x];


			if (tile === 1) {
				tempMap[y + 1][x] = 2;
				tempMap[y][x] = 1;
				this.setState({map: tempMap, playerY: y + 1});
			} else if (tile === 3) {


				var monsterRandomDamage = Math.floor(Math.random() * 10);

				var monsterArray = this.state.monsterArray;
				var playerHealth = this.state.playerHealth;


				for (var i = 0; i < monsterArray.length; i++) {
					if (x === monsterArray[i][0] && y + 1 === monsterArray[i][1]) { // found monster...
						monsterArray[i][2] = monsterArray[i][2] - this.state.damageInflicted;
						playerHealth -= monsterRandomDamage;
						if (monsterArray[i][2] <= 0) { // monster has died...
							tempMap[y + 1][x] = 1;
							monsterArray.splice(i, 1);
						} else if (playerHealth <= 0) {
							tempMap[y][x] = 1;
							this.setState({playerX: null, playerY: null, gameOver: true});
						}
					}
				}
				this.setState({map: tempMap, monsterArray: monsterArray, playerHealth: playerHealth});
			} else if (tile === 4) {
				var health = this.state.playerHealth;

				if (health <= 86) {
					this.setState({playerHealth: health + 14});
				} else {
					this.setState({playerHealth: 100});
				}

				tempMap[y + 1][x] = 2;
				tempMap[y][x] = 1;
				this.setState({map: tempMap, playerY: y + 1});
			} else if (tile === 5) {
				// loop through the array, finding the weapon, then check if it's damage is higher, if so, switch weapons, move player....

				var weaponDamage = this.state.damageInflicted;
				var weaponArray = this.state.weaponArray;

				for (var i = 0; i < weaponArray.length; i++) {
					if (x === weaponArray[i][0] && y + 1 === weaponArray[i][1]) {
						if (weaponArray[i][2] > weaponDamage) {
							weaponDamage = weaponArray[i][2];
						}
						tempMap[y + 1][x] = 2;
						tempMap[y][x] = 1;
						weaponArray.splice(i, 1);
					}
				}
				this.setState({map: tempMap, damageInflicted: weaponDamage, weaponArray: weaponArray, playerY: y + 1});
			} else if (tile === 6) {
				var monsterRandomDamage = Math.floor(Math.random() * 30);

				var bossHealth = this.state.bossHealth;
				var playerHealth = this.state.playerHealth;

				var bossX = this.state.bossX;
				var bossY = this.state.bossY;


				bossHealth -= this.state.damageInflicted;
				playerHealth -= monsterRandomDamage;

				if (bossHealth <= 0) { // monster has died...
					tempMap[y + 1][x] = 1;
				} else if (playerHealth <= 0) { // player has died....	
					tempMap[y][x] = 1;					
					status = "You have died, press play again to try again!";}

					
				this.setState({map: tempMap, playerHealth: playerHealth, bossHealth: bossHealth, status: status});
			}

		}
	}

	constructor() {
		super();
		this.state = {
			map: null,
			monsterArray: null,
			weaponArray: null,
			playerX: null,
			playerY: null,
			bossX: null,
			bossY: null,
			bossHealth: 300,
			damageInflicted: 10,
			playerHealth: 100,
			size: 1,
			status: "Playing the game",
			gameOver: false,
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


		for (var i = 0; i < 7; i++) {
			nodes.push(this.generateAnotherNode());
			tempMap[nodes[i][1]][nodes[i][0]] = 1;
		}

		tempMap = this.createNodes(tempMap, nodes);
		console.log(tempMap);
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

		tempMap = this.placePlayer(tempMap);
		tempMap = this.placeHealth(tempMap);
		tempMap = this.placeWeapon(tempMap);
		tempMap = this.placeMonster(tempMap);
		tempMap = this.placeBoss(tempMap);


		this.setState({map: tempMap});
	}

	placeBoss(tempMap) {
		var width = this.props.dimensions[0];
		var height = this.props.dimensions[1];


		var randWidth = Math.floor(Math.random() * width);
		var randHeight = Math.floor(Math.random() * height);

		while (tempMap[randHeight][randWidth] !== 1) {
			randWidth = Math.floor(Math.random() * width);
			randHeight = Math.floor(Math.random() * height);
		}
		tempMap[randHeight][randWidth] = 6;
		this.setState({bossX: randWidth, bossY: randHeight});
		return tempMap;
	}


	placePlayer(tempMap) {

		var width = this.props.dimensions[0];
		var height = this.props.dimensions[1];


		var randWidth = Math.floor(Math.random() * width);
		var randHeight = Math.floor(Math.random() * height);

		while (tempMap[randHeight][randWidth] !== 1) {
			randWidth = Math.floor(Math.random() * width);
			randHeight = Math.floor(Math.random() * height);
		}
		tempMap[randHeight][randWidth] = 2;
		this.setState({playerX: randWidth, playerY: randHeight});
		return tempMap;

	}

	placeMonster(tempMap) {
		var tempMonsterArray = [];

		var width = this.props.dimensions[0];
		var height = this.props.dimensions[1];

		var randWidth = Math.floor(Math.random() * width);
		var randHeight = Math.floor(Math.random() * height);

		for (var i = 0; i < 7; i++) {
			while (tempMap[randHeight][randWidth] !== 1) {
				randWidth = Math.floor(Math.random() * width);
				randHeight = Math.floor(Math.random() * height);
			}
			tempMap[randHeight][randWidth] = 3;
			tempMonsterArray.push([randWidth, randHeight, 100]);
		}
		this.setState({monsterArray: tempMonsterArray});
		return tempMap;
	}

	placeHealth(tempMap) {
		var width = this.props.dimensions[0];
		var height = this.props.dimensions[1];

		var randWidth = Math.floor(Math.random() * width);
		var randHeight = Math.floor(Math.random() * height);

		for (var i = 0; i < 20; i++) {
			while (tempMap[randHeight][randWidth] !== 1) {
				randWidth = Math.floor(Math.random() * width);
				randHeight = Math.floor(Math.random() * height);
			}
			tempMap[randHeight][randWidth] = 4;
		}
		// do I need to setState
		return tempMap;
	}

	placeWeapon(tempMap) {
		var tempWeaponArray = [];


		var width = this.props.dimensions[0];
		var height = this.props.dimensions[1];

		var randWidth = Math.floor(Math.random() * width);
		var randHeight = Math.floor(Math.random() * height);
		var randDamage = Math.floor(Math.random() * 30) + 10;

		for (var i = 0; i < 5; i++) {
			while (tempMap[randHeight][randWidth] !== 1) {
				randWidth = Math.floor(Math.random() * width);
				randHeight = Math.floor(Math.random() * height);
				randDamage = Math.floor(Math.random() * 30) + 10;
			}
			tempMap[randHeight][randWidth] = 5;
			tempWeaponArray.push([randWidth, randHeight, randDamage]);
		}
		this.setState({weaponArray: tempWeaponArray});
		return tempMap;
	}

	createNodes(tempMap, nodes) {
		var radius  = 5;
		var mapWidth = this.props.dimensions[0];
		var mapHeight = this.props.dimensions[1];


		for (var i = 0; i < nodes.length; i++) {
			var x = nodes[i][0];
			var y = nodes[i][1];

			for (var j = -5; j < 5; j++) {
				for (var k = -5; k < 5; k++) {
					tempMap[y + j][x + k] = 1;
				}
			}

		}
		return tempMap;
	}


	connectNodes(realMap, closestNodes, nodes, index) {


		function makeThickerWalkways(direction) {
			var thickness = 2;
			if (direction === "y") {
				for (var i = ((-1) * thickness); i < thickness; i++) {
					realMap[y + i][x] = 1;
				}
			} else {
				for (var i = ((-1) * thickness); i < thickness; i++) {
					realMap[y][x + i] = 1;
				}
			}
		}

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
						makeThickerWalkways("y");
					} else if (dx > 0) {
						x--, dx--;
						makeThickerWalkways("y");
					}
				} else {
					if (dy < 0) {
						y++, dy++;
						makeThickerWalkways("x");
					} else if (dy > 0) {
						y--, dy--;
						makeThickerWalkways("x");
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


		var boundaryWidth = Math.floor(width / 10);
		var boundaryHeight = Math.floor(height / 10);

		return [this.getRandomInteger(width - (2 * boundaryWidth)) + boundaryWidth, this.getRandomInteger(height - (2 * boundaryHeight)) + boundaryHeight];
	}

	square(number) {
		return number * number;
	}


	getRandomInteger(upTo) {
		return Math.floor(Math.random() * upTo);
	}

	changeSize = () => {
		if (!this.state.size) {
			this.setState({size: 1});
		} else {
			this.setState({size: 0});
		}
	}

	getView() {
		if (this.state.gameOver) {
			return <div>Game Over Retard</div>;
		} else if (this.state.playerX !== null && this.state.playerY !== null) {
			var size = this.state.size;
			var viewWidth = 2;
			var MAP = [];


			if (!size) { // big version
				MAP = this.state.map;
			} else { // small version
				for (var i = 0; i < 5; i++) {
					MAP.push([]);
					for (var j = 0; j < 5; j++) {
						MAP[i].push(0);
					}
				}

				var tempMap = this.state.map;

				var x = this.state.playerX;
				var y = this.state.playerY;

				var a = 0; // y
				var b = 0; // x

				for (var i = y - viewWidth; i <= y + viewWidth; i++) {
					for (var j = x - viewWidth; j <= x + viewWidth; j++) {
						MAP[a][b] = tempMap[i][j];
						b++;
					}
					b = 0;
					a++;
				}
			}

			return (
			<div>
				<div>Health: {this.state.playerHealth}hp</div>
				<div>Weapon damage: {this.state.damageInflicted}</div>
				<div>Status: {this.state.status}</div>
				<button onClick={() => this.changeSize()}>Change view</button>
				{MAP.map((i) => <div className={css(styles.row)}> {i.map((j) => <Piece typeOfPiece={j} size={size}/>)} </div>)}
			</div>
			);

		} else {
			return <div>Error</div>
		}

		
	}



	render() {
		return this.getView();
	}
}

const styles = StyleSheet.create({
	row: {
		display: 'flex',
		flexDirection: 'row',
	}
});