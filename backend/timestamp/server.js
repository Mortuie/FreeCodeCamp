var http = require("http");
var express = require("express");
var app = express();
const PORT = 8000;

const monthMap = {0: "January", 1: "February", 2: "March", 3: "April", 4: "May", 5: "June", 6: "July", 7: "August", 8: "September", 9: "October", 10: "November", 11: "December"};

app.use(express.static("static"));
app.get("/", (req, res) => {
	res.sendFile('index.html',{root: 'app'});
});

app.get("/*", (req, res) => {
	var ans = {unix: null, natural: null};
	var check = decodeURI(req.url).substr(1);


	if (isNaN(check)) {
		var date = new Date(check);
		if (!isNaN(date.getTime())) {
			ans.unix = date.getTime() / 1000;
			ans.natural = getNatural(date);
		} 
	} else if (!isNaN(check)) {
		var input = parseInt(check);
		var date = new Date(input * 1000);
		if (!isNaN(date.getTime())) {
			ans.unix = input;
			ans.natural = getNatural(date);
		}
	} res.send(ans);

	
});

var getNatural = (date) => {
	var day = date.getDate();
	var month = monthMap[parseInt(date.getMonth())];
	var year = date.getFullYear();
	
	return month + " " + day + ", " + year;
}


var server = http.createServer(app).listen(process.env.PORT || PORT, () => {
	console.log("Listening on port: %s", (process.env.PORT || PORT));
});
