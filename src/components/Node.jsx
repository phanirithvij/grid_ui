import React from "react";
import { gql } from "apollo-boost";

const NODE_QUERY = gql`
	query NodeQuery($id: String!) {
		launch(id: $id) {
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

export default function NodeComponent(props) {
	const { node } = props;
	return (
		<div>
			<p>{node.id}</p>
			<p>{node.xd}</p>
		</div>
	);
}
