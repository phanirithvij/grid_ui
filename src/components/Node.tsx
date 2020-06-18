import { loader } from "graphql.macro";
import React from "react";

// eslint-disable-next-line
const NODE_QUERY = loader("../graphql/node.gql");
console.log(NODE_QUERY);


export default function NodeComponent(props: {
	node: {
		id: string;
		xd: number;
	};
}) {
	const { node } = props;
	return (
		<div>
			<p>{node.id}</p>
			<p>{node.xd}</p>
		</div>
	);
}
