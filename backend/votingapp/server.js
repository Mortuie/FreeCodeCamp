const http = require("http");
const express = require("express");
const app = express();

app.use(express.static("static"));
app.get("/", (req, res) => {
    res.sendFile("index.html", {root: "client"});
});


const server = http.createServer(app).listen(3000, () => {
    console.log("Listening on port:", 3000);
});