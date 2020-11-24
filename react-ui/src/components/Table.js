import React from "react";
import { Link } from "react-router-dom";
import "../App.css";
import "./Table.css";

function Table(props) {
	return (
		<div id="resp-table">
			<div id="resp-table-caption">
				<span>{props.title}</span>
			</div>

			<div id="resp-table-header">
				{props.cols.map((i) => {
					return (
						<span key={i} className="table-header-cell">
							{i}
						</span>
					);
				})}
			</div>

			<div className="resp-table-body">
				{props.data.map((row) => {
					return (
						<div key={row.id} className="resp-table-row">
							{Object.keys(row).map((keyName, i) => {
								if (keyName !== "id") {
									if (keyName === "actions") {
										return (
											<span
												key={"actions_" + row.id}
												className="table-body-cell"
											>
												{row.actions.map((action) => {
													switch (action) {
														case "add":
															return (
																<button
																	className="btn btn-primary"
																	key={action + row.id}
																>
																	Add {props.property}
																</button>
															);
														case "edit":
															return (
																<button
																	className="btn btn-primary"
																	key={action + row.id}
																>
																	Edit {props.property}
																</button>
															);
														case "remove":
															return (
																<button
																	className="btn btn-secondary"
																	key={action + row.id}
																>
																	Remove {props.property}
																</button>
															);
														case "select":
															return (
																<Link
																	key={action + row.id}
																	to={`/${props.property}/${row.id}`}
																>
																	<button className="btn btn-primary">
																		Select {props.property}
																	</button>
																</Link>
															);
														default:
															return null;
													}
												})}
											</span>
										);
									} else {
										return (
											<span
												key={row[keyName] + "_" + row.id + "_" + i}
												className="table-body-cell"
											>
												{row[keyName]}
											</span>
										);
									}
								}
								return null;
							})}
						</div>
					);
				})}
			</div>

			<div id="resp-table-footer">
				{props.cols.map((i) => {
					return (
						<span key={i + "_footer"} className="table-footer-cell"></span>
					);
				})}
			</div>
		</div>
	);
}
export default Table;
