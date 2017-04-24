var consoleLogOut = require("./consoleLogOut");
function route(handle, pathname, response, postData) {
	consoleLogOut.log("About to route a request for " + pathname);
	if (typeof handle[pathname] === "function") {
		handle[pathname](response, postData);
	} else {
		consoleLogOut.log("No request handler for " + pathname);
		response.writeHead(404, {"Content-type" : "text/plain"});
		response.write("404 Not Found");
		response.end();
	}
}
exports.route = route;