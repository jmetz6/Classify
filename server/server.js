const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const cluster = require("cluster");
const numCPUs = require("os").cpus().length;
const app = express();
const isDev = process.env.NODE_ENV !== "production";
const PORT = process.env.PORT || 5000;

var mysql = require("mysql");
const MysqlPoolBooster = require("mysql-pool-booster");
mysql = MysqlPoolBooster(mysql);

const config = {
	host: "klbcedmmqp7w17ik.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
	user: "e89vriolfxzqk4tm",
	password: "d5gtcm57uommxadt",
	database: "hlsijmpn5yktan07",
	connectionLimit: 1,
	maxIdle: 1,
	multipleStatements: true,
};

const pool = mysql.createPool(config);

console.log("Testing Connection");
pool.query("SELECT 1 + 1 AS solution", function (error, results, fields) {
	if (error) throw Error("Could not connect to DB!");
	if (results[0].solution == 2) {
		console.log("Connection GOOD!");
	} else {
		console.log("Connection BAD!");
	}
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/api/signup", (req, res) => {
	const username = req.body.username;
	const password = req.body.password;
	const sql = "INSERT INTO `users` (`username`, `password`) VALUES (?, ?)";
	pool.query(sql, [username, password], (err, result) => {
		if (err) {
			console.log(err);
			res.send(err);
		}
		res.send(result);
	});
});

app.post("/api/getUserByName", (req, res) => {
	let username = req.body.username;
	//console.log("username is " + username);
	const sql = "SELECT * FROM `users` where `username`=?";
	pool.query(sql, [username], (err, result) => {
		if (err) {
			//console.log(err);
			res.send(err);
		}
		//console.log(result);
		res.send(result);
	});
});

app.post("/api/removeUser", (req, res) => {
	let id = req.body.userID;
	let sql = "DELETE FROM `playlists` WHERE `user`=?; ";
	sql += "DELETE FROM `users` WHERE `id`=?";
	console.log("backend id is " + id);
	pool.query(sql, [id, id], (err, result) => {
		if (err) {
			console.log(err);
			res.send(err);
		}
		//console.log(result);
		res.send(result);
	});
});

app.post("/api/login", (req, res) => {
	const username = req.body.username;
	const password = req.body.password;

	const sql =
		"SELECT COUNT(*) FROM `users` where `username`=? AND `password`=?";
	pool.query(sql, [username, password], (err, result) => {
		if (err) {
			console.log(err);
			res.send(err);
		}
		res.send(result);
	});
});

app.get("/api/songs", (req, res) => {
	const sql = "SELECT * FROM `songs`";
	pool.query(sql, [], (err, result) => {
		if (err) {
			console.log(err);
			res.send(err);
		}
		res.send(result);
	});
});

app.post("/api/addSong", (req, res) => {
	const name = req.body.name;
	const artist = req.body.artist;
	if (artist) {
		let sql = "INSERT INTO `songs` (`name`) VALUES (?); ";
		sql +=
			"INSERT INTO `song_artist_associations` (`songID`, `artistID`) VALUES (";
		sql += "(SELECT `id` FROM `songs` WHERE `name`=?), ";
		sql += "(SELECT `id` FROM `artists` WHERE `name`=?))";
		pool.query(sql, [name, name, artist], (err, result) => {
			if (err) {
				console.log(err);
				res.send(err);
			}
			res.send(result);
		});
	} else {
		let sql = "INSERT INTO `songs` (`name`) VALUES (?)";
		pool.query(sql, [name], (err, result) => {
			if (err) {
				console.log(err);
				res.send(err);
			}
			res.send(result);
		});
	}
});

app.post("/api/removeSong", (req, res) => {
	const id = req.body.id;

	let sql = "DELETE FROM `playlist_song_associations` WHERE `songID`=?; ";
	sql +=
		"DELETE FROM `song_artist_associations` WHERE `songID`=?; ";
	sql += 
		"DELETE FROM `songs` WHERE `id`=?";

	pool.query(sql, [id, id, id], (err, result) => {
		if (err) {
			console.log(err);
			res.send(err);
		}
		res.send(result);
	});
});

app.post("/api/artists", (req, res) => {
	const sql = "SELECT * FROM `artists`";
	pool.query(sql, [], (err, result) => {
		if (err) {
			console.log(err);
			res.send(err);
		}
		res.send(result);
	});
});

app.post("/api/addArtist", (req, res) => {
	let name = req.body.name;
	const sql = "INSERT INTO `artists` (`name`) VALUES (?)";
	pool.query(sql, [name], (err, result) => {
		if (err) {
			console.log(err);
			res.send(err);
		}
		res.send(result);
	});
});

app.post("/api/removeArtists", (req, res) => {
	let id = req.body.id;
	let sql = "DELETE FROM `song_artist_associations` WHERE `artistID`=?; ";
	sql += "DELETE FROM `artists` WHERE `id`=?";
	console.log("backend id is " + id);
	pool.query(sql, [id, id], (err, result) => {
		if (err) {
			console.log(err);
			res.send(err);
		}
		//console.log(result);
		res.send(result);
	});
});

app.post("/api/playlists", (req, res) => {
	const sql =
		"SELECT playlists.id, playlists.name, users.username FROM `playlists` INNER JOIN `users` on users.id=playlists.user";
	pool.query(sql, [], (err, result) => {
		if (err) {
			console.log(err);
			res.send(err);
		}
		res.send(result);
	});
});

app.post("/api/addPlaylist", (req, res) => {
	let id = req.body.id;
	let name = req.body.name;
	const sql = "INSERT INTO `playlists` (`name`, `user`) VALUES (?, ?)";
	pool.query(sql, [name, id], (err, result) => {
		if (err) {
			console.log(err);
			res.send(err);
		}
		res.send(result);
	});
});

app.post("/api/playlist", (req, res) => {
	let sql = "SELECT `name` from `playlists` where `id`=?; ";
	sql +=
		"SELECT songs.id, songs.name AS songName, artists.name AS artistName FROM `songs` INNER JOIN `playlist_song_associations` ON playlist_song_associations.songID=songs.id ";
	sql +=
		"INNER JOIN `song_artist_associations` ON song_artist_associations.songID=playlist_song_associations.songID ";
	sql +=
		"INNER JOIN `artists` ON artists.id=song_artist_associations.artistID ";
	sql += "WHERE playlist_song_associations.playlistID=?";

	pool.query(sql, [req.body.id, req.body.id], (err, results) => {
		if (err) {
			console.log(err);
			res.send(err);
		}
		res.send(results);
	});
});

app.post("/api/admin", (req, res) => {
	const sql = "SELECT * FROM `users`";
	pool.query(sql, [], (err, result) => {
		if (err) {
			console.log(err);
			res.send(err);
		}
		res.send(result);
	});
});

app.post("/api/searchAll", (req, res) => {
	const searchText = req.body.searchTerm;
	let sql =
		"SELECT songs.id, songs.name AS songName, artists.name AS artistName FROM `songs` ";
	sql +=
		"INNER JOIN `song_artist_associations` ON song_artist_associations.songID=songs.id ";
	sql +=
		"INNER JOIN `artists` ON artists.id=song_artist_associations.artistID ";
	sql += "WHERE songs.name LIKE ? OR artists.name LIKE ?";

	let searchTerm = `%${searchText}%`;
	pool.query(sql, [searchTerm, searchTerm], (err, result) => {
		if (err) {
			console.log(err);
			res.send(err);
		}
		res.send(result);
	});
});

// Multi-process to utilize all CPU cores.
if (!isDev && cluster.isMaster) {
	console.error(`Node cluster master ${process.pid} is running`);

	// Fork workers.
	for (let i = 0; i < numCPUs; i++) {
		cluster.fork();
	}

	cluster.on("exit", (worker, code, signal) => {
		console.error(
			`Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`
		);
	});
} else {
	// Priority serve any static files.
	app.use(express.static(path.resolve(__dirname, "../react-ui/build")));

	// Answer API requests.
	app.get("/api", function (req, res) {
		res.set("Content-Type", "application/json");
		res.send('{"message":"Hello from the custom server!"}');
	});

	// All remaining requests return the React app, so it can handle routing.
	app.get("*", function (request, response) {
		response.sendFile(
			path.resolve(__dirname, "../react-ui/build", "index.html")
		);
	});

	app.listen(PORT, function () {
		console.error(
			`Node ${
				isDev ? "dev server" : "cluster worker " + process.pid
			}: listening on port ${PORT}`
		);
	});

	process.on("SIGINT", function () {
		console.log("Handle CTRL-C");
		pool.end();
		process.exit();
	});

	process.on("beforeExit", function () {
		console.log("End pool before exit");
		pool.end();
		process.exit();
	});
}
