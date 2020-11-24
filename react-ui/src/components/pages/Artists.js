import React, { useState, useEffect } from "react";
import "../../App.css";
import { getArtists } from "../../services/artists.service";
import Table from "../Table";

export default function Artists(props) {

	const [cols] = useState(["Name", "Actions"]);
	const [data, setData] = useState([]);

	useEffect(() => {
		getArtists().then(
			function (artists) {
				setData(artists);
			}, 
			function (error) {
				console.log("Failed to retrieve artist data");
				console.error(error);
			});
	}, 
	[]);

	return (
		<div className="artist flex-page flex-page-column">
			<div>
				<button className="btn btn-primary">Add new artist</button>
			</div>

			<Table title="Artists" cols={cols} data={data} property="artist"></Table>
		</div>
	);
}
