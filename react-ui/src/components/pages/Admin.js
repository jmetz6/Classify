import React, { useState, useEffect } from "react";
import { Table } from "../Table";
import { Modal } from "../Modal";
import { getUsers, addUser, removeUser } from "../../services/admin.service";
import "../../App.css";

export default function Admin(props) {
	const [show, setShow] = useState(false);

	const closeModalHandler = () => setShow(false);
	const [cols] = useState(["Username", "Password", "Actions"]);
	const [data, setData] = useState([]);
	const [id, setId] = useState("");
	let form = new Map();

	const getUsersQuery = () => {
		getUsers().then(
			function (users) {
				setData(users);
			},
			function (error) {
				console.log("Failed to retrieve users data");
				console.error(error);
			}
		);
	};

	const SendForm = () => {
		let sendData = {
			username: form.get("username"),
			password: form.get("password"),
		};
		console.log(sendData);

		addUser(sendData).then(
			function (results) {
				console.log(results);
				getUsersQuery();
			},
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
		getUsersQuery();
	}, []);

	const Remove = (e) => {
		e.preventDefault();
		// debugger;
		setId(e.target.value);
		const userID = id;
		console.log(userID);
		removeUser(userID).then(
			function (results) {
				console.log(results);
			},
			function (error) {
				console.log("Failed to retrieve artist data");
				console.error(error);
			}
		);
	};

	// const testin = (e) => {
	// 	e.persist();
	// 	// debugger;
	// 	// setTest({ ...data, [e.target.name]: e.target.value });
	// 	setTest(e.target.value);
	// 	console.log(test);
	// };
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

					<Table
						title="Users"
						cols={cols}
						data={data}
						property="user"
						remove={Remove}
					></Table>
				</div>
			</div>
		</>
	);
}
