import React, { useState } from "react";
import "../../App.css";
import { Table } from "../Table";
import { searchAll } from "../../services/search.service";

export default function Search() {
	const [cols] = useState(["Title", "Artist", "Actions"]);
	const [data, setData] = useState([]);
	const [show, setShow] = useState(false);
	const [title, setTitle] = useState("");
	const [searchValue, setSearchValue] = useState("");

	const onChange = (e) => {
		setSearchValue(e.target.value);
		onSearch();
	};

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

			{show ? (
				<Table
					title={"Results: " + title}
					cols={cols}
					data={data}
					property="song"
				></Table>
			) : null}
		</div>
	);
}
