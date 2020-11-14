var port = process.env.PORT || 3001;
var fs = require("fs");
const express = require("express");
const app = express();

var mysql = require("mysql");
var connection = mysql.createConnection({
	host: "classmysql.engr.oregonstate.edu",
	user: "cs340_hiewa",
	password: "7219",
	database: "cs340_hiewa",
});

connection.connect((err) => {
	if (err) {
		return err;
	}
});
// console.log(connection);
connection.query("SELECT 1 + 1 AS solution", function (error, results, fields) {
	if (error) throw error;
	console.log("The solution is: ", results[0].solution);
});

connection.query("SELECT * FROM `category`", function (error, results, fields) {
	if (error) throw error;
	console.log("The solution is: ", results);
});

app.listen(port, function (err) {
	if (err) throw err;
	console.log("Listening at port " + port + " URL: http://localhost:" + port);
});
