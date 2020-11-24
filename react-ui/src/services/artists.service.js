import Axios from "axios";
import q from "q";

export const getArtist = (id) => {
}

    

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
}
