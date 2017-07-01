$(document).ready(function() {

	var x = $("#demo");
	getLocation();



	function getLocation() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(showPosition);
		} else {
			x.text("Geolocation is not supported by this browser>");
		}
	}

	function showPosition(position) {
		getData(position.coords.latitude, position.coords.longitude);
	}

	function getData(latitude, longitude) {
		$.ajax({
			dataType: "jsonp",
			url: "https://api.darksky.net/forecast/" + config.apiKey + "/" + latitude + "," + longitude,
		}).done(function(data) {
			console.log(data);
			var temperature = data.currently.temperature;
			var windSpeed = data.currently.windSpeed;
			var where = data.currently.timezone;
			var summary = data.currently.summary;

			setData(temperature, windSpeed, where, summary);
		})
	}

	function setData(temp, wind, where, summary) {
		$("#temperature").text(Math.round(temp).toString() + " F");
		$("#wind").text(wind);
		$("#location").text(where);
		$("#summary").text(summary);
	}


	function getFarenheitFromDegrees(degrees) {
		return Math.round((parseInt(degrees) * 1.8)) + 32;
	}

	function getDegreesFromFarenheit(farenheit) {
		return Math.round(((parseInt(farenheit) - 32) / 1.8)).toString();
	}

	$("#convert").on("click", function() {
		var currentTemperature = $("#temperature").text();

		if (currentTemperature.indexOf("F") > -1) {
			$("#temperature").text(getDegreesFromFarenheit(currentTemperature.replace(" F", "")) + " C");
			$("#convert").text("Convert to Farenheit");
		} else {
			$("#temperature").text(getFarenheitFromDegrees(currentTemperature.replace(" C", "")) + " F");
			$("#convert").text("Convert to Celcius");
		}
	});

});




