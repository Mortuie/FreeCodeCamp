var http = require("http");
var express = require("express");
var app = express();
var env = require("./env.js");
const PORT = 8000;



app.get("/api/imagesearch/*", (req, res) => {
	var input = req.url.replace("/api/imagesearch/", "").split("?");

	var searchString = input[0];
	var offset = null;

	if (input.length === 2) {
		offset = parseInt(input[1].split("=")[1]);
	}

	console.log("offset: " + offset + " searchString: " + searchString);

	res.send("XD");
});

app.get("/api/latest", (req, res) => {
	res.send("BANTER");
});

var server = http.createServer(app).listen(process.env.PORT || PORT, () => {
	console.log("Listening on port: %s", process.env.PORT || PORT);
})