import React from "react";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import Modal from "react-modal";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// css import order is important
/* 1 */ import "./css/theme.css";
/* 2 */ import "./css/theme-selenium.css";
/* 3 */ import "./App.css";

import HelpPage from "./screens/HelpPage/HelpPage";
import Console from "./screens/Console/Console";
// import SearchAppBar from "./components/AppBar/AppBar";
import NavBar from "./components/NavBar/NavBar";
import Hubpage from "./screens/Hub/Hub";
import NodeInfo from "./screens/Node/NodeInfo/NodeInfo";

const cache = new InMemoryCache();
const link = new HttpLink({
	// document.location.protocol + "//" + document.location.host + "/graphql"
	// uri: "http://localhost:4444/graphql",
	uri: "http://localhost:5000/graphql",
});

const client = new ApolloClient({
	cache,
	link,
});

declare global {
	interface Window {
		rerunSearch: VoidFunction;
		pbar: any;
	}
}


Modal.setAppElement("#root");

function App() {
	return (
		<ApolloProvider client={client}>
			<Router>
				<NavBar />
				<Switch>
					<Route exact path="/" component={HelpPage} />
					<Route exact path="/hub" component={Hubpage} />
					<Route exact path="/node/:id" component={NodeInfo} />
					<Route exact path="/home" component={HelpPage} />
					<Route exact path="/console" component={Console} />
					<Route component={HelpPage} />
				</Switch>
			</Router>
		</ApolloProvider>
	);
}

export default App;
