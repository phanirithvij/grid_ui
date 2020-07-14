import gql from "graphql-tag";
import { client } from "../App";
import NodeType from "../models/node";

const GAP_MILLIS = 1000;

type CallbackType = (data: NodeType[]) => void;
type QueryResultType = { grid: { nodes: NodeType[] } };

const fetchStatusUpdates = async (
	callback: CallbackType,
	gapms = GAP_MILLIS,
	controlFlag = "window.pauseUpdates",
) => {
	if (eval(controlFlag) !== undefined && eval(controlFlag)) {
		// pause updates
		setTimeout(() => {
			fetchStatusUpdates(callback);
		}, gapms);
	} else {
		client
			.query<QueryResultType>({
				query: gql`
					query GetStatus {
						grid {
							nodes {
								id
								status
							}
						}
					}
				`,
				fetchPolicy: "network-only",
			})
			.then((result) => {
				callback(result.data.grid.nodes);
				setTimeout(() => {
					fetchStatusUpdates(callback);
				}, gapms);
			});
	}
};
export default fetchStatusUpdates;
