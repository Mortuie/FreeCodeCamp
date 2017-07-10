$(document).ready(function() {

	var regularStreamers = ["freecodecamp", "ESL_SC2", "OgamingSC2", "cretetion", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "ogaminglol"];
	var streamObject = [];
	getRegularStreamers();

	function getRegularStreamers() {
		$.ajaxSetup({async: false});
		for (var i = 0; i < regularStreamers.length; i++)  {
			var streamState = "https://wind-bow.glitch.me/twitch-api/streams/" + regularStreamers[i];
			var streamData = "https://wind-bow.glitch.me/twitch-api/users/" + regularStreamers[i];
			var channelInfo = "https://wind-bow.glitch.me/twitch-api/channels/" + regularStreamers[i];

			var temp = {};



			$.getJSON(streamData, function(data) {
				temp.name = data.name;
				temp.desc = data.bio;
			}).then(function() {
			});

			$.getJSON(streamState, function(data) {
				temp.isOnline = data.stream === null;
			}).then(function() {

			});

			$.getJSON(channelInfo, function(data) {
				temp.logo = data.logo;
				temp.url = data.url;
			}).then(function() {

			});


			streamObject.push(temp);
			

		}

		console.log(streamObject);
	}

	

});


