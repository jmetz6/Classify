import Axios from "axios";
import React, { Component } from "react";
import "../../App.css";
import Table from "../Table";

export default class Playlists extends Component {
	constructor(props) {
		super(props);
		this.state = {
			cols: ["Name", "User", "Actions"],
			data: [],
		};
	}

	componentDidMount() {
		let data = [];
		const apiUrl = "/api/playlists";
		Axios.post(apiUrl).then((result) => {
			// debugger;
			console.log(result);
			if (!result.data.length) {
				alert("Error retrieving playlists");
			} else {
				data = result.data;
				data.forEach((i) => {
					i.actions = ["select", "edit", "remove"];
				});
				this.setState({ data });
			}
		});
	}

	render() {
		return (
			<div className="playlists flex-page">
				<div>
					<button className="btn btn-primary">Add new playlist</button>
				</div>
				<Table
					title="Playlists"
					cols={this.state.cols}
					data={this.state.data}
					property="playlist"
				></Table>
			</div>
		);
	}
}
