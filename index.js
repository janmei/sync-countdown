var express = require("express");
var app = express();
var http = require("http").createServer(app);
var io = require("socket.io")(http, { pingInterval: 1000 });

app.use(express.static("static"));

app.get("/", function(req, res) {
	res.sendFile(__dirname + "/front/index.html");
});

app.get("/back", function(req, res) {
	res.sendFile(__dirname + "/back/index.html");
});

io.on("connection", function(socket) {
	console.log("a user connected");

	socket.on("start", () => {
		console.log("start");

		socket.broadcast.emit("starttrack");
	});
	socket.on("stop", () => {
		console.log("stop");
		socket.broadcast.emit("stoptrack");
	});
});

http.listen(8080, function() {
	console.log("listening on *:8080");
});
