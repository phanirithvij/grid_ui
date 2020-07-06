/** @jsx _jsx*/
import { css, jsx as _jsx } from "@emotion/core";
import { loader } from "graphql.macro";
import Pagination from "rc-pagination";
import React, { useCallback, useEffect, useReducer, useState } from "react";
import { Query, QueryResult } from "react-apollo";
import { Provider } from "react-redux";
import { ReactComponent as SortIcon2 } from "../assets/icons/sorticon-plain.svg";
import NodeComponent from "../components/Node/Node";
import RingSystem from "../components/RingSystem/RingSystem";
import SortButton, { SelectState } from "../components/SortButton";
import { colors, StatusType } from "../components/Status";
import "../css/common.css";
import NodeType from "../models/node";
import StateType from "../models/rings";
import store from "../redux/store";
import "./Console.css";
import "rc-pagination/assets/index.css";
import localeInfo from 'rc-pagination/lib/locale/en_US';

/* TODO
	1. add a pagination variable to the query
	2. add a page component
	3. pagination component which shows active page, next, prev etc..
*/
const NODES_QUERY = loader("../graphql/nodes.gql");

interface GqlDataType {
	nodes: NodeType[];
}

const initialState: StateType = {
	count: 0,
	progresses: {},
};

function reducer(state: StateType, action: { type: string; args?: any }) {
	switch (action.type) {
		case "addRing":
			const newState = {
				count: state.count + 1,
				progresses: { ...state.progresses },
			};
			newState.progresses[state.count] = {
				progress: 25,
				// progress: Math.round(Math.random() * 40 + 1),
				color: colors[state.count as StatusType],
			};
			return newState;
		case "updateRing":
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

export default function Console() {
	let [activeNodes, setActiveNodes] = useState<NodeType[]>([]);
	let [currentIndex] = useState(0);

	let sortbutton = SortButton({ initialState: SelectState.up });

	const addRing = useCallback(() => {
		dispatch({ type: "addRing", args: currentIndex });
	}, [currentIndex]);

	let [currentPage, setCurrentPage] = useState(1);
	const onPageChange = (page: number, pageSize: number) => {
		setCurrentPage(page);
	};

	// const updateRing = () => {
	// 	dispatch({ type: "updateRing", args: currentIndex });
	// };
	// const updateIndex = (ev: React.ChangeEvent<HTMLSelectElement>) => {
	// 	const selected = parseInt(ev.target.value);
	// 	// console.log("selected", selected);
	// 	setcurrentIndex(selected);
	// };

	const [state, dispatch] = useReducer(reducer, initialState);

	// Initialize the 4 rings
	useEffect(() => {
		addRing();
		addRing();
		addRing();
		addRing();
	}, [addRing]);

	const paginationItemRenderer = (
		page: number,
		type: string,
		element: React.ReactNode
	) => {
		if (type === "prev") {
			return <button className="btn">Prev</button>;
		} else if (type === "next") {
			return <button className="btn">Next</button>;
		} else if (type === "jump-next"){
			return <i></i>
		}
		console.log(type);
		return element;
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
									<RingSystem state={state} />
									<table className="table table-hover">
										<thead>
											<tr>
												<th
													scope="col"
													onClick={addRing}
													css={css`
														cursor: pointer;
													`}
												>
													#
												</th>
												<th
													scope="col"
													// onClick={}
													css={css`
														cursor: pointer;
													`}
												>
													Name {sortbutton}
												</th>
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
									<Pagination
										css={css`
											.rc-pagination-prev,
											.rc-pagination-next {
												border: 0;
											}
										`}
										itemRender={paginationItemRenderer}
										onChange={onPageChange}
										current={currentPage}
										showTitle={false}
										total={100}
										showQuickJumper={true}
										locale={localeInfo}
									/>
								</React.Fragment>
							);
						}}
					</Query>
				</div>
			</section>
		</Provider>
	);
}
