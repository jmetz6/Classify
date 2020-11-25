import React from "react";
import "../App.css";
// import Select, { components } from "react-select";

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

export const InputForm = ({
	onChange,
	onSubmit,
	close,
	inputs,
	selects,
	selectOptions,
}) => {
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

			{selects.map((element, i) => {
				return (
					<select key={element + "_" + i} name={element}
						onChange={(e) => {
							onChange(element, e.target.value);
						}}>
						{selectOptions[i].map((item, j) => {
							return (
								<option key={item.name + "_" + j} value={item.name}>
									{item.name}
								</option>
							);
						})}
					</select>
				);
			})}

			<button
				onClick={() => {
					onSubmit();
					close();
				}}
				className="btn btn-primary"
			>
				Submit
			</button>
		</div>
	);
};
