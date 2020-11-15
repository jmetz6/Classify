import React from "react";
import "../../App.css";

export default function Login() {
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
						className="fadeIn second"
						name="login"
						placeholder="username"
					/>
					<input
						type="text"
						id="password"
						className="fadeIn third"
						name="login"
						placeholder="password"
					/>
					<input type="submit" className="fadeIn fourth" value="Log In" />
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
