import React from "react";

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

export const InputForm = ({ onClick, title, inputs, selects }) => { 
	return(
		<div className="wrapper fadeInDown">
			<div id="formContent">

				<div className="fadeIn first">
					<h2>{title}</h2>
				</div>

				<form id="input-form"> 
					{
						inputs.map((element, number) => {
							return (
								<input 
									key={element + "_" + number}
									type="text" 
									id={element}
									className="fadeIn second"
									name={element}
									placeholder={element}
								/>	
							)
						})
					}

					{
						selects.map((element, number) => {
							return (
								<select
									key={element + "_" + number}
								>
										{element}
								</select>
							)
						})
					}

					<input onClick={onClick({ form: "input-form"})} type="submit" className="fadeIn fourth" value="Submit" />
				</form>
			</div>
		</div>
	);
}
