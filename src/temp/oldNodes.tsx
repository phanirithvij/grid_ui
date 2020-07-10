/** @jsx _jsx*/
import { loader } from "graphql.macro";
import React, { useEffect, useReducer, useState } from "react";
import { Query, QueryResult } from "react-apollo";
import { ReactComponent as SortIcon2 } from "../assets/icons/sorticon-plain.svg";
import NodeRow from "../components/Node/NodeRow";
import RingSystem from "../components/RingSystem/RingSystem";
import SortButton, { SelectState } from "../components/SortButton";
import "../css/common.css";
import NodeType from "../models/node";
import RingDetails from "../models/rings";
import "./Nodes.module.css";
import { css, jsx as _jsx } from "@emotion/core";

/* TODO
	1. add a pagination variable to the query
	2. add a page component
	3. pagination component which shows active page, next, prev etc..
*/
const NODES_QUERY = loader("../graphql/nodes.gql");

interface GqlDataType {
	nodes: NodeType[];
}

const initialState: RingDetails = {
	count: 0,
	progresses: {},
};

function randomColor() {
	var letters = "0123456789ABCDEF";
	var color = "#";
	for (var i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
}

function reducer(state: RingDetails, action: { type: string; args?: any }) {
	switch (action.type) {
		// These will not be in the final code
		// these are for testing
		case "increment":
			const newState = {
				count: state.count + 1,
				progresses: { ...state.progresses },
			};
			newState.progresses[state.count] = {
				progress: 25,
				// progress: Math.round(Math.random() * 40 + 1),
				color: randomColor(),
			};
			// console.log(newState);
			return newState;
		case "decrement":
			// remove the previous progresses
			delete state.progresses[state.count - 1];
			// console.log(state.progresses);

			if (state.count < 1) {
				state.count = 1;
			}
			const ret = { count: state.count - 1, progresses: state.progresses };
			return ret;
		case "update":
			// console.log(state, action.args);
			const updatedState = { ...state };
			if (updatedState.count > 0) {
				updatedState.progresses[action.args as number] = {
					...updatedState.progresses[action.args as number],
					progress: Math.round(Math.random() * 99 + 1),
				};
			}
			// console.log(updatedState);
			return updatedState;
		default:
			throw new Error();
	}
}

export default function Nodes() {
	let [activeNodes, setActiveNodes] = useState<NodeType[]>([]);
	let [currentIndex, setcurrentIndex] = useState(0);

	let sortbutton = SortButton({ initialState: SelectState.up });

	const increment = () => {
		dispatch({ type: "increment" });
	};
	const decrement = () => {
		dispatch({ type: "decrement" });
	};
	const update = () => {
		dispatch({ type: "update", args: currentIndex });
	};
	const updateIndex = (ev: React.ChangeEvent<HTMLSelectElement>) => {
		const selected = parseInt(ev.target.value);
		// console.log("selected", selected);
		setcurrentIndex(selected);
	};

	const [state, dispatch] = useReducer(reducer, initialState);

	// componentDidMount
	useEffect(() => {
		increment();
		increment();
		increment();
		increment();
	}, []);

	return (
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
								<button onClick={increment}>increment</button>
								<button onClick={decrement}>decrement</button>
								<button onClick={update}>update</button>
								<select onChange={updateIndex}>
									{Object.entries(state.progresses).map(([key, value]) => (
										<option key={key} value={key}>
											value: {JSON.stringify(value)}
										</option>
									))}
								</select>
								<RingSystem details={state} />
								<table className="table table-hover">
									<thead>
										<tr>
											<th
												scope="col"
												onClick={increment}
												css={css`
													cursor: pointer;
												`}
											>
												#
											</th>
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
											<NodeRow node={n} key={n.id} index={i} />
										))}
									</tbody>
								</table>
							</React.Fragment>
						);
					}}
				</Query>
			</div>
		</section>
	);
}
