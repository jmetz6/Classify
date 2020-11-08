import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "./Button";
import "./Navbar.css";

//Login, account, playlist, playlists, search,
function Navbar() {
	const [click, setClick] = useState(false);
	const [button, setButton] = useState(true);

	const handleClick = () => setClick(!click);
	const closeMobileMenu = () => setClick(false);

	const showButton = () => {
		if (window.innerWidth <= 960) {
			setButton(false);
		} else {
			setButton(true);
		}
	};

	useEffect(() => {
		showButton();
	}, []);

	window.addEventListener("resize", showButton);

	return (
		<>
			<nav className="navbar">
				<div className="navbar-container">
					<Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
						Classify
						{/* <img src="./public/logo.png" alt="Classify Logo"/> */}
					</Link>
					<div className="menu-icon" onClick={handleClick}>
						<i className={click ? "fas fa-times" : "fas fa-bars"} />
					</div>
					<ul className={click ? "nav-menu active" : "nav-menu"}>
						<li className="nav-item">
							<Link to="/login" className="nav-links" onClick={closeMobileMenu}>
								Login
							</Link>
						</li>
						<li className="nav-item">
							<Link
								to="/account"
								className="nav-links"
								onClick={handleClick}
								onClick={closeMobileMenu}
							>
								Account
							</Link>
						</li>
						<li className="nav-item">
							<Link
								to="/playlists"
								className="nav-links"
								onClick={closeMobileMenu}
							>
								Playlists
							</Link>
						</li>
						<li className="nav-item">
							<Link
								to="/search"
								className="nav-links"
								onClick={closeMobileMenu}
							>
								Search
							</Link>
						</li>
						<li className="nav-item">
							<Link to="/admin" className="nav-links" onClick={closeMobileMenu}>
								Admin
							</Link>
						</li>
					</ul>
					{button && <Button buttonStyle="btn--outline">SIGN UP</Button>}
				</div>
			</nav>
		</>
	);
}
export default Navbar;
