import React from "react";

import Table from "../Table";

export default function Playlists() {
	let cols = ["Name", "User", "Actions"];
	let data = [
		{ id: 1, name: "my songs", user: "user123", actions: ["select", "edit", "remove"] },
		{
			id: 2,
			name: "favorite songs",
			user: "user123",
			actions: ["select", "edit", "remove"],
		},
		{
			id: 3,
			name: "classical music",
			user: "user456",
			actions: ["select", "edit", "remove"],
		},
	];

	return (
		<>
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
		</>
	);
}
