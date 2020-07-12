/** @jsx _jsx*/

import { css, jsx as _jsx } from "@emotion/core";
import { loader } from "graphql.macro";
import React from "react";
import { ReactComponent as RightIcon } from "../../assets/icons/arrow.svg";
import NodeType from "../../models/node";
import { Status, LABELS } from "../Status";

// Not using this query for getting a single node
// Because in Nodes.tsx we get all the attrs of all the existing Nodes
// Incase we might need this leaving it here
// eslint-disable-next-line
const NODE_QUERY = loader("../../graphql/node.gql");

const NodeRow = React.memo(
	(props: {
		node: NodeType;
		index: number;
		dispatch?: any;
		selected?: number;
	}) => {
		const { node, index, selected = -1 } = props;
		return (
			// Wrapping in a fragment to avoid a not so meaningful lint issue
			// Possibly a bug. To see what it is remove this top level fragment
			<React.Fragment>
				<tr
					// Remove the vertical border in this table
					css={css`
						td {
							border: 0 !important;
							font-family: monospace;
						}
					`}
				>
					<th scope="row">{index + 1}</th>
					{/* <td colSpan={2}>Larry the Bird</td> */}
					<td>Node {index + 1}</td>
					<td>{node.id}</td>
					<td>
						<Status status={node.status} selected={selected} />
					</td>
					<td
						css={css`
							cursor: pointer;
						`}
						data-index={index}
						onClick={() => console.log(index)}
					>
						<RightIcon />
					</td>
				</tr>
			</React.Fragment>
		);
	}
);

export default NodeRow;
