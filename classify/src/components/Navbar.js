import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

//Login, account, playlist, playlists, search,
function Navbar() {
	return (
		<>
			<nav className="navbar">
				<div className="navbar-container">
					<Link to="/" className="navbar-logo">
						Home
					</Link>
					<ul className="nav-menu">
						<li>
							<Link to="/login" className="nav-links">
								Login
							</Link>
						</li>
						<li>
							<Link to="/account" className="nav-links">
								Account
							</Link>
						</li>
						<li>
							<Link to="/playlist" className="nav-links">
								Playlist
							</Link>
						</li>
						<li>
							<Link to="/search" className="nav-links">
								Search
							</Link>
						</li>
						<li>
							<Link to="/Admin" className="nav-links">
								Admin
							</Link>
						</li>
					</ul>
				</div>
			</nav>
		</>
	);
}
export default Navbar;
