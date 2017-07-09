$(document).ready(function() {

	var regularStreamers = ["freecodecamp", "ESL_SC2", "OgamingSC2", "cretetion", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "ogaminglol"];
	var streamObject = [];
	getRegularStreamers();

	function getRegularStreamers() {
		for (var i = 0; i < regularStreamers.length; i++)  {
			var streamState = "https://wind-bow.glitch.me/twitch-api/streams/" + regularStreamers[i];
			var streamData = "https://wind-bow.glitch.me/twitch-api/users/" + regularStreamers[i];
			var channelInfo = "https://wind-bow.glitch.me/twitch-api/channels/" + regularStreamers[i];

			var temp = {};
			var name;
			var description;
			var isOnline;
			var logo;
			var url;
			streamObject.push(temp);

	


			$.getJSON(streamData, function(json) {
				//console.log(json);
				streamObject[i].name = json.name;
				temp.description = json.bio;
			});
				console.log(streamObject[i].name);

			$.getJSON(streamState, function(json) {
				//console.log(json);
				temp.isOnline = json.stream === null;
			});

			$.getJSON(channelInfo, function(json) {
				//console.log(json);
				temp.logo = json.logo;
				temp.url = json.url;
			});

			streamObject.push(temp);
		}

		console.log(streamObject);
	}

	

});
