import React from "react";
import "../../App.css";

export default function SignUp() {
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
					<input type="submit" className="fadeIn fourth" value="SIGN UP" />
				</form>
			</div>
		</div>
	);
}
