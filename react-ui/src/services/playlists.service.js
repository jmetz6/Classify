import Axios from "axios";
import q from "q";

export const getPlaylist = ({ id }) => {
	var deferred = q.defer();

	let data = [];
	const apiUrl = "/api/playlist";
	// let id = props.match.params.playlistId;
	Axios.post(apiUrl, { id: id }).then((result) => {
		console.log(result);
		if (!result.data.length) {
			deferred.reject("Error retrieving songs");
		} else {
			data = result.data;
			let playlistName = data[0][0].name; //the first query's first parameter of the data

			data = data[1];
			data.forEach((i) => {
				i.actions = ["remove"];
			});

			deferred.resolve({ results: data, playlistName: playlistName });
		}
	});

	return deferred.promise;
};

export const getPlaylists = () => {
	var deferred = q.defer();

	let data;
	const apiUrl = "/api/playlists";
	Axios.post(apiUrl).then((result) => {
		console.log(result);
		if (!result.data.length) {
			deferred.reject("Error retrieving playlists");
		} else {
			data = result.data;

			data.forEach((i) => {
				i.actions = ["select", "edit", "remove"];
			});

			deferred.resolve(data);
		}
	});

	return deferred.promise;
};

export const addPlaylist = ({ name, id }) => {
	var deferred = q.defer();

	const apiUrl = "/api/addPlaylist";
	Axios.post(apiUrl, { name, id }).then((result) => {
		console.log(result);
		if (result.data.errno) {
			deferred.reject("Error retrieving playlist");
		} else {
			deferred.resolve(result);
		}
	});

	return deferred.promise;
};
export const removePlaylist = ({ id }) => {
	var deferred = q.defer();

	const apiUrl = "/api/removePlaylist";
	Axios.post(apiUrl, { id }).then((result) => {
		console.log(result);
		if (result.data.errno) {
			deferred.reject("Error removing playlist");
		} else {
			deferred.resolve("Success");
		}
	});

	return deferred.promise;
};

export const removeSongFromPlaylist = ({ sid, pid }) => {
	const deferred = q.defer();
	const apiUrl = "/api/removeSongFromPlaylist";
	console.log("service has id " + sid, pid);
	Axios.post(apiUrl, { sid: sid, pid: pid }).then((result) => {
		if (result.data.errno) {
			deferred.reject("remove song from playlist failed");
		} else {
			deferred.resolve("song removed");
		}
	});
	return deferred.promise;
};

export const addSongToPlaylist = ({ sid, playlistName }) => {
	const deferred = q.defer();
	const apiUrl = "/api/addSongToPlaylist";
	Axios.post(apiUrl, { sid, playlistName }).then((result) => {
		if (result.data.errno) {
			deferred.reject("add song to playlist failed");
		} else {
			deferred.resolve("song added to playlist");
		}
	});
	return deferred.promise;
};
