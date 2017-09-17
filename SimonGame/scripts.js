$(document).ready(function() {
	var options = {
		0: 'red',
		1: 'blue',
		2: 'yellow',
		3: 'green',
	};
	var on = false;
	var finished = false;
	var pastTurns = [];
	var turns = 0;


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
		var whatTurn = 0;
		$("#status").text("Starting. Count: 0");


		while (!finished) {
			

		}
	}

	function computerTurn() {

	};

	function playerTurn() {

	};

	$("#red").click(function() {
		$(this).addClass("active");
		setTimeout(function() {
			$(".active").removeClass("active");
		}, 500);

	});

	$("#blue").click(function() {
		$(this).addClass("active");
		setTimeout(function() {
			$(".active").removeClass("active");
		}, 500);
	});

	$("#yellow").click(function() {
		$(this).addClass("active");
		setTimeout(function() {
			$(".active").removeClass("active");
		}, 500);
	});

	$("#green").click(function() {
		$(this).addClass("active");
		setTimeout(function() {
			$(".active").removeClass("active");
		}, 500);
	});

});