$(document).ready(function() {
	var on = false;
	var finished = false;
	var pastTurns = [];
	var turns = 0;
	var playerTurn = false;
	var count = 0;
	var playerCount = 0;


	$("#onoff").click(function() {
		if (!on) {
			$("#onoff").css("background-color", "green");
			on = true;
		} else {
			$("#onoff").css("background-color", "red");
			on = false;
		}
	});

	$("#start").click(function() {
		if (!on) {
			$("#status").text("Machine is not on!");
		} else {
			startGame();
		}
	});

	function startGame() {
		pastTurns = [];
		$("#status").text("Starting...");

		computerTurn();
	}

	function generateTurn() {
		var randomNumber = Math.round(Math.random() * 3);
		pastTurns.push(randomNumber);
	}

	function computerTurn() {
		count = 0;
		generateTurn();

		for (var i = 0; i < pastTurns.length; i++) {
			press(i);
		}
	}

	function press(i) {
		setTimeout(function() {
			$("#" + pastTurns[i]).click();
			count++;
			updateCount();
			if (i === pastTurns.length - 1) playerTurn = true;
		}, 750 * i);
	}

	function updateCount() {
		$("#status").text("Count: " + count);
	}

	$("#0").click(function() {
		console.log(playerTurn);
		if (!playerTurn) {
			$(this).addClass("active");
			setTimeout(function() {
				$(".active").removeClass("active");
			}, 500);
		} else { // player turn
			var shouldBe = pastTurns[playerCount];
			console.log("NIGGA");
			if (playerCount === count - 1) {
				playerTurn = false;
				playerCount = 0;
				computerTurn();
			}

			if (shouldBe === 0) { 
				playerCount++;
			} else { //got it wrong...
				$("#status").text("Wrong! Start over!");
				startGame();
			}
		}
	});

	$("#1").click(function() {
		if (!playerTurn) {
			$(this).addClass("active");
			setTimeout(function() {
				$(".active").removeClass("active");
			}, 500);
		} else { // player turn
			var shouldBe = pastTurns[playerCount];

			if (playerCount === count - 1) {
				playerTurn = false;
				playerCount = 0;
				computerTurn();
			}

			if (shouldBe === 1) { 
				playerCount++;
			} else { //got it wrong...
				$("#status").text("Wrong! Start over!");
				startGame();
			}
		}
	});


	$("#2").click(function() {
		if (!playerTurn) {
			$(this).addClass("active");
			setTimeout(function() {
				$(".active").removeClass("active");
			}, 500);
		} else { // player turn
			var shouldBe = pastTurns[playerCount];

			if (playerCount === count - 1) {
				playerTurn = false;
				playerCount = 0;
				computerTurn();
			}

			if (shouldBe === 2) { 
				playerCount++;
			} else { //got it wrong...
				$("#status").text("Wrong! Start over!");
				startGame();
			}
		}
	});


	$("#3").click(function() {
		if (!playerTurn) {
			$(this).addClass("active");
			setTimeout(function() {
				$(".active").removeClass("active");
			}, 500);
		} else { // player turn
			var shouldBe = pastTurns[playerCount];

			if (playerCount === count - 1) {
				playerTurn = false;
				playerCount = 0;
				computerTurn();
			}

			if (shouldBe === 3) { 
				playerCount++;
			} else { //got it wrong...
				$("#status").text("Wrong! Start over!");
				startGame();
			}
		}
	});


});