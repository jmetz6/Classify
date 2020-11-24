import Axios from "axios";
import React, { useState, useEffect } from "react";
import "../../App.css";
import Table from "../Table";

export default function Artists(props) {
	// this.state = {
	// 	cols: ["Name", "Actions"],
	// 	data: [],
	// };

	const [cols] = useState(["Name", "Actions"]);
	const [data, setData] = useState([]);

	useEffect(() => {
		let data = [];
		const apiUrl = "/api/artists";
		Axios.post(apiUrl).then((result) => {
			console.log(result);
			if (!result.data.length) {
				alert("Error retrieving artists");
			} else {
				data = result.data;
				data.forEach((i) => {
					i.actions = ["edit", "remove"];
				});
				setData(data);
			}
		});
	});

	return (
		<div className="artist flex-page">
			<div>
				<button className="btn btn-primary">Add new artist</button>
			</div>

			<Table title="Artists" cols={cols} data={data} property="artist"></Table>
		</div>
	);
}
