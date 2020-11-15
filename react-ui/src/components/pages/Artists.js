import React from "react";
import "../../App.css";
import Table from "../Table";

export default function Artist() {
	
	let cols = ["Name", "Actions"];
    let data = [
        { id: 1, name: "Ludwig van Beethoven", actions: ["edit", "remove"] },
		{ id: 2, name: "Wolfgang Amadeus Mozart", actions: ["edit", "remove"] },
		{ id: 3, name: "George Frideric Handel", actions: ["edit", "remove"] }
    ]

	return (
		<div className="artist flex-page">
			<div>
				<button className="btn btn-primary">Add new artist</button>
			</div>
			
			<Table
				title="Artists"
				cols={cols}
				data={data}
				property="artist"
			>
			</Table>

		</div>
	
	)
}
