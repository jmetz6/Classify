import React from "react";
import "../../App.css";
import Table from "../Table";


export default function Admin() {
    
    let cols = ["Username", "Playlists", "Actions"];
    let data = [
        { id: 1, username: "user123", playlists: "2", actions: ["remove"] },
        { id: 2, username: "user456", playlists: "1", actions: ["remove"] }
    ]

	return (
		<div>
			<div className="admin flex-page">
                <div>
                    <button className="btn btn-primary">Add new user</button>
                </div>
                
                <Table
                    title="Users"
                    cols={cols}
                    data={data}
                    property="user"
                ></Table>
            </div>
		</div>
	);
}
