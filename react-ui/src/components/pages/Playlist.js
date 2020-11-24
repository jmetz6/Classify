import Axios from "axios";
import React, { Component } from "react";
import "../../App.css";
import Table from "../Table";

export default class Playlist extends Component {

	constructor(props) {
		super(props);
		this.state = {
			playlistId: props.match.params.playlistId,
			playlistName: null,
			cols: ["Title", "Artist", "Actions"],
			data: [],
		};
	}

	componentDidMount() {
		let data = [];
		const apiUrl = "/api/playlist";
		Axios.post(apiUrl, { id: this.state.playlistId }).then((result) => {
			// debugger;
			console.log(result);
			if (!result.data.length) {
				alert("Error retrieving songs");
			} else {
				data = result.data;
				let playlistName = data[0][0].name; //the first query's first parameter of the data

				data = data[1];
				data.forEach((i) => {
					i.actions = ["remove"];
				});
				this.setState({ playlistName: playlistName, data: data });
			}
		});
	}

	render() {
		return (
			<div className="playlist flex-page">
	
				<Table
					title={"Playlist: " + this.state.playlistName}
					cols={this.state.cols}
					data={this.state.data}
					property="song"
				></Table>
			</div>
		);
	}	
}
