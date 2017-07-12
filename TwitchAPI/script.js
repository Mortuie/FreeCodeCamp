$(document).ready(function() {

	var regularStreamers = ["freecodecamp", "ESL_SC2", "OgamingSC2", "cretetion", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "ogaminglol"];
	var streamObject = [];
	getRegularStreamers();
	document.getElementById("selectAll").click();

	function getRegularStreamers() {

		for (var i = 0; i < regularStreamers.length; i++)  {
			var streamState = "https://wind-bow.glitch.me/twitch-api/streams/" + regularStreamers[i];
			var streamData = "https://wind-bow.glitch.me/twitch-api/users/" + regularStreamers[i];
			var channelInfo = "https://wind-bow.glitch.me/twitch-api/channels/" + regularStreamers[i];

			var temp = {};

			getData(streamData, temp).then(temp1 => {
				getData(streamState, temp1).then(temp2 => {
					getData(channelInfo, temp2).then(temp3 => {
						streamObject.push(temp3);
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


	$("#selectAll").on("click", function() {
		for (var i = 0; i < streamObject.length; i++) {
			$("#contentContainer").append('<a class="item" href="' + streamObject[i].url + '" target="_blank">'
				+ '</a>');

		}
	});

});


