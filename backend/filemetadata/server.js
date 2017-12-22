var express = require("express");
var http = require("http");
var app = express();
var multer = require("multer");
var upload = multer({dest: "uploads/"}).single("myFile");
var PORT = 8000;


app.use(express.static("static"));
app.get("/", (req, res) => {
	res.sendFile("index.html", {root: "app"});
});


app.post("/uploadfile", (req, res) => {

	upload(req, res, (err) => {
		if (err) return res.send("Error");
		res.send(JSON.stringify({size: req.file.size}));
	});


});

var server = http.createServer(app).listen(process.env.PORT || PORT, () => {
	console.log("Listening on port: %s", process.env.PORT || PORT);
});