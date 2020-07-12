import NodeType from "./node";

interface PaginationState {
	allNodes: NodeType[];
	activeNodes: NodeType[];
	allActiveNodes: NodeType[];
  currentPageCount: number;
	currentPage: number;
	filterIndex: number;
}

export default PaginationState;
