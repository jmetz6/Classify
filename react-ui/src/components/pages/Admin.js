import React, { useState, useEffect } from "react";
import Table from "../Table";
import { Modal } from "../Modal";
import { getUsers, addUser } from "../../services/admin.service";
import "../../App.css";

export default function Admin(props) {
	const [show, setShow] = useState(false);

	const closeModalHandler = () => setShow(false);
	const [cols] = useState(["Username", "Password", "Actions"]);
	const [data, setData] = useState([]);
	let form = new Map();

	const SendForm = () => {
		//console.log("Called onSubmit!");
		// form.forEach((value, key, map) => {
		// 	console.log(key + " is " + value);
		// });

		let sendData = {
			username: form.get("username"),
			password: form.get("password"),
		};
		console.log(sendData);

		addUser({
			username: form.get("username"),
			password: form.get("password"),
		}).then(
			// function (users) {
			// 	setNewUser(users);
			// },
			function (error) {
				console.log("Failed to retrieve artist data");
				console.error(error);
			}
		);
	};

	const onChange = (element, changes) => {
		//stores the changes in vars
		//console.log("Called onChange with " + changes);
		form.set(element, changes);
	};

	useEffect(() => {
		getUsers().then(
			function (users) {
				setData(users);
			},
			function (error) {
				console.log("Failed to retrieve users data");
				console.error(error);
			}
		);
	}, []);

	return (
		<>
			{show ? (
				<div
					onClick={closeModalHandler}
					className="back-drop fadeIn first"
				></div>
			) : null}

			<div>
				<div className="admin flex-page flex-page-column">
					<div>
						<button onClick={() => setShow(true)} className="btn btn-primary">
							Add new user
						</button>
					</div>

					{show ? (
						<Modal
							show={show}
							close={closeModalHandler}
							title="Add User"
							inputs={["username", "password"]}
							selects={[]}
							onChange={onChange}
							onSubmit={SendForm}
						/>
					) : null}

					<Table title="Users" cols={cols} data={data} property="user"></Table>
				</div>
			</div>
		</>
	);
}
