import Axios from "axios";
import React, { Component } from "react";
import "../../App.css";
import Table from "../Table";

export default class Songs extends Component {
	constructor(props) {
		super(props);
		this.state = {
			cols: ["Name", "Actions"],
			data: [],
		};
	}

	componentDidMount() {
		let data = [];
		const apiUrl = "http://localhost:5000/api/songs";
		Axios.post(apiUrl).then((result) => {
			// debugger;
			console.log(result);
			if (!result.data.length) {
				alert("Error retrieving songs");
			} else {
				data = result.data;

				data.forEach(i => {
					i.actions = ["add", "edit", "remove"];
				});
				this.setState({ data });
			}
		});
	}

	render() {
		return (
			<div className="songs flex-page">
				<div>
					<button className="btn btn-primary">Add new song</button>
				</div>

				<Table
					title="Songs"
					cols={this.state.cols}
					data={this.state.data}
					property="song"
				></Table>
			</div>
		);
	}
}
