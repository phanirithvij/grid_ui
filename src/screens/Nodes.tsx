/** @jsx jsx*/
import { loader } from "graphql.macro";
import React, { useState } from "react";
import { Query, QueryResult } from "react-apollo";
import { ReactComponent as SortIcon2 } from "../assets/icons/sorticon-plain.svg";
import NodeComponent from "../components/Node/Node";
import SortButton, { SelectState } from "../components/SortButton";
import "../css/common.css";
import NodeType from "../models/node";
import "./Nodes.module.css";
import { Provider } from "react-redux";
import store from "../redux/store";
import Ring from "../components/Ring/Ring";
import { css, jsx } from "@emotion/core";

/* TODO
	1. add a pagination variable to the query
	2. add a page component
	3. pagination component which shows active page, next, prev etc..
*/
const NODES_QUERY = loader("../graphql/nodes.gql");

interface GqlDataType {
	nodes: NodeType[];
}

export default function Nodes() {
	let [activeNodes, setActiveNodes] = useState<NodeType[]>([]);
	let [incr, setIncr] = useState(0);

	let sortbutton = SortButton({ initialState: SelectState.up });

	const unSelect = () => {
		console.log(sortbutton);
		setIncr(incr + 1);
	};

	return (
		<Provider store={store}>
			<section id="body">
				<div className="padding highlightable">
					<Query
						query={NODES_QUERY}
						// TODO remove <Query /> and try another way if two builds are not allowed
						// rebuilds twice because of setting nodes
						// do not use <Query /> if that's not intended
						onCompleted={(data: GqlDataType) => setActiveNodes(data!.nodes)}
					>
						{(result: QueryResult<GqlDataType>) => {
							let { loading, error } = result;
							if (loading) return <h4>fetching...</h4>;
							if (error) {
								console.error(error);
								// TODO show error message properly
								return <div>{error.message}</div>;
							}
							return (
								<React.Fragment>
									<button onClick={unSelect}>unSelect</button>
									<div
										css={css`
											position: relative;
											height: ${112 * 2}px;
										`}
									>
										<Ring
											color="red"
											offset={incr}
											radius={112}
											progress={100}
											stroke={12}
										/>
										<Ring
											color="pink"
											offset={incr}
											radius={112}
											progress={50}
											stroke={12}
										/>
									</div>
									<table className="table table-hover">
										<thead>
											<tr>
												<th scope="col">#</th>
												<th scope="col">Name {sortbutton}</th>
												<th scope="col">
													ID <SortIcon2 />
												</th>
												<th scope="col">OS</th>
												<th scope="col">status</th>
												<th scope="col"></th>
											</tr>
										</thead>
										<tbody>
											{/* Map over the nodes */}
											{activeNodes.map((n, i) => (
												<NodeComponent node={n} key={n.id} index={i} />
											))}
										</tbody>
									</table>
								</React.Fragment>
							);
						}}
					</Query>
				</div>
			</section>
		</Provider>
	);
}
