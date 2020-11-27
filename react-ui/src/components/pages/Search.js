import React, { useState, useEffect } from "react";
import "../../App.css";
import { Table } from "../Table";
import { Modal } from "../Modal";
import { searchAll } from "../../services/search.service";
import { getPlaylists, addSongToPlaylist } from "../../services/playlists.service";

let addToPlaylistForm = new Map();

export default function Search() {
	const [cols] = useState(["Title", "Artist", "Actions"]);
	const [data, setData] = useState([]);
	const [show, setShow] = useState(false);
	const [title, setTitle] = useState("");
	const [searchValue, setSearchValue] = useState("");

	const closeAddModalHandler = () => setShowAddModal(false);
	const [showAddModal, setShowAddModal] = useState(false);
	const [playlists, setPlaylists] = useState([]);

	const onChange = (e) => {
		setSearchValue(e.target.value);
		onSearch();
	};

	useEffect(() => {
		getPlaylists().then(
			function (results) {
				setPlaylists(results);
			},
			function (error) {
				console.log("Error: Failed to retrieve artist data");
				console.log(error);
			}
		);
	}, []);

	const onSearch = () => {
		//console.log("searching for '" + searchValue + "'...");
		searchAll({ searchTerm: searchValue }).then(
			function (results) {
				//console.log(results);
				setData(results);
				setTitle(searchValue);
				setShow(true);
			},
			function (error) {
				console.log(
					"Error: failed to retrieve songs for search (" + searchValue + ")"
				);
			}
		);
	};

	const _handleKeyPress = (e) => {
		if (e.key === "Enter") {
			setSearchValue(e.target.value);
			onSearch();
		}
	};

	const _handleKeyUp = (e) => {
		if (e.key === "Backspace") {
			onChange(e);
		}
		onSearch();
	};


	const SendAddForm = () => {
		let sendData = {
			sid: addToPlaylistForm.get("sid"),
			playlistName: addToPlaylistForm.get("playlist"),
		};
		console.log(sendData);
		addSongToPlaylist(sendData).then(
			function (results) {
				console.log("Success: added song to playlist");
			},
			function (error) {
				console.log("Error: failed to add song to playlist");
			}
		);
	}

	const onChangeAddModal = (element, changes) => {
		//stores the changes in vars
		//console.log("Called onChange with " + changes);
		addToPlaylistForm.set(element, changes);
	};

	const AddToPlaylist = (row) => {
		setShowAddModal(true);
		addToPlaylistForm.set("sid", row.id);
	}

	return (
		<div className="search flex-page flex-page-column">
			<div>
				<label>Search: </label>
				<input
					id="search"
					type="text"
					placeholder="Search for song or artist"
					onChange={onChange}
					onKeyPress={_handleKeyPress}
					onKeyUp={_handleKeyUp}
				></input>
			</div>

			{showAddModal ? (
					<Modal
						show={showAddModal}
						close={closeAddModalHandler}
						title="Add Song to Playlist"
						inputs={[]}
						selects={["playlist"]}
						onChange={onChangeAddModal}
						onSubmit={SendAddForm}
						selectOptions={[playlists]}
					/>
				) : null}

			{show ? (
				<Table
					title={"Results: " + title}
					cols={cols}
					data={data}
					property="song"
					add={AddToPlaylist}
				></Table>
			) : null}
		</div>
	);
}
