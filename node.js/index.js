//node index.js
//localhost:8080

var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {};
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/card"] = requestHandlers.card;
handle["/male_card"] = requestHandlers.male_card;
handle["/revealed_male"] = requestHandlers.lucky_male_card;
handle["/female_card"] = requestHandlers.female_card;

server.start(router.route, handle);