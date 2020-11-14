const { createServer } = require("http");
const path = require("path");
const port = process.env.PORT || 5001;
const express = require("express");
const app = express();
const dev = app.get("env") !== "production";
const morgan = require("morgan");
const compression = require("compression");
//mysql authentication
var mysql = require("mysql");
var connection = mysql.createConnection({
	host: "classmysql.engr.oregonstate.edu",
	user: "cs340_hiewa",
	password: "7219",
	database: "cs340_hiewa",
});

//connect to the database
connection.connect((err) => {
	if (err) {
		return err;
	}
});

if (!dev) {
	app.disable("x-powered-by");
	app.use(compression());
	app.use(morgan("common"));
	app.use(express.static(path.resolve(__dirname, "build")));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "build", "index.html"));
	});
}

if (dev) {
	app.use(morgan("dev"));
}

// console.log(connection);
connection.query("SELECT 1 + 1 AS solution", function (error, results, fields) {
	if (error) throw error;
	console.log("The solution is: ", results[0].solution);
});

connection.query("SELECT * FROM `category`", function (error, results, fields) {
	if (error) throw error;
	console.log("The solution is: ", results);
});

const server = createServer(app);
app.listen(port, function (err) {
	if (err) throw err;
	console.log("Listening at port " + port + " URL: http://localhost:" + port);
});
