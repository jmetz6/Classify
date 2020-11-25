import React, { useState, useEffect } from "react";
import "../../App.css";
import { getPlaylists } from "../../services/playlists.service";
import Table from "../Table";


export default function Playlists(props) {
	// this.state = {
	// 	cols: ["Name", "User", "Actions"],
	// 	data: [],
	// };

	const [cols] = useState(["Name", "User", "Actions"]);
	const [data, setData] = useState([]);

	useEffect(() => {
		getPlaylists().then(
			function(results) {
				setData(results);
			}, 
			function(error) {
				console.log("Error: Failed to retrieve playlists");
				console.error(error);
			})
	}, []);

	return (
		<div className="playlists flex-page">
			<div>
				<button className="btn btn-primary">Add new playlist</button>
			</div>
			<Table
				title="Playlists"
				cols={cols}
				data={data}
				property="playlist"
			></Table>
		</div>
	);
}
