$(document).ready(function() {
	var regularStreamers = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "ogaminglol"];
	getRegularStreamers();

	function getRegularStreamers() {
		for (var i = 0; i < regularStreamers.length; i++)  {
			var url = "https://wind-bow.glitch.me/twitch-api/streams/" + regularStreamers[i];
			$.getJSON(url, function(json) {
				console.log(json);
			});
		}
	}

	

});
