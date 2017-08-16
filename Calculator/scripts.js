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
		$(".current").text(total);
	});

	$("#mul").click(function() {
		getCurrentValue();
		currentCalculation = parseInt(current) * total;
		$(".current").text(currentCalculation);
		total = currentCalculation;
		$(".total").text(total);
	});

	$("#plu").click(function() {
		getCurrentValue();
		currentCalculation = parseInt(current) + total;
		$(".current").text(0);
		total = currentCalculation;
		$(".total").text(total);
	});

	$("#div").click(function() {
		getCurrentValue();
		currentCalculation = parseInt(current) / total;
		$(".current").text(0);
		total = currentCalculation;
		$(".total").text(total);
	})

	function addToValue(newVal) {
		if (newVal === "0") {
			if (current !== "0") {
				$(".current").text(current + newVal);
			}
		} else if (current === '0') {
			if (newVal === ".") {
				$(".current").text("0" + newVal);
			} else {
				$(".current").text(newVal);
			}
		} else {
			$(".current").text(current + newVal);
		}
	}

	function getCurrentValue() {
		current = $(".current").text();
	}


});
