import React, { useState, useEffect } from "react";
import "../../App.css";
import { getArtists, addArtist } from "../../services/artists.service";
import Table from "../Table";
import { Modal } from "../Modal";

export default function Artists(props) {
	const [cols] = useState(["Name", "Actions"]);
	const [data, setData] = useState([]);

	const [show, setShow] = useState(false);
	const closeModalHandler = () => setShow(false);

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

	let form = new Map();

	const SendForm = () => {
		let sendData = {
			name: form.get("name"),
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

	const onChange = (element, changes) => {
		form.set(element, changes);
	};

	useEffect(() => {
		getArtistsQuery();
	}, []);

	return (
		<>
			{show ? (
				<div
					onClick={closeModalHandler}
					className="back-drop fadeIn first"
				></div>
			) : null}

			<div className="artist flex-page flex-page-column">
				<div>
					<button onClick={() => setShow(true)} className="btn btn-primary">
						Add new artist
					</button>
				</div>

				{show ? (
					<Modal
						show={show}
						close={closeModalHandler}
						title="Add Artist"
						inputs={["name"]}
						selects={[]}
						onChange={onChange}
						onSubmit={SendForm}
					/>
				) : null}

				<Table
					title="Artists"
					cols={cols}
					data={data}
					property="artist"
				></Table>
			</div>
		</>
	);
}
