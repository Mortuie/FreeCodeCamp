$(document).ready(function() {

	var x = $("#demo");
	getLocation();



	function getLocation() {
		if (navigator.geolocation) {
			x.text("testing");
			navigator.geolocation.getCurrentPosition(showPosition);
		} else {
			x.text("Geolocation is not supported by this browser>");
		}
	}

	function showPosition(position) {
		var latitude = position.coords.latitude;
		var longitude = position.coords.longitude;

		getData(latitude, longitude);
	}

	function getData(latitude, longitude) {
		$.ajax({
			dataType: "jsonp",
			url: "https://api.darksky.net/forecast/" + config.apiKey + "/" + latitude + "," + longitude,
		}).done(function(data) {
			console.log(data);
		})
	}





});




