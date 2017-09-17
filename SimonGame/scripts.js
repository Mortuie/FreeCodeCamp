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

		computerTurn(0);
	}

	function generateTurn() {
		var randomNumber = Math.round(Math.random() * 3);
		pastTurns.push(randomNumber);
		console.log(pastTurns);
	}

	function computerTurn(i) {
		// loop through array... make it a whole turn...
		count++;
		if (i === 0) generateTurn();

			$("#" + pastTurns[i++]).click();
			if (i < pastTurns.length) {
				setTimeout(function() {
					computerTurn(i);
				}, 750);
			}
		playerTurn = true;
		updateCount();
	}

	function updateCount() {
		$("#status").text("Count: " + count);
	}

	$("#0").click(function() {
		if (!playerTurn) {
			$(this).addClass("active");
			setTimeout(function() {
				$(".active").removeClass("active");
			}, 500);
		} else { // player turn
			var shouldBe = pastTurns[playerCount];
			playerTurn = false;
			if (shouldBe === 0) { 
				playerCount++;
				computerTurn(0);
			} else { //got it wrong...
				$("#status").text("Wrong! Start over!");
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
			playerTurn = false;
			if (shouldBe === 1) { 
				playerCount++;
				computerTurn(0);
			} else { //got it wrong...
				$("#status").text("Wrong! Start over!");
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
			playerTurn = false;
			if (shouldBe === 2) { 
				playerCount++;
				computerTurn(0);
			} else { //got it wrong...
				$("#status").text("Wrong! Start over!");
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
			playerTurn = false;
			if (shouldBe === 3) { 
				playerCount++;
				computerTurn(0);
			} else { //got it wrong...
				$("#status").text("Wrong! Start over!");
			}
		}
	});

});