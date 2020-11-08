import React from "react";
import "../../App.css";

export default function Playlist() {
    return (
        <>
            <div>
                <span>
                    <h1>
                        Playlist
					</h1>
                </span>

                <div>
                    <span>Number</span>
                    <span>Title</span>
                    <span>Artist</span>
                    <span>Actions</span>
                </div>

                <div>
                    <span> 1 </span>
                    <span> Foo </span>
                    <span> Bar </span>
                    <span>
                        <button>Remove</button>
                    </span>
                </div>

                <div>
                    <span> 2 </span>
                    <span> Bar </span>
                    <span> Baz </span>
                    <span>
                        <button>Remove</button>
                    </span>
                </div>

                <div>
                    <span> 3 </span>
                    <span> Foobar </span>
                    <span> Baz </span>
                    <span>
                        <button>Remove</button>
                    </span>
                </div>
            </div>
        </>
    );
}
