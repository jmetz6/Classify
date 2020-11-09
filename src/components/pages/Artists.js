import React from "react";
import "../../App.css";
import Table from "../Table";

export default function Artist() {
	
	let cols = ["Name"];
    let data = [
        { id: 1, name: "Ludwig van Beethoven" },
		{ id: 2, name: "Wolfgang Amadeus Mozart" },
		{ id: 3, name: "George Frideric Handel" }
    ]

	return (
		<div className="artist flex-page">

			<Table
				title="Artists"
				cols={cols}
				data={data}
			>
			</Table>

		</div>
	
	)
}
