import Axios from "axios";
import q from "q";

export const searchAll = ({ searchTerm }) => {
    var deferred = q.defer();
	let data;
	const apiUrl = "/api/searchAll";
	Axios.post(apiUrl, { searchTerm }).then(
        (results) => {
            if(!results.data || results.data.errno) {
                deferred.reject(results);
            }
            else {
                data = results.data;
                data.forEach((i) => {
                    i.actions = [ "add" ];
                });
                deferred.resolve(data);
            }
        },

	);

	return deferred.promise;
}
