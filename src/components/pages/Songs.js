import React from "react";
import "../../App.css";
import Table from "../Table";

export default function Songs() {

	let cols = ["Name"];
    let data = [
        { id: 1, name: "Symphony No. 5 in C Minor, Op. 67: 1. Allegro con brio" },
		{ id: 2, name: "Symphony No. 5 in C Minor, Op. 67: 2. Andante con moto" },
		{ id: 3, name: "Symphony No. 5 in C Minor, Op. 67: 3. Allegro" },
		{ id: 4, name: "Symphony No. 5 in C Minor, Op. 67: 4. Allegro" },
    ]

	return (
	
		<div className="songs flex-page">
			<Table
				title="Songs"
				cols={cols}
				data={data}
			>
			</Table>

		</div>
	
	)
}
