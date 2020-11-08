import React from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Account from "./components/pages/Account";
import Playlists from "./components/pages/Playlists";
import Playlist from "./components/pages/Playlist";
import Admin from "./components/pages/Admin";
import Search from "./components/pages/Search";

function App() {
	return (
		<div className="App">
			<Router>
				<Navbar />
				<Switch>
					<Route path="/" exact component={Home} />
					<Route path="/login" component={Login} />
					<Route path="/account" component={Account} />
					<Route path="/playlists" component={Playlists} />
					<Route path="/playlist" component={Playlist} />
					<Route path="/admin" component={Admin} />
					<Route path="/search" component={Search} />
				</Switch>
			</Router>
		</div>
	);
}

export default App;
