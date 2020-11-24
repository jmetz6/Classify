import Axios from "axios";
import React, { useState, useEffect } from "react";
import "../../App.css";
import Table from "../Table";

export default function Playlist(props) {
	// constructor(props) {
	// 	super(props);
	// 	this.state = {
	// 		playlistId: props.match.params.playlistId,
	// 		playlistName: null,
	// 		cols: ["Title", "Artist", "Actions"],
	// 		data: [],
	// 	};
	// }
	// let playlistId = ;
	const [cols] = useState(["Title", "Artist", "Actions"]);
	const [data, setData] = useState([]);
	const [playlistName, setPlaylistName] = useState("");
	// const [state, setState] = useState([]);
	// const [playlistId, setPlaylistId] = useState();

	useEffect(() => {
		let data = [];
		const apiUrl = "/api/playlist";
		let id = props.match.params.playlistId;
		Axios.post(apiUrl, { id: id }).then((result) => {
			// debugger;
			console.log(result);
			if (!result.data.length) {
				alert("Error retrieving songs");
			} else {
				data = result.data;
				let playName = data[0][0].name; //the first query's first parameter of the data

				data = data[1];
				data.forEach((i) => {
					i.actions = ["remove"];
				});
				setPlaylistName(playName);
				setData(data);
			}
		});
	}, []);

	return (
		<div className="playlist flex-page">
			<Table
				title={"Playlist: " + playlistName}
				cols={cols}
				data={data}
				property="song"
			></Table>
		</div>
	);
}
