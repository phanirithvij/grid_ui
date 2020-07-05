import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import React from "react";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import * as Replacer from "findandreplacedomtext";

// materialize
// import "materialize-css/dist/css/materialize.min.css";
// import "materialize-css/dist/js/materialize.min";

// css import order is important
/* 1 */ import "./css/theme.css";
/* 2 */ import "./css/theme-selenium.css";
/* 3 */ import "./App.css";

import HelpPage from "./screens/HelpPage";
import Nodes from "./screens/Nodes";
// import SearchAppBar from "./components/AppBar/AppBar";
import NavBar from "./components/NavBar/NavBar";

declare global {
	interface Window {
		searchHighlight: (search: string) => void;
	}
}

const searchHighlight = (search: string) => {
	Replacer(document.documentElement, {
		find: new RegExp(search, "ig"),
		wrap: "mark",
		wrapClass: "highlight",
	});
};

window.searchHighlight = searchHighlight;

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
				{/* <SearchAppBar /> */}
				<NavBar />
				<Switch>
					<Route exact path="/" component={HelpPage} />
					<Route exact path="/home" component={HelpPage} />
					<Route exact path="/console" component={Nodes} />
					<Route component={HelpPage} />
				</Switch>
			</Router>
		</ApolloProvider>
	);
}

export default App;
