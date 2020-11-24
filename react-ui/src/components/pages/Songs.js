import Axios from "axios";
import React, { useState, useEffect } from "react";
import "../../App.css";
import Table from "../Table";

export default function Song(props) {
	// const [state, setState] = useState({
	// 	cols: ["Name", "Actions"],
	// 	data: [],
	// });

	const [cols] = useState(["Name", "Actions"]);
	const [data, setData] = useState([]);

	useEffect(() => {
		let data = [];
		const apiUrl = "/api/songs";
		Axios.get(apiUrl).then((result) => {
			// debugger;
			console.log(result);
			if (!result.data.length) {
				alert("Error retrieving songs");
			} else {
				data = result.data;

				data.forEach((i) => {
					i.actions = ["add", "edit", "remove"];
				});
				setData(data);
			}
		});
	}, []);

	return (
		<div className="songs flex-page">
			<div>
				<button className="btn btn-primary">Add new song</button>
			</div>

			<Table title="Songs" cols={cols} data={data} property="song"></Table>
		</div>
	);
}
