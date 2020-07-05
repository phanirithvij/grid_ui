/** @jsx _jsx*/

import { css, jsx as _jsx } from "@emotion/core";
import { loader } from "graphql.macro";
import React from "react";
import { ReactComponent as RightIcon } from "../../assets/icons/arrow.svg";
import NodeType from "../../models/node";
import { Status, StatusType } from "../Status";

// Not using this query for getting a single node
// Because in Nodes.tsx we get all the attrs of all the existing Nodes
// Incase we might need this leaving it here
// eslint-disable-next-line
const NODE_QUERY = loader("../../graphql/node.gql");

export default function NodeComponent(props: {
	node: NodeType;
	index: number;
}) {
	const { node, index } = props;
	return (
		<tr css={css``}>
			<th scope="row">{index + 1}</th>
			{/* <td colSpan={2}>Larry the Bird</td> */}
			<td>Node {index + 1}</td>
			<td>{node.id}</td>
			<td>{node.platform}</td>
			<td>
				<Status state={StatusType.unknown} />
			</td>
			<td>
				<RightIcon />
			</td>
		</tr>
	);
}
