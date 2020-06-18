import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import React from "react";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import "./App.css";
import logo from "./images/selenium.png";
import Home from "./screens/Home";
import Nodes from "./screens/Nodes";

const cache = new InMemoryCache();
const link = new HttpLink({
	// document.location.protocol + "//" + document.location.host + "/graphql"
	uri: "http://localhost:5000/graphql",
});

const client = new ApolloClient({
	cache,
	link,
});

function App() {
	return (
		<ApolloProvider client={client}>
			<Router>
				<header>
					<img src={logo} alt="icon"></img>
					<Link to="/home">Home Page</Link>
				</header>
				<Switch>
					<Route exact path="/" component={Home} />
					<Route exact path="/home" component={Home} />
					<Route exact path="/nodes" component={Nodes} />
				</Switch>
			</Router>
		</ApolloProvider>
	);
}

export default App;
