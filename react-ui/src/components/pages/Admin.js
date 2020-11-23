import Axios from "axios";
import React, { Component } from "react";
import "../../App.css";
import Table from "../Table";

export default class Admin extends Component {
	constructor(props) {
		super(props);
		this.state = {
			cols: ["Username", "Playlists", "Actions"],
			data: [],
		};
	}

	// let cols = ["Username", "Playlists", "Actions"];
	// let data = [
	//     { id: 1, username: "user123", playlists: "2", actions: ["edit", "remove"] },
	//     { id: 2, username: "user456", playlists: "1", actions: ["edit", "remove"] }
	// ]
	componentDidMount() {
		let data = [];
		const apiUrl = "http://localhost:5000/api/admin";
		Axios.post(apiUrl).then((result) => {
			// debugger;
			console.log(result);
			if (!result.data.length) {
				alert("Error retrieving users");
			} else {
				data = result.data;
				data.forEach((s) => {
					s.actions = ["edit", "remove"];
				});
				this.setState({ data });
			}
		});
	}
	render() {
		return (
			<div>
				<div className="admin flex-page">
					<div>
						<button className="btn btn-primary">Add new user</button>
					</div>

					<Table
						title="Users"
						cols={this.state.cols}
						data={this.state.data}
						property="user"
					></Table>
				</div>
			</div>
		);
	}
}
