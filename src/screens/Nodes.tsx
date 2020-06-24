import Grid from "@material-ui/core/Grid";
import { loader } from "graphql.macro";
import React, { Fragment, useState } from "react";
import { Query, QueryResult } from "react-apollo";
import { Link } from "react-router-dom";
import NodeComponent from "../components/Node/Node";
import "../css/common.css";
import NodeType from "../models/node";
import "./Nodes.css";

const NODES_QUERY = loader("../graphql/nodes.gql");
interface GqlDataType {
	nodes: NodeType[];
}

export default function Nodes() {
	let [nodes, setNodes] = useState<NodeType[]>([]);

	return (
		<div className="container">
			<div className="bg-green">
				<Link to="/home">
					<h3>Nodes page</h3>
				</Link>
			</div>
			<Query
				query={NODES_QUERY}
				// rebuilds twice because of setting nodes
				// do not use <Query /> if that's not intended
				onCompleted={(data: GqlDataType) => setNodes(data!.nodes)}
			>
				{(result: QueryResult<GqlDataType>) => {
					let { loading, error, data } = result;
					if (loading) return <h4>fetching...</h4>;
					if (error) {
						console.error(error);
						// TODO show error message properly
						return <>{error.message}</>;
					}
					return (
						<Grid
							container
							direction="row"
							justify="center"
							alignItems="center"
						>
							{/* Map over the nodes */}
							{/* data! implies data is not undefined */}
							{data!.nodes.map((n, i) => (
								<Fragment key={n.id}>
									<NodeComponent node={n} key={n.id} index={i} />
									{/* <RecipeReviewCard /> */}
									<p></p>
								</Fragment>
							))}
						</Grid>
					);
				}}
			</Query>
		</div>
	);
}
