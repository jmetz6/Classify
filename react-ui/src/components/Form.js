import React from "react";
import "../App.css";

export const SignUpForm = ({ onClick }) => {
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

export const InputForm = ({ onChange, onSubmit, close, inputs, selects }) => {
	return (
		<div id="input-form">
			{inputs.map((element, number) => {
				return (
					<input
						key={element + "_" + number}
						type="text"
						id={element}
						name={element}
						placeholder={element}
						onChange={(e) => {
							onChange(element, e.target.value);
						}}
					/>
				);
			})}

			{selects.map((element, number) => {
				return <select key={element + "_" + number}>{element}</select>;
			})}

			<button onClick={() => { onSubmit(); close();}} className="btn btn-primary">Submit</button>
		</div>
	);
};
