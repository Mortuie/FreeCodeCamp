var http = require("http");
var mongo = require("mongodb").MongoClient;
var express = require("express");
var validUrl = require('valid-url');
var url = require("./env.js");
var app = express();
var PORT = 8000;



app.get("/new/*", (req, res) => {
	var input = req.url.replace("/new/", "");
	mongo.connect(url.u, (err, db) => {
		if (err) throw err;



		console.log("Connected to MongoDB: %s", url);
		var con = db.collection("idurlmapping");

		con.count().then(count => {


			if (validUrl.isUri(input)) {

				con.find({long: input}).toArray((err, i) => {
					if (err) throw err;

					if (i.length === 1) {
						var ans = {};
						ans.long = i[0].long;
						ans.short = i[0].short;
						res.send(JSON.stringify(ans));
					} else {
						var ans = {};
						ans.long = input;
						ans.short = count.toString();
						con.insert(ans);
						var ans2 = {long: input, short: count.toString()};
						res.send(JSON.stringify(ans2));
					}
				});


			} else {
				res.send("Invalid URI....");
			}

		});
	});
});


app.get("/*", (req, res) => {

	var input = req.url.replace("/", "");

	mongo.connect(url.u, (err, db) => {
		var con = db.collection("idurlmapping");

		con.find({short: input}).toArray((err, i) => {
			if (i.length === 0) {
				res.send("Invalid query, please check you entered the right code!");
			} else {
				res.redirect(i[0].long);
			}

		});

	});

});


var server = http.createServer(app).listen(PORT);