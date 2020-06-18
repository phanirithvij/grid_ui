import { loader } from "graphql.macro";
import React, { useState } from "react";
import { Query, QueryResult } from "react-apollo";
import { Link } from "react-router-dom";
import NodeComponent from "../components/Node";

const NODES_QUERY = loader("../graphql/nodes.gql");

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
				<Link to="/home">Home</Link>
			</div>
			<Query query={NODES_QUERY}>
				{(result: QueryResult) => {
					let { loading, error, data } = result;
					if (loading) return <h4>Loading...</h4>;
					if (error) console.log(error);
					// console.log("result");
					console.log(data);
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
