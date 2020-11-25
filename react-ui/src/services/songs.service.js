import Axios from "axios";
import q from "q";

export const getSong = (id) => {};

export const getSongs = () => {
	var deferred = q.defer();

	let data = [];
	const apiUrl = "/api/songs";
	Axios.get(apiUrl).then((result) => {
		// debugger;
		console.log(result);
		if (!result.data.length) {
			deferred.reject("Error retrieving songs");
		} else {
			data = result.data;
			data.forEach((i) => {
				i.actions = ["add", "edit", "remove"];
			});
			deferred.resolve(data);
		}
	});

	return deferred.promise;
};

export const addSong = ({name, artist}) => {
	var deferred = q.defer();
	const apiUrl = "/api/addSong";
	Axios.post(apiUrl, {name, artist}).then((result) => {
		console.log(result);
		if (result.data.errno) {
			deferred.reject("error adding song");
		} else {
			deferred.resolve("succesful");
		}
	});

	return deferred.promise;
};
