$(document).ready(function() {
	var on = false;
	var strictGame = false;
	var finished = false;
	var pastTurns = [];
	var turns = 0;
	var playerTurn = false;
	var count = 0;
	var playerCount = 0;
	var timeoutsForGameLoop = [];


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

	$("#strict").click(function() {
		if (strictGame) {
			strictGame = false;
			$("#strict").text("STRICT ON");
		} else {
			strictGame = true;
			$("#strict").text("STRICT OFF");
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
		timeoutsForGameLoop = []
	;	count = 0;
		generateTurn();

		for (var i = 0; i < pastTurns.length; i++) {
			press(i);
		}
	}

	function reloopGame() {
		timeoutsForGameLoop = [];
		count = 0;

		for (var i = 0; i < pastTurns.length; i++) {
			press(i);
		}
	}

	function press(i) {
		timeoutsForGameLoop.push(setTimeout(function() {
			$("#" + pastTurns[i]).click();
			count++;
			updateCount();
			if (i === pastTurns.length - 1) playerTurn = true;
		}, 750 * i));
	}

	function updateCount() {
		$("#status").text("Count: " + count);
	}

	function playerCountUpdate() {
		$("#status").text("Count: " + playerCount);
	}

	function clearTimeouts() {
		for (var i = 0; i < timeoutsForGameLoop.length; i++) {
			clearTimeout(timeoutsForGameLoop[i]);
		}
	}

	$("#reset").click(function() {
		$("#status").text("Restarting the game");
		setTimeout(function() {
			document.location.href = document.location.href;
		}, 1000);
	});

	$("#0").click(function() {
		$(this).addClass("active");
		setTimeout(function() {
			$(".active").removeClass("active");
		}, 500);
		if (playerTurn) { // player turn
			var shouldBe = pastTurns[playerCount];

			if (shouldBe !== 0) {
				$("#status").text("Wrong! Start over!");
				if (strictGame) {
					document.location.href = document.location.href;
				} else {
					clearTimeouts();
					setTimeout(function() {
						reloopGame();					
					}, 1000);
				}
			}

			else if (playerCount === count - 1) {
				playerCount++;
				playerCountUpdate();
				playerTurn = false;
				playerCount = 0;
				setTimeout(function() {
					computerTurn();
	
				}, 1000);
			}

			else if (shouldBe === 0) { 
				playerCount++;
				playerCountUpdate();
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

			if (shouldBe !== 1) {
				$("#status").text("Wrong! Start over!");
				if (strictGame) {
					document.location.href = document.location.href;
				} else {
					clearTimeouts();
					setTimeout(function() {
						reloopGame();					
					}, 1000);					
				}			
			}


			else if (playerCount === count - 1) {
				playerCount++;
				playerCountUpdate();
				playerTurn = false;
				playerCount = 0;

				setTimeout(function() {
					computerTurn();
				}, 1000);
			}

			else if (shouldBe === 1) { 
				playerCount++;
				playerCountUpdate();
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

			if (shouldBe !== 2) {
				$("#status").text("Wrong! Start over!");
				if (strictGame) {
					document.location.href = document.location.href;
				} else {
					clearTimeouts();
					setTimeout(function() {
						reloopGame();					
					}, 1000);				
				}
			} 

			else if (playerCount === count - 1) {
				playerCount++;
				playerCountUpdate();
				playerTurn = false;
				playerCount = 0;
				setTimeout(function() {
	
					computerTurn();
				}, 1000);
			}

			else if (shouldBe === 2) { 
				playerCount++;
				playerCountUpdate();
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

			if (shouldBe !== 3) { // got it wrong
				$("#status").text("Wrong! Start over!");
				if (strictGame) {
					document.location.href = document.location.href;
				} else {
					clearTimeouts();
					setTimeout(function() {
						reloopGame();					
					}, 1000);					
				}
			}

			else if (playerCount === count - 1) {
				playerCount++;
				playerCountUpdate();
				playerTurn = false;
				playerCount = 0;
				setTimeout(function() {
					computerTurn();
				}, 1000);
			}

			else if (shouldBe === 3) { 
				playerCount++;
				playerCountUpdate();
			}
		}
	});
});