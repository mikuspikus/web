var querystring = require("querystring"),
	fs = require("fs"),
	consoleLogOut = require("./consoleLogOut");

function start(response) {
	consoleLogOut.log("Request hanlder 'start' was called.");
	
	var pageBody = 
	'<html>\n' +
		'\t<head>\n' +
			'\t\t<meta charset = "UTF-8" />\n' +
			'\t\t<title>Поздравь себя, дружок!</title>\n' +
			//'\t\t<link href = "/css/style.css" type = "text/css" rel = "stylesheet">\n' +
			'\t\t<style>\n' +
			'\t\t\t html {font-family: "Comic Sans MS", cursive, sans-serif;}\n' +
			'\t\t\t body {width: 50%;max-width: 800px;min-width: 480px;margin: 0 auto;}\n' +
			'\t\t</style>\n' +
		'\t</head>\n' +
		'\t<body>\n' +
			'\t\t<h1>Получи открытку!</h1>\n' +
			'\t\t<p>Только сегодня и только для Вас!</p> \n' +
			'\t\t<form action = "/card" method = "post">\n' +
				'\t\t\t<label for = "nameField">Имя:</label>\n' +
				'\t\t\t<input type = "text" name = "nameField"/><br>\n' +
				'\t\t\t<label for = "gender">Пол:</label>\n' +
				'\t\t\t<p><input type = "radio" name = "gender" value = "male" checked = "checked">Мужской</p>\n' +
				'\t\t\t<p><input type = "radio" name = "gender" value = "female">Женский</p>\n' +
				'\t\t\t<input type = "submit" name = "submitButton" value = "Подтвердите"/>\n' +
			'\t\t</form>\n' +
		'\t</body>\n' +
	'</html>\n';
	response.writeHead(200, {"Content-type" : "text/html"});
	response.write(pageBody);
	response.end();
};

function card(response, postData) {
	consoleLogOut.log("Request hanlder 'upload' was called.");
	
	var pageHead =
	'<html>\n' +
		'\t<head>\n' +
			'\t\t<meta charset = "UTF-8" />\n' +
			'\t\t<title>Поздравь себя, дружок!</title>\n' +
			//'\t\t<link href = "/css/style.css" type = "text/css" rel = "stylesheet">\n' +
			'\t\t<style>\n' +
			'\t\t\t html {font-family: "Comic Sans MS", cursive, sans-serif;}\n' +
			'\t\t\t body {width: 50%;max-width: 800px;min-width: 480px;margin: 0 auto;}\n' +
			'\t\t</style>\n' +
		'\t</head>\n' +
		'\t<body>\n';
	
	var pageButt =
	'\t\t<form action = "/start" mathod = "post">\n' +
	'\t\t\t<input type = "submit" name = "submitButton" value = "Подтвердите">\n' +
	'\t\t</form>\n' +
	'\t</body>\n' +
	'</html>'
	
	var pageBody = "";
	
	var regexp = /^[а-яё]{1,}-?[а-яё]{1,}$/i;
	if (regexp.test(querystring.parse(postData).nameField)) {
		if (querystring.parse(postData).gender === 'female') {
			pageBody +=
			'\t\t<h1>Поздравляем тебя, ' + querystring.parse(postData).nameField + ', с 8 марта!</h1>\n' +
			'\t\t<p>Вот твоя открытка:</p>\n' +
			'\t\t<img src = "female_card" alt = "Тебя никто не любит и ты умрешь одна.">\n';
		} else {
			var gaydar = Math.floor(Math.random() * 10) + 1;
			if (gaydar === 10) {
				pageBody +=
				'\t\t<h1>Ой-ой!</h1>\n' +
				'\t\t<p>Серверный гейдар сработал на тебе, ' + querystring.parse(postData).nameField + ', определив тебя по масти куда надо!</p>\n' +
				'\t\t<p>Не волнуйся, сладкий, у дедушки подарочек есть и для такого шалунишки:</p>\n' +
				'\t\t<img src = "revealed_male" alt = "Клуб кожевенного дела два этажа вниз.">\n';
			} else {
			pageBody +=
				'\t\t<h1>Поздравляем тебя, ' + querystring.parse(postData).nameField + ', с 23 февраля!</h1>\n' +
				'\t\t<p>Вот твоя открытка:</p>\n' +
				'\t\t<img src = "/male_card" alt = "Твоя жена будет тебе изменять.">\n';
			};
		}
	} else {
		pageBody +=
		'\t\t<h1>Ошибка!</h1>\n' +
		'\t\t<p>Человек, введи нормальное имя!</p>\n';
	};
	response.writeHead(200, {"Content-type" : "text/html"});
	response.write(pageHead + pageBody + pageButt);
	response.end();
};

function male_card(response, postData) {
	consoleLogOut.log("Request handler 'male_card' was called.");
	fs.readFile("./images/male_card.png", "binary", function(error, file) {
		if (error) {
			response.writeHead(500, {"Content-Type" : "text/plain"});
			response.write(error + "\n");
			response.end();
		} else {
			response.writeHead(200, {"Content-Type" : "image/png"});
			response.write(file, "binary");
			response.end();
		};
	});
};

function lucky_male_card(response, postData) {
	consoleLogOut.log("Request handler 'male_card' was called.");
	fs.readFile("./images/lucky_male_card.jpg", "binary", function(error, file) {
		if (error) {
			response.writeHead(500, {"Content-Type" : "text/plain"});
			response.write(error + "\n");
			response.end();
		} else {
			response.writeHead(200, {"Content-Type" : "image/png"});
			response.write(file, "binary");
			response.end();
		};
	});
};

function female_card(response, postData) {
	consoleLogOut.log("Request handler 'male_card' was called.");
	fs.readFile("./images/female_card.png", "binary", function(error, file) {
		if (error) {
			response.writeHead(500, {"Content-Type" : "text/plain"});
			response.write(error + "\n");
			response.end();
		} else {
			response.writeHead(200, {"Content-Type" : "image/png"});
			response.write(file, "binary");
			response.end();
		};
	});
};


exports.start = start;
exports.card = card;
exports.male_card = male_card;
exports.lucky_male_card = lucky_male_card;
exports.female_card = female_card;