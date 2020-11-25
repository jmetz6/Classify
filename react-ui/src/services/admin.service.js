import Axios from "axios";
import q from "q";

export const getUsers = () => {
	var deferred = q.defer();

	let data = [];
	const apiUrl = "/api/admin";
	Axios.post(apiUrl).then((result) => {
		// debugger;
		console.log(result);
		if (!result.data.length) {
			deferred.result("Error retrieving users");
		} else {
			data = result.data;
			data.forEach((s) => {
				s.actions = ["edit", "remove"];
			});
			deferred.resolve(data);
		}
	});

	return deferred.promise;
};

export const addUser = ({ username, password }) => {
	var deferred = q.defer();

	return deferred.promise;
};
