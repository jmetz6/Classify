import React, { Component } from "react";
import "../../App.css";

export default function Login() {
	return (
		<div className="login">
			<h1>Login</h1>
			<div className="login-text">
				<div className="username">
					<label for="username">Username</label>
					<input type="text" />
				</div>
				<div>
					<label for="password">Password</label>
					<input type="text" />
					<span>{<button>Login</button>}</span>
				</div>
			</div>
		</div>
	);
}
