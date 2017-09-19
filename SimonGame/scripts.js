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
		finished = false;
		turns = 0;
		playerTurn = false;
		count = 0;
		playerCount = 0;

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

	function playerCountUpdate() {
		$("#status").text("Count: " + playerCount);
	}

	$("#reset").click(function() {
		$("#status").text("Restarting the game...");
		setTimeout(function() {
			startGame();
		}, 1000);
	});

	$("#0").click(function() {
		$(this).addClass("active");
		setTimeout(function() {
			$(".active").removeClass("active");
		}, 500);
		if (playerTurn) { // player turn
			var shouldBe = pastTurns[playerCount];
			if (playerCount === count - 1) {
				playerTurn = false;
				playerCount = 0;
				setTimeout(function() {
					computerTurn();
	
				}, 1000);
			}

			else if (shouldBe === 0) { 
				playerCount++;
				playerCountUpdate();
			} else if (shouldBe !== 0) { //got it wrong...
				$("#status").text("Wrong! Start over!");
				startGame();
			}
		}
	});

	$("#1").click(function() {
	$(this).addClass("active");
		setTimeout(function() {
			$(".active").removeClass("active");
		}, 500);
		if (playerTurn) { // player turn
			var shouldBe = pastTurns[playerCount];

			if (playerCount === count - 1) {
				playerTurn = false;
				playerCount = 0;

				setTimeout(function() {
	
					computerTurn();
				}, 1000);
			}

			else if (shouldBe === 1) { 
				playerCount++;
				playerCountUpdate();
			} else if (shouldBe !== 1) { //got it wrong...
				$("#status").text("Wrong! Start over!");
				startGame();
			}
		}
	});


	$("#2").click(function() {
		$(this).addClass("active");
		setTimeout(function() {
			$(".active").removeClass("active");
		}, 500);
		if (playerTurn) { // player turn
			var shouldBe = pastTurns[playerCount];

			if (playerCount === count - 1) {
				playerTurn = false;
				playerCount = 0;
				setTimeout(function() {
	
					computerTurn();
				}, 1000);
			}

			else if (shouldBe === 2) { 
				playerCount++;
				playerCountUpdate();
			} else if (shouldBe !== 2) { //got it wrong...
				$("#status").text("Wrong! Start over!");
				startGame();
			}
		}
	});


	$("#3").click(function() {
		$(this).addClass("active");
		setTimeout(function() {
			$(".active").removeClass("active");
		}, 500);
		if (playerTurn) { // player turn
			var shouldBe = pastTurns[playerCount];

			if (playerCount === count - 1) {
				playerTurn = false;
				playerCount = 0;
				setTimeout(function() {
					computerTurn();
				}, 1000);
			}

			else if (shouldBe === 3) { 
				playerCount++;
				playerCountUpdate();
			} else if (shouldBe !== 3) { //got it wrong...
				$("#status").text("Wrong! Start over!");
				startGame();
			}
		}
	});


});