import React, { useState, useEffect } from "react";
import "../../App.css";
import Table from "../Table";
import { getPlaylist } from "../../services/playlists.service";

export default function Playlist(props) {
	const [cols] = useState(["Title", "Artist", "Actions"]);
	const [data, setData] = useState([]);
	const [playlistName, setPlaylistName] = useState("");

	useEffect(() => {
		const id = props.match.params.playlistId;

		getPlaylist({ id: id }).then(
			function (data) {
				setData(data.results);
				setPlaylistName(data.playlistName);
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
