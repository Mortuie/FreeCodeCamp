var http = require("http");
var express = require("express");
var app = express();
const PORT = 8000;


app.get("/", (req, res) => {
	res.end(new Date().toDateString());
});

app.post("/api/:datestring", (req, res) => {
	console.log(req.params);
	res.end("BANTER");
});



var server = http.createServer(app).listen(PORT, () => {
	console.log("Listening on port: %s", PORT);
});