import React from "react";
import "./Modal.css";
import { InputForm } from "./Form";

export const Modal = ({
	show,
	close,
	title,
	inputs,
	selects,
	onChange,
	onSubmit,
	selectOptions,
}) => {
	return (
		<div
			className="modal-wrapper fadeIn first"
			style={{
				transform: show ? "translateY(0vh)" : "translateY(-100vh)",
				opacity: show ? "1" : "0",
			}}
		>
			<div className="modal-header fadeIn second">
				<p>{title}</p>
				<span onClick={close} className="close-modal-btn">
					x
				</span>
			</div>
			<div className="modal-content fadeIn third">
				<div className="modal-body">
					<InputForm
						onChange={onChange}
						onSubmit={onSubmit}
						close={close}
						inputs={inputs}
						selectOptions={selectOptions}
						selects={selects}
					></InputForm>
				</div>
				{!onSubmit ? (
					<div className="modal-footer fadeIn fourth">
						<button onClick={close} className="btn-cancel">
							Close
						</button>
					</div>
				) : null}
			</div>
		</div>
	);
};
