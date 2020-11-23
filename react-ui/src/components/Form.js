import React, { useState } from "react";

import axios from "axios";

export const SignUpForm = ({ onClick }) => {
	const [data, setdata] = useState({
		Username: "",
		Password: "",
	});
	const apiUrl = "http://localhost:5000/api";

	const onChange = (e) => {
		e.persist();
		debugger;
		setdata({ ...data, [e.target.name]: e.target.value });
	};
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
						id="signup"
						className="fadeIn second"
						name="signup"
						placeholder="username"
					/>
					<input
						type="text"
						id="password"
						className="fadeIn third"
						name="signup"
						placeholder="password"
					/>
					<button type="submit" className="fadeIn fourth" value="SIGN UP" />
				</form>
			</div>
		</div>
	);
};
