import Axios from "axios";
import q from "q";

export const getArtist = (id) => {};

export const getArtists = () => {
	var deferred = q.defer();

	let data = [];
	const apiUrl = "/api/artists";
	Axios.post(apiUrl).then((result) => {
		console.log(result);
		if (!result.data.length) {
			deferred.reject("error retrieving artists");
		} else {
			data = result.data;
			data.forEach((i) => {
				i.actions = ["edit", "remove"];
			});
			deferred.resolve(data);
		}
	});

	return deferred.promise;
};

export const addArtist = (sendData) => {
	var deferred = q.defer();

	const apiUrl = "/api/addArtist";
	Axios.post(apiUrl, sendData).then((result) => {
		console.log(result);
		if (result.data.errno) {
			deferred.reject("error retrieving artists");
		} else {
			deferred.resolve("sucessful");
		}
	});

	return deferred.promise;
};

export const removeArtists = ({ id }) => {
	const deferred = q.defer();
	const apiUrl = "/api/removeArtists";
	console.log("service has id " + id);
	Axios.post(apiUrl, { id }).then((result) => {
		if (result.data.errno) {
			deferred.reject("remove artists failed");
		} else {
			deferred.resolve("artists removed");
		}
	});
	return deferred.promise;
};
