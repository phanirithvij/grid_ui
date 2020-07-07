/** @jsx _jsx */
import { loader } from "graphql.macro";
import React, { useCallback, useEffect, useReducer, useState } from "react";
import { Query, QueryResult } from "react-apollo";
import RingSystem from "../../components/RingSystem/RingSystem";
import { colors, LABELS, StatusType } from "../../components/Status";
import "../../css/common.css";
import NodeType from "../../models/node";
import RingDetails from "../../models/rings";
import ProgressBar from "progressbar.js";
import { css, jsx as _jsx } from "@emotion/core";
import TopBar from "../../components/TopBar";
import Tippy from "@tippyjs/react";
import { followCursor } from "tippy.js";
import "./Hub.css";

const NODES_QUERY = loader("../../graphql/nodes.gql");

interface GqlDataType {
	nodes: NodeType[];
}

const initialDetails: RingDetails = {
	count: 0,
	progresses: {},
};

function ringReducer(state: RingDetails, action: { type: string; args?: any }) {
	switch (action.type) {
		case "addRing":
			const newState = {
				count: state.count + 1,
				progresses: { ...state.progresses },
			};
			newState.progresses[state.count] = {
				progress: 25,
				color: colors[state.count as StatusType],
			};
			return newState;
		case "updateRing":
			const updatedState = { ...state };
			if (updatedState.count > 0) {
				updatedState.progresses[action.args as number] = {
					...updatedState.progresses[action.args as number],
					progress: Math.round(Math.random() * 99 + 1),
				};
			}
			return updatedState;
		default:
			throw new Error();
	}
}

export default function Hubpage() {
	let [currentIndex] = useState(0);
	let [usedSlots, totalSlots] = [2, 3];

	const addRing = useCallback(() => {
		ringDispatch({ type: "addRing", args: currentIndex });
	}, [currentIndex]);

	// const updateRing = () => {
	// 	ringDispatch({ type: "updateRing", args: currentIndex });
	// };

	const [details, ringDispatch] = useReducer(ringReducer, initialDetails);

	// Initialize the 4 rings
	useEffect(() => {
		LABELS.forEach((_) => addRing());
	}, [addRing]);

	useEffect(() => {
		window.pbar = ProgressBar;

		var bar = new ProgressBar.SemiCircle(document.querySelector("#container"), {
			strokeWidth: 6,
			color: "#FFEA82",
			trailColor: "#eee",
			trailWidth: 1,
			easing: "easeInOut",
			duration: 1400,
			svgStyle: null,
			text: {
				value: "",
				alignToBottom: false,
			},
			from: { color: "#3BEC70" },
			// from: { color: "#FFEA82" },
			to: { color: "#ED6A5A" },
			// Set default step function for all animate calls
			step: (
				state: { color: any },
				bar: {
					path: { setAttribute: (arg0: string, arg1: any) => void };
					value: () => number;
					setText: (arg0: React.Key) => void;
					text: { style: { color: any } };
				}
			) => {
				bar.path.setAttribute("stroke", state.color);
				var value = Math.round(bar.value() * totalSlots);
				if (value === 0) {
					bar.setText("");
				} else {
					bar.setText(value);
				}

				bar.text.style.color = state.color;
			},
		});
		bar.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
		bar.text.style.fontSize = "2rem";

		// usedSlots/TotalSlots
		bar.animate(usedSlots / totalSlots); // Number from 0.0 to 1.0
	}, []);
	return (
		<section id="body">
			<div id="overlay"></div>
			<div className="highlightable padding">
				<TopBar />
				<div
					css={css`
						position: relative;
					`}
				>
					<Query
						query={NODES_QUERY}
						// Handle variables on the server side
						variables={{ count: 10, offset: 0 }}
						// TODO remove <Query /> and try another way if two builds are not allowed
						// rebuilds twice because of setting nodes
						// do not use <Query /> if that's not intended
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
								<RingSystem
									details={details}
									stroke={10}
									radius={200}
									showLabels={true}
									css={css`
										position: absolute;
									`}
								/>
							);
						}}
					</Query>
					<Tippy
						content={`${2}/${3}`}
						followCursor={true}
						plugins={[followCursor]}
					>
						<div
							id="container"
							css={css`
								margin: 20px;
								width: 200px;
								height: 100px;
								position: absolute;
							`}
						></div>
					</Tippy>
				</div>
			</div>
		</section>
	);
}
