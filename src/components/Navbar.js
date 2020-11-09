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
						<div className="flex-no-wrap">
							<span>Classify</span> 
							<span>🎼</span>
						</div>
						{/* <img src="./public/logo.png" alt="Classify Logo"/> */}
					</Link>
					<div className="menu-icon" onClick={handleClick}>
						<i className={click ? "fas fa-times" : "fas fa-bars"} />
					</div>
					<ul className={click ? "nav-menu active" : "nav-menu"}>
						{/* <li className="nav-item">
							<Link to="/login" className="nav-links" onClick={closeMobileMenu}>
								Login
							</Link>
						</li> */}
						{/* <li className="nav-item">
							<Link
								to="/account"
								className="nav-links"
								onClick={closeMobileMenu}
							>
								Account
							</Link>
						</li> */}
						<li className="nav-item">
							<Link
								to="/search"
								className="nav-links"
								onClick={closeMobileMenu}
							>
								<span>Search</span> 
								<span>🔍</span>
							</Link>
						</li>
						<li className="nav-item">
							<Link to="/songs" className="nav-links" onClick={closeMobileMenu}>
								<span>Songs</span> 
								<span>🎧</span> 
							</Link>
						</li>
						<li className="nav-item">
							<Link
								to="/artists"
								className="nav-links"
								onClick={closeMobileMenu}
							>
								<span>Artists</span> 
								<span>🎸</span>
							</Link>
						</li>
						<li className="nav-item">
							<Link
								to="/playlists"
								className="nav-links"
								onClick={closeMobileMenu}
							>
								<span>Playlists</span> 
								<span>🎶</span>
							</Link>
						</li>

						<li className="nav-item">
							<Link to="/admin" className="nav-links" onClick={closeMobileMenu}>
								<span>Admin</span> 
								<span>🤵</span>
							</Link>
						</li>
					</ul>
					{button && <Button buttonStyle="btn--outline">Login</Button>}
				</div>
			</nav>
		</>
	);
}
export default Navbar;
