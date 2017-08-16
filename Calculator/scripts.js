$(document).ready(function() {

	var screen;
	var total = 0;

	$("#1").click(function() {
		getCurrentValue();
		addToValue(1);
	});

	$("#2").click(function() {
		getCurrentValue();
		addToValue(2);
	});

	$("#3").click(function() {
		getCurrentValue();
		addToValue(3);
	});

	$("#4").click(function() {
		getCurrentValue();
		addToValue(4);
	});

	$("#5").click(function() {
		getCurrentValue();
		addToValue(5);
	});

	$("#6").click(function() {
		getCurrentValue();
		addToValue(6);
	});

	$("#7").click(function() {
		getCurrentValue();
		addToValue(7);
	});

	$("#8").click(function() {
		getCurrentValue();
		addToValue(8);
	});

	$("#9").click(function() {
		getCurrentValue();
		addToValue(9);
	});

	$("#0").click(function() {
		getCurrentValue();
		addToValue(0);
	});

	$("#dec").click(function() {
		getCurrentValue();
		addToValue(".");
	});

	$("#reset").click(function() {
		$(".screen").text("0");
		total = 0;
	});

	$("#clear").click(function() {
		$(".screen").text("0");
	});

	$("#equ").click(function() {
		$(".screen").text(total);
	});

	function addToValue(newVal) {
		if (newVal === "0") {
			if (screen !== "0") {
				$(".screen").text(screen + newVal);
			}
		} else if (screen === '0') {
			if (newVal === ".") {
				$(".screen").text("0" + newVal);
			} else {
				$(".screen").text(newVal);
			}
		} else {
			$(".screen").text(screen + newVal);
		}
	}

	function getCurrentValue() {
		screen = $(".screen").text();
	}


});
