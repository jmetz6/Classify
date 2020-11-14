import React from "react";
import "../../App.css";

export default function SignUp() {
	return (
		<div className="login">
			<h1>Sign up</h1>
			<div className="login-text">
				<div className="username">
					<label for="username">Username</label>
					<input type="text" />
				</div>
				<div>
					<label for="password">Password</label>
					<input type="text" />
					<span>{<button>Sign up</button>}</span>
				</div>
			</div>
		</div>
	);
}
