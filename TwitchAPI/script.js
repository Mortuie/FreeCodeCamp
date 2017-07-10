$(document).ready(function() {

	var regularStreamers = ["freecodecamp", "ESL_SC2", "OgamingSC2", "cretetion", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "ogaminglol"];
	var streamObject = [];
	getRegularStreamers();

	function getRegularStreamers() {

		for (var i = 0; i < regularStreamers.length; i++)  {
			var counter = 0;
			var streamState = "https://wind-bow.glitch.me/twitch-api/streams/" + regularStreamers[i];
			var streamData = "https://wind-bow.glitch.me/twitch-api/users/" + regularStreamers[i];
			var channelInfo = "https://wind-bow.glitch.me/twitch-api/channels/" + regularStreamers[i];

			var temp = {};

			getData(streamData, temp).then(successMessage => {
				getData(streamState, successMessage).then(successMessage => {
					getData(channelInfo, successMessage).then(successMessage => {
						streamObject.push(successMessage);
					});
				});
			});
	

		}

		console.log(streamObject);
	}

	function getData(url, temp) {
		return new Promise((resolve, reject) => {
				$.getJSON(url, function(data) {
					if (url.includes("users/")) {
						temp.name = data.name;
						temp.bio = data.bio;
					} else if (url.includes("streams/")) {
						temp.isOnline = (data.stream === null);
					} else {
						temp.logo = data.logo;
						temp.url = data.url;
					}
					resolve(temp);
				});
			});
	}

});


