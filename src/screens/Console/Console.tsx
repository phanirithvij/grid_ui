/** @jsx _jsx*/
import { css, jsx as _jsx } from "@emotion/core";
import { loader } from "graphql.macro";
import keyboardJS from "keyboardjs";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import localeInfo from "rc-pagination/lib/locale/en_US";
import React, { useCallback, useEffect, useReducer, useState } from "react";
import { Query, QueryResult } from "react-apollo";
import { ReactComponent as SortIcon2 } from "../../assets/icons/sorticon-plain.svg";
import NodeRow from "../../components/Node/NodeRow";
import RingSystem from "../../components/RingSystem/RingSystem";
import SortButton, { SelectState } from "../../components/SortButton";
import { LABEL_COLORS, StatusType, LABELS } from "../../components/Status";
import TopBar from "../../components/TopBar";
import "../../css/common.css";
import NodeType from "../../models/node";
import PaginationState from "../../models/pagination";
import RingDetails from "../../models/rings";
import "./Console.css";

/**
 * TODO
	1. add a pagination variable to the query
	2. pagination component which queries based on page from server
*/

const NODES_QUERY = loader("../../graphql/grid.gql");

interface GqlDataType {
	grid: { nodes: NodeType[] };
}

// default for the <Pagination /> component
const numPerPage = 8;

const initialPaginationState: PaginationState = {
	allNodes: [],
	activeNodes: [],
	filteredNodes: [],
	currentPageCount: numPerPage,
	currentPage: 1,
	filterIndex: -1,
};

const initialDetails: RingDetails = {
	count: 0,
	progresses: {},
};

enum PaginationDispatchTypes {
	onPagechange,
	initialiaze,
	filterNodes,
	clearFilter,
}

enum PagenavType {
	next = "next",
	prev = "prev",
}

interface PaginationDispatchArgs {
	page?: number;
	pageSize?: number;
	allNodes?: NodeType[];
	type?: PagenavType;
	filterIndex?: number;
	pageCount?: number;
}

function ringReducer(state: RingDetails, action: { type: string; args?: any }) {
	switch (action.type) {
		case "addRing":
			const newState = {
				count: state.count + 1,
				progresses: { ...state.progresses },
			};
			newState.progresses[state.count] = {
				progress: 25,
				color: LABEL_COLORS[state.count as StatusType],
			};
			return newState;
		default:
			throw new Error();
	}
}

/**
 * Reducer to deal with pagination state updates
 * Also initialiazes the details from the server
 * @param state The sate of the progresses and pagination
 */
function paginationReducer(
	state: PaginationState,
	{
		type: actionType,
		args,
	}: { type: PaginationDispatchTypes; args?: PaginationDispatchArgs }
) {
	let newState = { ...state };

	switch (actionType) {
		case PaginationDispatchTypes.initialiaze:
			const { allNodes } = args!;
			newState = {
				...state,
				allNodes: allNodes!,
				activeNodes: allNodes!.slice(0, numPerPage),
				filteredNodes: [...allNodes!],
			};
			return newState;

		case PaginationDispatchTypes.onPagechange:
			const { page, pageSize } = args!;
			newState.activeNodes = newState.filteredNodes.slice(
				(page! - 1) * numPerPage,
				(page! - 1) * numPerPage + pageSize!
			);
			newState.currentPage = page!;
			newState.currentPageCount = pageSize!;
			return newState;

		case PaginationDispatchTypes.filterNodes:
			let filterIndex = -1;
			if (!args) {
				// if filterIndex was not specified
				// implies we need to re-filter on Page change
				// using the previous filter
				filterIndex = state.filterIndex;
			} else {
				// if specified
				filterIndex = args!.filterIndex!;
			}
			// if selected outside (ideally this wouldn't be called in this case)
			if (filterIndex === -1) return state;

			// if unknown was selected (which should Ideally be not visible)
			if (filterIndex === LABELS.length) return state;

			newState.filterIndex = filterIndex;

			// Note: Better way is to query the server for filtering nodes
			// filtering globally as of now
			newState.filteredNodes = state.allNodes.filter(
				(x) => x.status === LABELS[filterIndex]
			);

			// get the number of pages
			let pageCount = Math.floor(newState.filteredNodes.length / numPerPage);
			let remainingItems = newState.filteredNodes.length % numPerPage;
			if (remainingItems !== 0) pageCount += 1;

			// if number of pages is greater than current page
			// jump to the last page
			if (newState.currentPage > pageCount) newState.currentPage = pageCount;

			// set active nodes
			newState.activeNodes = newState.filteredNodes.slice(
				(newState.currentPage - 1) * numPerPage,
				(newState.currentPage - 1) * numPerPage + newState.currentPageCount
			);

			return newState;

		case PaginationDispatchTypes.clearFilter:
			newState.filteredNodes = [...state.allNodes];
			newState.filterIndex = -1;
			// set active nodes
			newState.activeNodes = newState.filteredNodes.slice(
				(newState.currentPage - 1) * numPerPage,
				(newState.currentPage - 1) * numPerPage + newState.currentPageCount
			);
			return newState;
		default:
			throw new Error();
	}
}

// Align to the right
const paginationCss = css`
	display: flex;
	justify-content: flex-end;
`;

export default function Console(props: { location: { search: string } }) {
	// TODO go to page 1 on any filter
	// or jump to last page if newpage count < old page count on filter

	let [currentIndex] = useState(0);

	let sortbutton = SortButton({ initialState: SelectState.up });
	let [gridInfo, setGridInfo] = useState();

	const addRing = useCallback(() => {
		ringDispatch({ type: "addRing", args: currentIndex });
	}, [currentIndex]);

	const onPageChange = (page: number, pageSize: number) => {
		paginationDispatch({
			type: PaginationDispatchTypes.onPagechange,
			args: { page, pageSize },
		});
		paginationDispatch({
			type: PaginationDispatchTypes.filterNodes,
		});
	};

	const setInitialQLdata = (gridInfo: { grid: { nodes: NodeType[] } }) => {
		// Initializes the data fetched from graphql
		paginationDispatch({
			type: PaginationDispatchTypes.initialiaze,
			args: { allNodes: gridInfo.grid.nodes },
		});
	};

	// details is the state for the ring progress
	const [details, ringDispatch] = useReducer(ringReducer, initialDetails);
	// this tracks the state of the pagination and filtering
	const [paginationState, paginationDispatch] = useReducer(
		paginationReducer,
		initialPaginationState
	);

	// This is a custom icon renderer for the <Pagination />
	const paginationItemRenderer = (
		_page: number,
		type: string,
		element: React.ReactNode
	) => {
		if (type === "prev") {
			return (
				<button className="btn" id={`${PagenavType.prev}-page`}>
					Prev
				</button>
			);
		} else if (type === "next") {
			return (
				<button className="btn" id={`${PagenavType.next}-page`}>
					Next
				</button>
			);
		} else if (type === "jump-next" || type === "jump-prev") {
			return <i></i>;
		}
		return element;
	};

	// Initialize the 4 rings
	useEffect(() => LABELS.forEach((_) => addRing()), [addRing]);

	// re run the previous search after page changes
	useEffect(window.rerunSearch, [paginationState]);

	// A callback for the child RingSystem
	const ringFilter = (filterIndex: number) => {
		if (filterIndex !== -1) {
			// update the state if index changes
			console.log("Clicked on ring numbered", filterIndex);
			paginationDispatch({
				type: PaginationDispatchTypes.filterNodes,
				args: { filterIndex },
			});
		} else {
			// TODO clear filter
			console.log("clicked outside mate -> will clear filter");
			paginationDispatch({
				type: PaginationDispatchTypes.clearFilter,
			});
		}
	};

	// On mount registers keybinds
	useEffect(() => {
		// register keybinds
		// [N, n, ->] => Next page
		// [P, p, <-] => Previous page

		// Note: using keyboardJS for handling key combinations
		// Currently no key combinations are registered

		// TODO add ctrl + / for showing keyboard shortcuts modal
		// TODO when searching keybinds should be paused
		keyboardJS.bind(["n", "N", "right"], () => {
			let btn = document.querySelector(
				`#${PagenavType.next}-page`
			) as HTMLButtonElement;
			btn.click();
		});

		keyboardJS.bind(["p", "P", "left"], () => {
			let btn = document.querySelector(
				`#${PagenavType.prev}-page`
			) as HTMLButtonElement;
			btn.click();
		});

		// Unbind on unmount
		return () => {
			keyboardJS.reset();
		};
	});

	var params = new URLSearchParams(props.location.search);
	if (params.get("filter") != null) {
		// TODO set initial filter to be filter
	}

	let PaginationWidget = (
		<Pagination
			css={paginationCss}
			itemRender={paginationItemRenderer}
			onChange={onPageChange}
			current={paginationState.currentPage}
			defaultPageSize={numPerPage}
			total={paginationState.filteredNodes.length}
			showQuickJumper={true}
			locale={localeInfo}
		/>
	);

	return (
		<section id="body">
			<div id="overlay"></div>
			<div className="highlightable padding">
				<TopBar />
				<Query
					query={NODES_QUERY}
					// Handle variables on the server side
					variables={{ count: 10, offset: 0 }}
					// TODO remove <Query /> and try another way if two builds are not allowed
					// rebuilds twice because of setting nodes
					// do not use <Query /> if that's not intended
					onCompleted={(data: GqlDataType) => setInitialQLdata(data!)}
				>
					{(result: QueryResult<GqlDataType>) => {
						let { loading, error } = result;

						// TODO shimmer or something more informative (?)
						if (loading) return <h4>fetching...</h4>;
						if (error) {
							console.error(error);
							// TODO show error message properly
							return <div>{error.message}</div>;
						}
						return (
							<React.Fragment>
								<RingSystem details={details} ringFilterCallback={ringFilter} />
								<div
									css={css`
										width: 50vw;
									`}
								>
									{PaginationWidget}
									<div>
										<table className="table table-hover">
											<thead>
												<tr>
													<th
														scope="col"
														// TODO make this call a reset sortfilter function
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
													<th scope="col">
														status{" "}
														{paginationState.filterIndex !== -1 && (
															<i>({LABELS[paginationState.filterIndex]})</i>
														)}
													</th>
													<th scope="col"></th>
												</tr>
											</thead>
											<tbody
												css={css`
													tr:hover td {
														background: rgba(83, 83, 83, 0.3);
													}
												`}
											>
												{/* Map over the nodes */}
												{paginationState.activeNodes.map((n, i) => (
													<NodeRow
														node={n}
														key={n.id}
														selected={paginationState.filterIndex}
														index={
															(paginationState.currentPage - 1) * numPerPage + i
														}
													/>
												))}
											</tbody>
										</table>
									</div>
									{PaginationWidget}
								</div>
							</React.Fragment>
						);
					}}
				</Query>
			</div>
		</section>
	);
}
