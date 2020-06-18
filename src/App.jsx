import React from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import "./App.css";
import logo from "./images/selenium.png";
import Home from "./screens/Home";
import Nodes from "./screens/Nodes";

function App() {
	console.log(logo);
	return (
		<Router>
			<header>
				<img src={logo} alt="icon"></img>
				<Link to="/home">Home Page</Link>
			</header>
			<Switch>
				<Route exact path="/home" component={Home} />
				<Route exact path="/nodes" component={Nodes} />
				<Route exact path="/" component={Home} />
			</Switch>
		</Router>
	);
}

export default App;
