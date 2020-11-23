import React, { useState, useEffect } from "react";
import Axios from "axios";
import "../../App.css";

export default function Login() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const apiUrl = "http://localhost:5000/api/login";
	const Authentication = (e) => {
		e.preventDefault();
		// debugger;
		const data1 = {
			name: username,
			word: password,
		};
		Axios.post(apiUrl, data1).then((result) => {
			// debugger;
			console.log(result);
			if (!result.data.length) 
				alert("Invalid User");
			else
				alert("successful login");
		});
	};
	return (
		<div className="wrapper fadeInDown">
			<div id="formContent">
				{/* <!-- Tabs Titles --> */}

				{/* <!-- Icon --> */}
				<div className="fadeIn first">
					<h2>Log in</h2>
				</div>

				{/* <!-- Login Form --> */}
				<form>
					<input
						type="text"
						id="login"
						onChange={(e) => {
							setUsername(e.target.value);
						}}
						className="fadeIn second"
						name="login"
						placeholder="username"
					/>
					<input
						type="text"
						id="password"
						onChange={(e) => {
							setPassword(e.target.value);
						}}
						className="fadeIn third"
						name="login"
						placeholder="password"
					/>
					<input
						type="submit"
						onClick={Authentication}
						className="fadeIn fourth"
						value="Log In"
					/>
				</form>

				{/* <!-- Remind Passowrd --> */}
				{/* <div id="formFooter">
					<a className="underlineHover" href="#">
						Forgot Password?
					</a>
				</div> */}
			</div>
		</div>
	);
}
