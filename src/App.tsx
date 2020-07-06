import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import React from "react";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// css import order is important
/* 1 */ import "./css/theme.css";
/* 2 */ import "./css/theme-selenium.css";
/* 3 */ import "./App.css";

import HelpPage from "./screens/HelpPage";
import Console from "./screens/Console";
// import SearchAppBar from "./components/AppBar/AppBar";
import NavBar from "./components/NavBar/NavBar";

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
				<NavBar />
				<Switch>
					<Route exact path="/" component={HelpPage} />
					<Route exact path="/home" component={HelpPage} />
					<Route exact path="/console" component={Console} />
					<Route component={HelpPage} />
				</Switch>
			</Router>
		</ApolloProvider>
	);
}

export default App;
