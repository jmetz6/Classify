import React, { useState, useEffect } from "react";
import "../../App.css";
import {
	getArtists,
	addArtist,
	removeArtists,
	editArtist,
} from "../../services/artists.service";
import { Table } from "../Table";
import { Modal } from "../Modal";

let formAdd = new Map();
let formEdit = new Map();

export default function Artists(props) {
	const [cols] = useState(["Name", "Actions"]);
	const [data, setData] = useState([]);

	const [showAdd, setShowAdd] = useState(false);
	const [showEdit, setShowEdit] = useState(false);

	const closeAddModalHandler = () => setShowAdd(false);
	const closeEditModalHandler = () => setShowEdit(false);

	const getArtistsQuery = () => {
		getArtists().then(
			function (artists) {
				setData(artists);
			},
			function (error) {
				console.log("Error: Failed to retrieve artist data");
				console.error(error);
			}
		);
	};

	const onChangeAdd = (element, changes) => {
		formAdd.set(element, changes);
	};

	const onChangeEdit = (element, changes) => {
		formEdit.set(element, changes);
	};

	const SendFormAdd = () => {
		let sendData = {
			name: formAdd.get("name"),
		};
		console.log(sendData);

		addArtist(sendData).then(
			function (result) {
				console.log(result);
				getArtistsQuery();
			},
			function (error) {
				console.error(error);
			}
		);
	};

	const SendFormEdit = () => {
		let sendData = {
			id: formEdit.get("id"),
			name: formEdit.get("name"),
		};
		console.log(sendData);

		editArtist(sendData).then(
			function (result) {
				console.log(result);
				getArtistsQuery();
			},
			function (error) {
				console.error(error);
			}
		);
	};

	useEffect(() => {
		getArtistsQuery();
	}, []);

	const Remove = (row) => {
		console.log("id is " + row.id);
		let sendData = {
			id: row.id,
		};
		removeArtists(sendData).then(
			function (results) {
				console.log(results);
				getArtistsQuery();
			},
			function (error) {
				console.log("Failed to remove user");
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

			<div className="artist flex-page flex-page-column">
				<div>
					<button onClick={() => setShowAdd(true)} className="btn btn-primary">
						Add new artist
					</button>
				</div>

				{showAdd ? (
					<Modal
						show={showAdd}
						close={closeAddModalHandler}
						title="Add Artist"
						inputs={["name"]}
						selects={[]}
						onChange={onChangeAdd}
						onSubmit={SendFormAdd}
					/>
				) : null}

				{showEdit ? (
					<Modal
						show={showEdit}
						close={closeEditModalHandler}
						title="Edit Artist"
						inputs={["name"]}
						selects={[]}
						onChange={onChangeEdit}
						onSubmit={SendFormEdit}
					/>
				) : null}						

				<Table
					title="Artists"
					cols={cols}
					data={data}
					property="artist"
					remove={Remove}
					edit={Edit}
				></Table>
			</div>
		</>
	);
}
