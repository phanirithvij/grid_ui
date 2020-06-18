import React, { useState, Fragment } from "react";
import { Link } from "react-router-dom";

export default function Home(props) {
	let [nodes, setNodes] = useState([{ id: "2", xd: 32 }]);

	function addNode() {
		nodes = [...nodes, { id: Math.round(Math.random() * 1000).toString(), xd: 32 }];
		setNodes(nodes);
	}

	return (
		<>
			<div>
				Home page In a sense
				<Link to="/nodes">Helo</Link>
			</div>
			{nodes.map((node) => (
				<Fragment key={node.id}>
					<p>{node.id}</p>
					<p>{node.xd}</p>
				</Fragment>
			))}
			<button onClick={addNode}>Add new</button>
		</>
	);
}
