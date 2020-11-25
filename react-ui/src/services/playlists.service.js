import Axios from "axios";
import q from "q";

export const getPlaylists = ({ id }) => {
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

			deferred.resolve([data, playlistName]);
		}
	});

	return deferred.promise;
};
