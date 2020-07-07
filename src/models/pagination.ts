import NodeType from "./node";

interface PaginationState {
	allNodes: NodeType[];
	activeNodes: NodeType[];
  currentPageCount: number;
  currentPage: number;
}

export default PaginationState;
