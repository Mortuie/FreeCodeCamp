var http = require('http');
var express = require('express');
var app = express();
var validUrl = require('valid-url');
var hf = require("./js/helperFunctions.js");
var database = require("./db/db.js");
var mongo = require("mongodb");
var env = require("./env.js");
const PORT = 8000;
const collections = "idurlmapping";

mongo.connect(env.url, (err, db) => {
	if (err) throw err;

	db.createCollection("urlShortener");

});



app.use(express.static('static'));
app.get("/", (req, res) => {
	res.sendFile('index.html', {root: 'app'});
});

/* 
	This end point is to create a new short url. I.e. www.google.com -> 8120 (or similar)

	Has to first check if it's a valid url, if it is generate a unique short url insert into db,
	then send the response json.

	If not reply with error.
*/
app.get("/new/*", (req, res) => {
	var input = req.url.replace("/new/", "");
	
	mongo.connect(env.url, (err, db) => {
		if (err) throw err;


		if (validUrl.isUri(input)) {
			var randomNumber = hf.getRandomNumber();
			var createdData = {long_uri: input, short_uri: randomNumber};

			var collection = db.collection("urlShortener");


			// collection.find({long_uri: input}).toArray((err, docs) => console.log(docs.length));
			collection.find({long_uri: input}).toArray((err, docs) => {
				if (err) throw err;
				console.log("docs: ");
				console.log(docs);
				if (docs.length === 0) {
					console.log("HERE");

					collection.insert(createdData);


					res.send(JSON.stringify(createdData));
				} else if (docs.length === 1) {
					console.log("ELSE");
					res.send(JSON.stringify(collection.find({long_uri: input})));
				}
			});



		} else {
			res.send(JSON.stringify({error: "Not a valid URI"}));
		}



		db.close();


	});


});


/*
	This end point converts short url -> www.google.com
*/
app.get("/*", (req, res) => {
	res.send("trying...");
})




var server = http.createServer(app).listen(process.env.PORT || PORT, () => {
	console.log("Listening on port: %s", process.env.PORT || PORT);
});
