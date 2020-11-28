import React, { useState, useEffect } from "react";
import { Table } from "../Table";
import { Modal } from "../Modal";
import { getUsers, addUser, editUser, removeUser } from "../../services/admin.service";
import "../../App.css";

let addForm = new Map();
let editForm = new Map();

export default function Admin(props) {
	const [showAdd, setShowAdd] = useState(false);
	const [showEdit, setShowEdit] = useState(false);

	const closeAddModalHandler = () => setShowAdd(false);
	const closeEditModalHandler = () => setShowEdit(false);

	const [cols] = useState(["Username", "Password", "Actions"]);
	const [data, setData] = useState([]);


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

	const onChangeAdd = (element, changes) => {
		addForm.set(element, changes);
	};

	const onChangeEdit = (element, changes) => {
		editForm.set(element, changes);
	};

	const SendFormAdd = () => {
		let sendData = {
			username: addForm.get("username"),
			password: addForm.get("password"),
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

	const SendFormEdit = () => {
		let sendData = {
			id: editForm.get("id"),
			username: editForm.get("username"),
			password: editForm.get("password"),
		};
		console.log(sendData);

		editUser(sendData).then(
			function (results) {
				console.log(results);
				getUsersQuery();
			},
			function (error) {
				console.log("Failed to edit user");
				console.error(error);
			}
		);
	};

	useEffect(() => {
		getUsersQuery();
	}, []);

	const Remove = (row) => {
		console.log("id is " + row.id);
		let sendData = {
			id: row.id,
		};
		removeUser(sendData).then(
			function (results) {
				console.log(results);
				getUsersQuery();
			},
			function (error) {
				console.log("Failed to remove user");
				console.error(error);
			}
		);
	};

	const Edit = (row) => {
		console.log("id is " + row.id);
		editForm.set("id", row.id);
		editForm.set("username", row.username);
		editForm.set("password", row.password);
		setShowEdit(true);
	};

	return (
		<>
			{(showAdd || showEdit) ? (
				<div
					onClick={closeAddModalHandler}
					className="back-drop fadeIn first"
				></div>
			) : null}

			<div>
				<div className="admin flex-page flex-page-column">
					<div>
						<button onClick={() => setShowAdd(true)} className="btn btn-primary">
							Add new user
						</button>
					</div>

					{showAdd ? (
						<Modal
							show={showAdd}
							close={closeAddModalHandler}
							title="Add User"
							inputs={["username", "password"]}
							selects={[]}
							onChange={onChangeAdd}
							onSubmit={SendFormAdd}
						/>
					) : null}

					{showEdit ? (
						<Modal
							show={showEdit}
							close={closeEditModalHandler}
							title="Edit User"
							inputs={["username", "password"]}
							selects={[]}
							onChange={onChangeEdit}
							onSubmit={SendFormEdit}
						/>
					) : null}	

					<Table
						title="Users"
						cols={cols}
						data={data}
						property="user"
						remove={Remove}
						edit={Edit}
					></Table>
				</div>
			</div>
		</>
	);
}
