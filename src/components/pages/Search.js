import React from "react";
import "../../App.css";
import Table from "../Table";
export default function Search() {

	let cols = ["Title", "Artist", "Actions"];
    let data = [
        { id: 1, title: "Symphony No. 5 in C Minor, Op. 67: 1. Allegro con brio", artist: "Ludwig van Beethoven", actions: ["add", "select"] },
		{ id: 2, title: "Symphony No. 5 in C Minor, Op. 67: 2. Andante con moto", artist: "Ludwig van Beethoven", actions: ["add", "select"] },
		{ id: 3, title: "Symphony No. 5 in C Minor, Op. 67: 3. Allegro", artist: "Ludwig van Beethoven", actions: ["add", "select"] },
		{ id: 4, title: "Symphony No. 5 in C Minor, Op. 67: 4. Allegro", artist: "Ludwig van Beethoven", actions: ["add", "select"] },
	]
	
	return (
		<div className="search flex-page flex-page-column">
		
			<div>
				<label>Search: </label>
				<input id="search" type="text" placeholder="Search for song or artist"></input>
			</div>

			<Table
				title='Results: "Ludwig van Beethoven"'
				cols={cols}
				data={data}
				property="song"
			>
			</Table>

		</div>
	);
}
