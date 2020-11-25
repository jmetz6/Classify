import React, { useState, useEffect } from "react";
import "../../App.css";
import { getPlaylists } from "../../services/playlists.service";
import { getUserByName } from "../../services/admin.service";
import Table from "../Table";
import { Modal } from "../Modal";


export default function Playlists(props) {
	const [cols] = useState(["Name", "User", "Actions"]);
	const [data, setData] = useState([]);
	
	const [show, setShow] = useState(false);
	const closeModalHandler = () => setShow(false);

	let form = new Map();

	const SendForm = () => {
		let sendData = {
			name: form.get("name"),
		};
		//console.log(sendData);
		//db requires `name` and `user`
		let username = localStorage.getItem("user");
		if(username === "undefined") {
			alert("You are not logged in!");
			return;
		}

		getUserByName({ username }).then(
			function(results) {
				let user = results;

			}, 
			function(error) {
				console.log("Error: Faild to retrieve user");
				console.error(error);
				alert("Add playlist failed");
			}
		);

	};

	const onChange = (element, changes) => {
		form.set(element, changes);
	};

	useEffect(() => {
		getPlaylists().then(
			function(results) {
				setData(results);
			}, 
			function(error) {
				console.log("Error: Failed to retrieve playlists");
				console.error(error);
			})
	}, []);

	return (
		<>
			{show ? (
				<div
					onClick={closeModalHandler}
					className="back-drop fadeIn first"
				></div>
			) : null}

			<div className="playlists flex-page flex-page-column">
				<div>
					<button onClick={() => setShow(true)} className="btn btn-primary">
						Add new playlist
					</button>
				</div>

				{show ? (
					<Modal
						show={show}
						close={closeModalHandler}
						title="Add Playlist"
						inputs={["name"]}
						selects={[]}
						onChange={onChange}
						onSubmit={SendForm}
					/>
				) : null}

				<Table
					title="Playlists"
					cols={cols}
					data={data}
					property="playlist"
				></Table>
			</div>
		</>
	);
}
