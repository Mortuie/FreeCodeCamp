var http = require("http");
var express = require("express");
var app = express();
const PORT = 8000;

const monthMap = {0: "January", 1: "February", 2: "March", 3: "April", 4: "May", 5: "June", 6: "July", 7: "August", 8: "September", 9: "October", 10: "November", 11: "December"};


app.get("/", (req, res) => {

	res.end(new Date().toDateString());
});

app.post("/:datestring", (req, res) => {
	var ans = {unix: null, natural: null};
	var check = decodeURI(req.params.datestring);

	var date = null;
	if (isNumber(check)) {
		date = new Date(Number(check) * 1000);
		console.log("num");
	} else if (!isDate(check)) {
		console.log("date");
		date = new Date(check);
	} else {
		res.end(JSON.stringify(ans));
	}


	var day = date.getDate();
	var month = monthMap[Number(date.getMonth())];
	var year = date.getUTCFullYear();
	console.log(new Date(check).getUTCFullYear());
	var unix = Date.now(date);
	console.log("unix: " + unix);

	ans.unix = unix;
	ans.natural = "" + month + " " + day + ", " + year; 

	res.end(JSON.stringify(ans));

	
});

var isNumber = (toCheck) => {
	return !isNaN(parseInt(toCheck));
}

var isDate = (toCheck) => {
	console.log("Invalid Date" !== new Date(toCheck));
	return (new Date(toCheck) !== "Invalid Date");
}


var server = http.createServer(app).listen(PORT, () => {
	console.log("Listening on port: %s", PORT);
});