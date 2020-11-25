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

export const getUserByName = ({ username }) => {
	var deferred = q.defer();

	const apiUrl = "/api/getUserByName";
	Axios.post(apiUrl, { username }).then(
		result => {
			console.log(result);
			if (!result.length) {
				deferred.reject("Error retrieving users");
			} else {
				deferred.resolve(result);
			}
		}
	);
	return deferred.promise;
}

export const addUser = ({ username, password }) => {
	var deferred = q.defer();
	let apiUrlForm = "/api/signup";
	Axios.post(apiUrlForm, { username: username, password: password }).then(
		(result) => {
			// debugger;
			console.log(result);
			if (result.data.errno) {
				deferred.result("Failure: Invalid User");
			} else {
				deferred.result("Add user successful");
			}
		}
	);

	return deferred.promise;
};
