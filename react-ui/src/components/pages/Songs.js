import React, { useState, useEffect, useAsync } from "react";
import "../../App.css";
import Table from "../Table";
import { getSongs } from "../../services/songs.service";
import { getArtists } from "../../services/artists.service";
import { Modal } from "../Modal";
import q from "q";

export default function Songs(props) {
	// const { artists, error, isLoading } = useAsync({ promiseFn: getArtistsQuery })
	// if (isLoading) return "Loading..."
	// if (error) return `Something went wrong: ${error.message}`
	// if (artists)

	const [cols] = useState(["Name", "Actions"]);
	const [data, setData] = useState([]);
	const closeModalHandler = () => setShow(false);
	const [show, setShow] = useState(false);
	const [artists, setArtists] = useState([]);

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
	};

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
		// let deferred = q.defer();
		getArtists().then(
			function (results) {
				setArtists(results);
			},
			function (error) {
				console.log("Error: Failed to retrieve artist data");
				console.log(error);
			}
		);
		// return deferred.promise;
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
					<button onClick={() => setShow(true)} className="btn btn-primary">
						Add new song
					</button>
				</div>

				{show ? (
					<Modal
						show={show}
						close={closeModalHandler}
						title="Add Song"
						inputs={["name"]}
						selects={[artists]}
						selectOptions={[]}
						onChange={onChange}
						onSubmit={SendForm}
						list={artists}
						options={artists}
					/>
				) : null}

				<Table title="Songs" cols={cols} data={data} property="song"></Table>
			</div>
		</>
	);
}
