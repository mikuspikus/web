var http = require("http");
var url = require("url")
var consoleLogOut = require("./consoleLogOut");

function serverStart(route, handle) {
	function onRequest(request, response) {
		var postData = "";
		var pathname = url.parse(request.url).pathname;
		
		consoleLogOut.log("Request for " + pathname + " received."); //шобы не смотреть в брозерах
		
		request.setEncoding("utf-8");
		request.addListener("data", function(postDataChunk) {
			postData += postDataChunk;
			consoleLogOut.log("Recived POST data chunk '" + postDataChunk + "'.");
		});
		request.addListener("end", function() {
			route(handle, pathname, response, postData);
		});
	}

	http.createServer(onRequest).listen(8080);
	consoleLogOut.log("Server has started.");
}

exports.start = serverStart;