$(document).ready(function() {
	var on = false;



	$("#onoff").click(function() {
		if (!on) {
			$("#onoff").text("turn off");
			on = true;
		} else {
			$("#onoff").text("turn on");
			on = false;
		}
	});


});