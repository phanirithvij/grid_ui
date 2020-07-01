import Grid from "@material-ui/core/Grid";
import { loader } from "graphql.macro";
import React, { useState } from "react";
import { Query, QueryResult } from "react-apollo";
import "../css/common.css";
import NodeType from "../models/node";
import "./Nodes.css";
import { ReactComponent as RightIcon } from "../assets/icons/arrow.svg";
import { Status } from "../components/Status";
import NodeComponent from "../components/Node/Node";

const NODES_QUERY = loader("../graphql/nodes.gql");
interface GqlDataType {
	nodes: NodeType[];
}

export default function Nodes() {
	let [nodes, setNodes] = useState<NodeType[]>([]);

	return (
		<section id="body">
			<div className="padding highlightable">
				<Query
					query={NODES_QUERY}
					// TODO remove <Query /> and try another way if two builds are not allowed
					// rebuilds twice because of setting nodes
					// do not use <Query /> if that's not intended
					onCompleted={(data: GqlDataType) => setNodes(data!.nodes)}
				>
					{(result: QueryResult<GqlDataType>) => {
						let { loading, error } = result;
						if (loading) return <h4>fetching...</h4>;
						if (error) {
							console.error(error);
							// TODO show error message properly
							return <>{error.message}</>;
						}
						console.log(nodes);
						return (
							<Grid
								container
								direction="row"
								justify="center"
								alignItems="center"
							>
								<table className="table table-hover">
									<thead className="thead-dark">
										<tr>
											<th scope="col">#</th>
											<th scope="col">Name</th>
											<th scope="col">ID</th>
											<th scope="col">OS</th>
											<th scope="col">status</th>
											<th scope="col"></th>
										</tr>
									</thead>
									<tbody>
										{/* Map over the nodes  */}
										{nodes.map((n, i) => (
											<NodeComponent node={n} key={n.id} index={i} />
										))}
									</tbody>
								</table>
							</Grid>
						);
					}}
				</Query>
			</div>
		</section>
	);
}
