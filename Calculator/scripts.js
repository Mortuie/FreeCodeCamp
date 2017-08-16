$(document).ready(function() {

	var current;
	var currentCalculation;
	var lastEquals = false;
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
		$(".current").text("0");
		$(".total").text("0");
		total = 0;
	});

	$("#clear").click(function() {
		$(".current").text("0");
	});

	$("#equ").click(function() {
		$(".current").text("TOTAL: " + total);
		lastEquals = true;
	});

	$("#mul").click(function() {
		getCurrentValue();
		currentCalculation = parseFloat(current) * total;
		$(".current").text(currentCalculation.toString());
		total = currentCalculation;
		$(".total").text(total);
	});

	$("#plu").click(function() {
		getCurrentValue();
		currentCalculation = parseFloat(current) + total;
		$(".current").text("0");
		total = currentCalculation;
		$(".total").text(total.toString());
	});

	$("#div").click(function() {
		getCurrentValue();
		if (current === "0" || current === 0) {
			$(".errorBox").css("color", "red");
		} else {
			currentCalculation = total / parseFloat(current);
			$(".current").text("0");
			total = currentCalculation;
			$(".total").text(total.toString());
		}
	})

	function addToValue(newVal) {
		getRidOfError()
		if (newVal === "0") {
			if (current !== "0") {
				$(".current").text((current + newVal).toString());
			}
		} else if (current === '0') {
			if (newVal === ".") {
				$(".current").text("0" + newVal.toString());
			} else {
				$(".current").text(newVal.toString());
			}
		} else {
			$(".current").text((current + newVal).toString());
		}
	}

	function getCurrentValue() {
		current = (!lastEquals) ? $(".current").text() : "0";
		lastEquals = false;
	}

	function getRidOfError() {
		$(".errorBox").css("color", "#1C2224");
	}


});
