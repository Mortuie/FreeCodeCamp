var http = require("http");
var express = require("express");
var app = express();
var env = require("./env.js");
var request = require("request");
var mongo = require("mongodb").MongoClient;
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


	var options = {
		url: "https://api.cognitive.microsoft.com/bing/v7.0/images/search?q=" + searchString + "&count=" + offset,
		headers: {
			"Ocp-Apim-Subscription-Key": env.api_key
		}
	};

	request(options, (err, response, body) => {
		if (err) return res.send("Problem Connection to the API");

		if (!err && response.statusCode == 200) {
			var info = JSON.parse(body).value;

			mongo.connect(env.mongo_url, (err, db) => {
				if (err) return res.send("Error connecting to mongodb....");


				var con = db.collection("lastsearches");

				con.insert({searchTerm: searchString, time: new Date()});
				db.close();
			});

			var results = [];

			for (var i = 0; i < info.length; i++) {
				var temp = {};
				temp.snippet = info[i].name;
				temp.url = info[i].webSearchUrl;
				temp.thumbnail = info[i].thumbnailUrl;
				results.push(temp);
			}

			res.json(results);


		} else {
			return res.send("Didn't get a 200 status code...");
		}
	});


});

app.get("/api/latest", (req, res) => {

	mongo.connect(env.mongo_url, (err, db) => {
		if (err) return res.send("Error connecting to mongodb....");


		var con = db.collection("lastsearches");

		con.find({}, {_id: 0}).sort({"time": -1}).toArray((err, i) => {
			if (err) return res.send("Error connecting to mongodb...");


			console.log(i);
			res.json(i);
		});

		db.close();
	});

});

app.use(express.static("static"));
app.get("/", (req, res) => {
	res.sendFile("index.html", {root: "app"});


});



var server = http.createServer(app).listen(process.env.PORT || PORT, () => {
	console.log("Listening on port: %s", process.env.PORT || PORT);
})