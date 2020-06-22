import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import React from "react";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// materialize
import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize.min";

// css import order is important
/* 1 */ import "./css/theme.css";
/* 2 */ import "./css/theme-selenium.css";
/* 3 */ import "./App.css";

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
