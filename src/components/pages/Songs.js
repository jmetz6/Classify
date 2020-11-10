import React from "react";
import "../../App.css";
import Table from "../Table";

export default function Songs() {

	let cols = ["Name", "Actions"];
    let data = [
        { id: 1, name: "Symphony No. 5 in C Minor, Op. 67: 1. Allegro con brio", actions: ["add"] },
		{ id: 2, name: "Symphony No. 5 in C Minor, Op. 67: 2. Andante con moto", actions: ["add"] },
		{ id: 3, name: "Symphony No. 5 in C Minor, Op. 67: 3. Allegro", actions: ["add"] },
		{ id: 4, name: "Symphony No. 5 in C Minor, Op. 67: 4. Allegro", actions: ["add"] },
    ]

	return (
	
		<div className="songs flex-page flex-page-column">
                <div>
                    <button className="btn btn-primary">Add song</button>
                </div>

			<Table
				title="Songs"
				cols={cols}
				data={data}
				property="song"
			>
			</Table>

		</div>
	
	)
}
