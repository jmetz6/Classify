import React, { useState, useEffect } from "react";
import "../../App.css";
import { getPlaylists, addPlaylist, editPlaylist, removePlaylist } from "../../services/playlists.service";
import { getUserByName } from "../../services/admin.service";
import { Table } from "../Table";
import { Modal } from "../Modal";

let formAdd = new Map();
let formEdit = new Map();

export default function Playlists(props) {
	const [cols] = useState(["Name", "User", "Actions"]);
	const [data, setData] = useState([]);

	const [showAdd, setShowAdd] = useState(false);
	const [showEdit, setShowEdit] = useState(false);

	const closeAddModalHandler = () => setShowAdd(false);
	const closeEditModalHandler = () => setShowEdit(false);



	const getPlaylistsQuery = () => {
		getPlaylists().then(
			function (results) {
				setData(results);
			},
			function (error) {
				console.log("Error: Failed to retrieve playlists");
				console.error(error);
			}
		);
	};

	const SendForm = () => {
		let sendData = {
			name: formAdd.get("name"),
		};

		//db requires `name` and `user`
		let username = localStorage.getItem("user");
		if (username === "undefined") {
			alert("You are not logged in!");
			return;
		}

		getUserByName({ username }).then(
			function (results) {
				let user = results[0];
				sendData.id = user.id;
				addPlaylist(sendData).then(
					function (results) {
						getPlaylistsQuery();
						console.log("Success: Playlist Added");
					},
					function (error) {
						console.log("Error: failed to add new playlist");
					}
				);
			},
			function (error) {
				console.log("Error: Faild to retrieve user");
				alert("Add playlist failed");
			}
		);
	};

	const onChange = (element, changes) => {
		formAdd.set(element, changes);
	};

	useEffect(() => {
		getPlaylistsQuery();
	}, []);


	const Remove = (row) => {
		console.log("id is " + row.id);
		let sendData = {
			id: row.id,
		};
		removePlaylist(sendData).then(
			function (results) {
				console.log(results);
				getPlaylistsQuery();
			},
			function (error) {
				console.log("Failed to remove user");
				console.error(error);
			}
		);
	};

	const onChangeEdit = (element, changes) => {
		formEdit.set(element, changes);
	};

	const SendFormEdit = () => {
		let sendData = {
			id: formEdit.get("id"),
			name: formEdit.get("name"),
		};
		console.log(sendData);

		editPlaylist(sendData).then(
			function (result) {
				console.log(result);
				getPlaylistsQuery();
			},
			function (error) {
				console.error(error);
			}
		);
	};

	const Edit = (row) => {
		formEdit.set("id", row.id);
		formEdit.set("name", row.name);
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

			<div className="playlists flex-page flex-page-column">
				<div>
					<button onClick={() => setShowAdd(true)} className="btn btn-primary">
						Add new playlist
					</button>
				</div>

				{showAdd ? (
					<Modal
						show={showAdd}
						close={closeAddModalHandler}
						title="Add Playlist"
						inputs={["name"]}
						selects={[]}
						onChange={onChange}
						onSubmit={SendForm}
					/>
				) : null}
	
				{showEdit ? (
					<Modal
						show={showEdit}
						close={closeEditModalHandler}
						title="Edit Playlist"
						inputs={["name"]}
						selects={[]}
						onChange={onChangeEdit}
						onSubmit={SendFormEdit}
					/>
				) : null}

				<Table
					title="Playlists"
					cols={cols}
					data={data}
					property="playlist"
					remove={Remove}
					edit={Edit}
				></Table>
			</div>
		</>
	);
}
