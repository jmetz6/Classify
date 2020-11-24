import Axios from "axios";
import React, { Component } from "react";

import Table from "../Table";
import { InputForm } from "../Form";

import "../../App.css";

const SendForm = (form) => {
	let tform = document.getElementById(form);
	tform.submit();
	let apiUrlForm = "/api/signup";
	let url = window.location.href.split("?")[1];
	let data = url.split("&");
	let sendData = {
		name: data[0].split("=")[1],
		word: data[1].split("=")[1]
	}

	Axios.post(apiUrlForm, sendData).then((result) => {
		// debugger;
		console.log(result);
		if (result.data.errno) { 
			alert("Failure: Invalid User");
		}
		else {
			alert("Add user successful");
		}

	});
};

export default class Admin extends Component {
	constructor(props) {
		super(props);
		this.state = {
			cols: ["Username", "Password", "Actions"],
			data: [],
			render: ''
		};
	}

	handleClick(compName, e){
		if(this.state.render === compName) {
			this.setState({render: ''});
		}
		else {
        	this.setState({render: compName});
		}
	}
	_renderSubComp(){
        switch(this.state.render){
			case 'AdminForm': return <AdminForm />
			default: return;
		}
    }

	componentDidMount() {
		let data = [];
		const apiUrl = "/api/admin";
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
				<div className="admin flex-page flex-page-column">
					<div>
						<button onClick={this.handleClick.bind(this, 'AdminForm')} className="btn btn-primary">Add new user</button>
						{this._renderSubComp()}		
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

class AdminForm extends React.Component {
    render() {
        return (
			<div> 
				<InputForm onClick={SendForm} title="Add User" inputs={ [ 'username', 'password' ] } selects={ [] }>
				
				</InputForm>
			</div>	
		)
    }
}
