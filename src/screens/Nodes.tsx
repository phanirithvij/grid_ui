import gql from "graphql-tag";
import React, { useState } from "react";
import { Query, QueryResult } from "react-apollo";
import { Link } from "react-router-dom";
import NodeComponent from "../components/Node";

// Using SpaceX api as an example
const NODES_QUERY = gql`
	query {
		nodes {
			debug
			host
			port
			role
			timeout
			cleanUpCycle
			maxSession
			downPollingLimit
			browserTimeout
			unregisterIfStillDownAfter
			remoteHost
			registerCycle
			register
			proxy
			nodeStatusCheckTimeout
			nodePolling
			id
			hub
		}
	}
`;

export default function Nodes() {
	let [nodes, setNodes] = useState([{ id: "2", xd: 32 }]);

	function addNode() {
		nodes = [
			...nodes,
			{ id: Math.round(Math.random() * 1000).toString(), xd: 32 },
		];
		setNodes(nodes);
	}

	return (
		<>
			<div>
				Nodes page <br />
				<Link to="/home">Helo</Link>
			</div>
			<Query query={NODES_QUERY}>
				{(result: QueryResult<any, Record<string, any>>) => {
					// if (loading) return <h4>Loading...</h4>;
					// if (error) console.log(error);
					console.log(result);
					return <></>;
				}}
			</Query>
			{nodes.map((node) => (
				<NodeComponent node={node} key={node.id} />
			))}
			<button onClick={addNode}>Add new</button>
		</>
	);
}
