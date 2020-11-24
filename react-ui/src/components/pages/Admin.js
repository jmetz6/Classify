import Axios from "axios";
import React, { useState, useEffect } from "react";

import Table from "../Table";
import { Modal } from "../Modal";

import "../../App.css";

// const SendForm = (form) => {
// 	let tform = document.getElementById(form);
// 	tform.submit();
// 	let apiUrlForm = "/api/signup";
// 	let url = window.location.href.split("?")[1];
// 	let data = url.split("&");
// 	let sendData = {
// 		name: data[0].split("=")[1],
// 		word: data[1].split("=")[1],
// 	};

// 	Axios.post(apiUrlForm, sendData).then((result) => {
// 		// debugger;
// 		console.log(result);
// 		if (result.data.errno) {
// 			alert("Failure: Invalid User");
// 		} else {
// 			alert("Add user successful");
// 		}
// 	});
// };

export default function Admin(props) {
	// constructor(props) {
	// 	super(props);
	// 	this.state = {
	// 		cols: ["Username", "Password", "Actions"],
	// 		data: [],
	// 		render: ''
	// 	};
	// }

	// handleClick(compName, e){
	// 	if(this.state.render === compName) {
	// 		this.setState({render: ''});
	// 	}
	// 	else {
	//     	this.setState({render: compName});
	// 	}
	// }
	// _renderSubComp(){
	//     switch(this.state.render){
	// 		case 'AdminForm': return <AdminForm />
	// 		default: return;
	// 	}
	// }

	const [show, setShow] = useState(false);

	const closeModalHandler = () => setShow(false);
	const [cols] = useState(["Username", "Password", "Actions"]);
	const [data, setData] = useState([]);
	useEffect(() => {
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
				setData(data);
			}
		});
	}, []);

	return (
		<>
			{show ? (
				<div onClick={closeModalHandler} className="back-drop"></div>
			) : null}
			
			<div>
				<div className="admin flex-page flex-page-column">
					<div>
						{/* <button className="btn btn-primary">Add new user</button> */}

						<button onClick={() => setShow(true)} className="btn btn-primary">
							Add new user
					</button>
						{show ? (
							<Modal show={show} close={closeModalHandler} />
						) : null}
					</div>

					<Table title="Users" cols={cols} data={data} property="user"></Table>
				</div>
			</div>
		</>
	);
}

// class AdminForm extends React.Component {
//     render() {
//         return (
// 			<div>
// 				<InputForm onClick={SendForm} title="Add User" inputs={ [ 'username', 'password' ] } selects={ [] }>

// 				</InputForm>
// 			</div>
// 		)
//     }
// }
