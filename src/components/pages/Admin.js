import React from "react";
import "../../App.css";

export default function Admin() {
	return (
		<div>
			<div>
                <span className="admin">
                    <h1>
                        Users
					</h1>
                </span>

				<div>
                    <span> Username </span>
                    <span> Playlists </span>
                    <span> Actions </span>
                </div>

                <div>
                    <span> user123 </span>
                    <span> 2 </span>
                    <span>
                        <button>Remove User</button>
                    </span>
                </div>

                <div>
                    <span> user456 </span>
                    <span> 1 </span>
                    <span>
                        <button>Remove User</button>
                    </span>
                </div>
            </div>
		</div>
	);
}
