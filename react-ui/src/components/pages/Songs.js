import React, { useState, useEffect } from "react";
import "../../App.css";
import Table from "../Table";
import { getSongs } from "../../services/songs.service";
import { getArtists } from "../../services/artists.service";
import { Modal } from "../Modal";

export default function Song(props) {
	const [cols] = useState(["Name", "Actions"]);
	const [data, setData] = useState([]);
	const [artists, setArtists] = useState([]);

	const closeModalHandler = () => setShow(false);
	const [show, setShow] = useState(false);

	let form = new Map();

	const getSongsQuery = () => {
		getSongs().then(
			function (songs) {
				setData(songs);
			},
			function (error) {
				console.log("Failed to retrieve song data");
				console.error(error);
			}
		);
	}

	const getArtistsQuery = () => {
		getArtists().then(
			function (results) {
				setArtists(results);
				console.log(results);
				console.log(artists);
			},
			function (error) {
				console.log("Error: Failed to retrieve artist data");
				console.error(error);
			}
		);
	}

	const SendForm = () => {
		let sendData = {
			username: form.get("username"),
			password: form.get("password"),
		};
		console.log(sendData);

	};

	const onChange = (element, changes) => {
		//stores the changes in vars
		//console.log("Called onChange with " + changes);
		form.set(element, changes);
	};

	useEffect(() => {
		getArtistsQuery();
	}, []);

	useEffect(() => {
		getSongsQuery();
	}, []);

	return (
		<>
			{show ? (
				<div
					onClick={closeModalHandler}
					className="back-drop fadeIn first"
				></div>
			) : null}

			<div className="songs flex-page flex-page-column">
				<div>
					<button disabled={true} onClick={() => setShow(true)} className="btn btn-primary">
						Add new song
					</button>
				</div>

				{show ? (
					<Modal
						show={show}
						close={closeModalHandler}
						title="Add Song"
						inputs={["name"]}
						selects={["artists"]}
						selectOptions={artists}
						onChange={onChange}
						onSubmit={SendForm}
					/>
				) : null}

				<Table title="Songs" cols={cols} data={data} property="song"></Table>
			</div>
		</>
	);
}
