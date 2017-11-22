var http = require("http");
var express = require("express");
var app = express();
var env = require("./env.js");
var request = require("request");
const PORT = 8000;



app.get("/api/imagesearch/*", (req, res) => {
	var input = req.url.replace("/api/imagesearch/", "").split("?");

	var searchString = input[0];
	var offset = null;

	if (input.length === 2) {
		offset = parseInt(input[1].split("=")[1]);

	} 

	if (!offset || offset <= 0) {
		offset = 10;
	}

	console.log("offset: " + offset + " searchString: " + searchString);

	var options = {
		url: "https://api.cognitive.microsoft.com/bing/v7.0/images/search?q=" + searchString + "&count=" + offset,
		headers: {
			"Ocp-Apim-Subscription-Key": "08bdd757cb144c2188c59737eebc2a90"
		}
	};

		

	request(options, (err, res, body) => {
		if (!err && res.statusCode == 200) {
			var info = JSON.parse(body);
			console.log(info.value);
		}
	});




	res.send("XD");
});

app.get("/api/latest", (req, res) => {
	res.send("BANTER");
});

var server = http.createServer(app).listen(process.env.PORT || PORT, () => {
	console.log("Listening on port: %s", process.env.PORT || PORT);
})