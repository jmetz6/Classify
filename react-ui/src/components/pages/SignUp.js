import React, { useState } from "react";
import Axios from "axios";
import "../../App.css";

export default function SignUp(props) {
	// const [data, setdata] = useState({
	// 	Username: "",
	// 	Password: "",
	// });
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const apiUrl = "/api/signup";
	const Registration = (e) => {
		e.preventDefault();
		// debugger;
		const data1 = {
			name: username,
			word: password,
		};
		Axios.post(apiUrl, data1).then((result) => {
			// debugger;
			console.log(result);
			if (result.data.errno) alert("Invalid User");
			else alert("successful signup");
		});
	};
	// const onChange = (e) => {
	// 	e.persist();
	// 	// debugger;
	// 	setdata({ ...data, [e.target.name]: e.target.value });
	// };
	return (
		<div className="wrapper fadeInDown">
			<div id="formContent">
				{/* <!-- Tabs Titles --> */}

				{/* <!-- Icon --> */}
				<div className="fadeIn first">
					<h2>Sign up</h2>
				</div>

				{/* <!-- Login Form --> */}
				<form>
					<input
						type="text"
						name="Username"
						// onChange={onChange}
						// value={data.Username}
						onChange={(e) => {
							setUsername(e.target.value);
						}}
						id="signup"
						className="fadeIn second"
						placeholder="username"
					/>
					<input
						type="password"
						id="password"
						name="Password"
						// onChange={onChange}
						// value={data.Password}
						onChange={(e) => {
							setPassword(e.target.value);
						}}
						className="fadeIn third"
						placeholder="password"
					/>
					<input
						type="submit"
						onClick={Registration}
						className="fadeIn fourth"
						value="SIGN UP"
					/>
				</form>
			</div>
		</div>
	);
}
