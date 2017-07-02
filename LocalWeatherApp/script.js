$(document).ready(function() {


	getLocation();

	function getLocation() {
		if (navigator && navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(showPosition);
		} else {
			$("#error").text("Geolocation is not supported by this browser>");
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
			var windSpeed = (data.currently.windSpeed * 1.6).toFixed(2);
			var where = data.currently.timezone;
			var summary = data.currently.summary;
            var icon = data.currently.icon;

			setData(temperature, windSpeed, where, summary, icon);
		})
	}

	function setData(temp, wind, where, summary, icon) {
		$("#temperature").text(getDegreesFromFarenheit(Math.round(temp)).toString() + " C");
		$("#wind").text(wind.toString() + " kmph");
		$("#location").text(where);
		$("#summary").text(summary);
        setBackground(icon);
	}


	function getFarenheitFromDegrees(degrees) {
		return Math.round((parseInt(degrees) * 1.8)) + 32;
	}

	function getDegreesFromFarenheit(farenheit) {
		return Math.round(((parseInt(farenheit) - 32) / 1.8)).toString();
	}

    function setBackground(icon) {
        var url;

        switch(icon) {
            case "clear-night":
            case "clear-day":
                url = 'url("media/sunny.jpg")';
                break;
            case "rain":
                url = 'url("media/rainy.jpg")';
                break;
            case "snow":
                url = 'url("media/snowy.jpg")';
                break;
            case "sleet":
                url = 'url("media/sleety.jpg")';
                break;
            case "wind":
                url = 'url("media/windy.jpg")';
                break;
            case "partly-cloudy-day":
            case "partly-cloudy-night":
            case "cloudy":
                url = 'url("media/cloudy.jpg")';
                break;
            case "fog":
                url = 'url("media/foggy.jpg")';
                break;
            default:
                url = 'url("media/generally.jpg")';
                break;

        }

        $("html").css("background-image", url);
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




