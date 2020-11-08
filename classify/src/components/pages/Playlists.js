import React from "react";
import "../../App.css";

import { Link } from "react-router-dom";

export default function Playlists() {
	return (
		<>
			<div>
				<span>
					<h1>
						Playlists
					</h1>
				</span>

				<div>
					<button>Add Playlist</button>
				</div>

				<div>
					<span>Name</span>
					<span>User</span>
					<span>Actions</span>
				</div>

				<div>
					<span>
						<Link to="/playlist">my-playlist</Link>
					</span>
					<span>user123</span>
					<span>
						<button>Select</button>
						<button>Delete</button>
					</span>
				</div>

				<div>
					<span>
						<Link to="/playlist">favorite-songs</Link>
					</span>
					<span>user123</span>
					<span>
						<button>Select</button>
						<button>Delete</button>
					</span>
				</div>

				<div>
					<span>
						<Link to="/playlist">my-songs</Link>
					</span>
					<span>user456</span>
					<span>
						<button>Select</button>
						<button>Delete</button>
					</span>
				</div>
			</div>
		</>
	);
}
