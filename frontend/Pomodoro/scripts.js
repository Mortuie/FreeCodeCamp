$(document).ready(function() {
	var nearlyFinished = false;
	var timeout = null;
	var value = 25;
	var minutes = 25;
	var seconds = 0;

	$("#minus").click(function() {
		value--;
		$("#minutes").text(value);

		if (!timeout) {
			minutes--;
			setClockFace();
		}
	});	

	$("#plus").click(function() {
		value++;
		$("#minutes").text(value);

		if (!timeout) {
			minutes++;
			setClockFace();
		} 
	});


	function countdown() {
		seconds--;

		if (!nearlyFinished) {

			if (seconds < 0) {
				seconds = 59;
				minutes--;
				value;
			}

			if (seconds < 10 && minutes === 0) {
				nearlyFinished = true;
			}

			setClockFace();
			timeout = setTimeout(countdown, 1000);
		} else {
			minutes = value;
			seconds = 0;
			setClockFace();
			$("#sound")[0].play();
		}
	}

	$("#start").click(function() {
		if (timeout !== null) {
			$("#start").text("Start");
			clearTimeout(timeout);
			timeout = null;
		} else {
			$("#start").text("Stop");
			countdown();
		}

	});


	$("#reset").click(function() {
		clearTimeout(timeout);
		timeout = null;
		minutes = value;
		seconds = 0;
		$("#start").text("Start");
		setClockFace();
	});


	function setClockFace() {
		sec = (seconds < 10) ? "0" + seconds : seconds;
		$("#clock").text(minutes + ":" + sec);
	}


	$(document).bind('keypress', function(e) {
       		if (e.which == 32){
               	$("#start").click();
            	}
    	});

});