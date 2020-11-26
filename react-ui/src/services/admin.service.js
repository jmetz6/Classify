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
			deferred.reject("Error retrieving users");
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

export const getUserByName = ({ username }) => {
	var deferred = q.defer();

	const apiUrl = "/api/getUserByName";
	Axios.post(apiUrl, { username }).then((result) => {
		console.log(result);
		if (!result.data.length) {
			deferred.reject("Error retrieving users");
		} else {
			deferred.resolve(result.data);
		}
	});
	return deferred.promise;
};

export const addUser = ({ username, password }) => {
	const deferred = q.defer();
	const apiUrlForm = "/api/signup";
	Axios.post(apiUrlForm, { username: username, password: password }).then(
		(result) => {
			// debugger;
			console.log(result);
			if (result.data.errno) {
				deferred.reject("Failure: Invalid User");
			} else {
				deferred.resolve("Add user successful");
			}
		}
	);

	return deferred.promise;
};

export const removeUser = ({ id }) => {
	const deferred = q.defer();
	const apiUrl = "/api/removeUser";
	// console.log(test);
	Axios.get(apiUrl, { id: id }).then((result) => {
		// debugger;
		// console.log(result);
		if (result.data.errno) {
			deferred.reject("remove user failed");
		} else {
			deferred.resolve("user removed");
		}
	});
	return deferred.promise;
};
