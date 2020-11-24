import Axios from "axios";
import React, { useState, useEffect } from "react";
import "../../App.css";
import Table from "../Table";

export default function Playlists(props) {
	// this.state = {
	// 	cols: ["Name", "User", "Actions"],
	// 	data: [],
	// };

	const [cols] = useState(["Name", "User", "Actions"]);
	const [data, setData] = useState([]);

	useEffect(() => {
		let data = [];
		const apiUrl = "/api/playlists";
		Axios.post(apiUrl).then((result) => {
			// debugger;
			console.log(result);
			if (!result.data.length) {
				alert("Error retrieving playlists");
			} else {
				data = result.data;
				data.forEach((i) => {
					i.actions = ["select", "edit", "remove"];
				});
				setData(data);
			}
		});
	});

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
