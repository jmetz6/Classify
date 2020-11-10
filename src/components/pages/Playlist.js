import React from "react";
import "../../App.css";
import Table from "../Table";

export default function Playlist() {
	let playlistName = "My Songs";
	let cols = ["Title", "Artist", "Actions"];
	let data = [
		{ id: 1, title: "Song 1", artist: "Artist 1", actions: ["remove"] },
		{ id: 2, title: "Song 2", artist: "Artist 2", actions: ["remove"] },
	];

	return (
		<div className="playlist flex-page">
			<div>
				<button className="btn btn-primary">New Playlist</button>
			</div>

			<Table
				title={"Playlist: " + playlistName}
				cols={cols}
				data={data}
				property="song"
			></Table>
		</div>
	);
}
