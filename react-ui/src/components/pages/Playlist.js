import React, { useState, useEffect } from "react";
import "../../App.css";
import { Table } from "../Table";
import {
	getPlaylist,
	removeSongFromPlaylist,
} from "../../services/playlists.service";

export default function Playlist(props) {
	const [cols] = useState(["Title", "Artist", "Actions"]);
	const [data, setData] = useState([]);
	const [playlistName, setPlaylistName] = useState("");

	const Remove = (row) => {
		console.log("id is " + row.id);
		let sendData = {
			sid: row.id,
			pid: props.match.params.playlistId,
		};
		removeSongFromPlaylist(sendData).then(
			function (results) {
				console.log(results);
				getPlaylistQuery();
			},
			function (error) {
				console.log("Failed to remove song from playlist");
				console.error(error);
			}
		);
	};

	const getPlaylistQuery = () => {
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
	};

	useEffect(() => {
		getPlaylistQuery();
	}, []);

	return (
		<div className="playlist flex-page">
			<Table
				title={"Playlist: " + playlistName}
				cols={cols}
				data={data}
				property="song"
				remove={Remove}
			></Table>
		</div>
	);
}
