import Axios from "axios";
import React, { useState, useEffect } from "react";

import Table from "../Table";
import { Modal } from "../Modal";

import "../../App.css";

let form = new Map();

const SendForm = () => {
	//console.log("Called onSubmit!");
	// form.forEach((value, key, map) => {
	// 	console.log(key + " is " + value);
	// });

	let apiUrlForm = "/api/signup";

	let sendData = {
		name: form.get("username"),
		word: form.get("password"),
	};

	Axios.post(apiUrlForm, sendData).then((result) => {
		// debugger;
		console.log(result);
		if (result.data.errno) {
			alert("Failure: Invalid User");
		} else {
			alert("Add user successful");
		}
	});
};

const onChange = (element, changes) => {
	//stores the changes in vars
	//console.log("Called onChange with " + changes);
	form.set(element, changes);
}

export default function Admin(props) {

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
				<div onClick={closeModalHandler} className="back-drop fadeIn first"></div>
			) : null}
			
			<div>
				<div className="admin flex-page flex-page-column">
					<div>
						{/* <button className="btn btn-primary">Add new user</button> */}

						<button onClick={() => setShow(true)} className="btn btn-primary">
							Add new user
					</button>
					</div>

					{show ? (
							<Modal show={show} close={closeModalHandler} title="Add User"  inputs={ [ 'username', 'password' ] } selects={ [] } onChange={onChange} onSubmit={SendForm}/>
						) : null}

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
