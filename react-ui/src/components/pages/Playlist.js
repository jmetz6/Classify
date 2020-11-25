import React, { useState, useEffect } from "react";
import "../../App.css";
import Table from "../Table";
import { getPlaylists } from "../../services/playlists.service";

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
		const id = props.match.params.playlistId;

		getPlaylists({ id: id }).then(
			function (data) {
				setData(data[0]);
				setPlaylistName(data[1]);
			},
			function (error) {
				console.log("Failed to retrieve song data");
				console.error(error);
			}
		);
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
