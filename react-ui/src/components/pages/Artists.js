import Axios from "axios";
import React, { Component } from "react";
import "../../App.css";
import Table from "../Table";

export default class Artsits extends Component {

	constructor(props) {
		super(props)
		this.state = {
			cols:  ["Name", "Actions"],
			data: []
		}
	}

	componentDidMount() {
		let data = [];
		const apiUrl = "http://localhost:5000/api/artists";
		Axios.post(apiUrl).then((result) => {
			console.log(result);
			if (!result.data.length) {
				alert("Error retrieving artists");
			}
			else {
				data = result.data;
				data.forEach(i => {
					i.actions = ["edit", "remove"];
				});
				this.setState({data});
			}
		});
	}

	render () {
		return(
			<div className="artist flex-page">
				<div>
					<button className="btn btn-primary">Add new artist</button>
				</div>
				
				<Table
					title="Artists"
					cols={this.state.cols}
					data={this.state.data}
					property="artist"
				>
				</Table>
			</div>
		)
	}
}
