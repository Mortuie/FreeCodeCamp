var http = require("http");
var express = require("express");
var app = express();
const PORT = 8000;

var getAgent = (string) => {
	var firstIndex = string.indexOf(" ") + 2;
	var lastIndex = string.indexOf(")");
	return string.substring(firstIndex, lastIndex);
}

app.use(express.static("static"));
app.get("/", (req, res) => {
	res.sendFile("index.html", {root: "app"})
});



app.get("/whoami", (req, res) => {


	var language = req.header("accept-language").split(",")[0];
	var agent = getAgent(req.header("user-agent"));
	var ip = req.header("x-forwarded-for");

	var answer = {ipaddress: ip, language: language, software: agent};


	res.end(JSON.stringify(answer));
});




var server = http.createServer(app).listen(process.env.PORT || PORT, () => {
	console.log("Listening on port: %s", process.env.PORT || PORT);
});