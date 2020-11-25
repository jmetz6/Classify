import React, { useState, useEffect } from "react";
import "../../App.css";
import Table from "../Table";
import { getSongs } from "../../services/songs.service";

export default function Song(props) {
	const [cols] = useState(["Name", "Actions"]);
	const [data, setData] = useState([]);

	useEffect(() => {
		getSongs().then(
			function (songs) {
				setData(songs);
			},
			function (error) {
				console.log("Failed to retrieve song data");
				console.error(error);
			}
		);
	}, []);

	return (
		<div className="songs flex-page">
			<div>
				<button className="btn btn-primary">Add new song</button>
			</div>

			<Table title="Songs" cols={cols} data={data} property="song"></Table>
		</div>
	);
}
