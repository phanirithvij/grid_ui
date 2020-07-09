/* A file which has utilties used while progamming */

function showPoint(evt: React.MouseEvent<HTMLDivElement, MouseEvent>) {
	// Add a dot to follow the cursor
	let dot = document.createElement("div");
	dot.className = "dot";
	dot.style.left = evt.pageX + "px";
	dot.style.top = evt.pageY + "px";
	document.body.appendChild(dot);
}

export default null;

/* 
		// Console.tsx code for keyboard events

			const { type } = args!;
			let newPage = state.currentPage;
			if (type! === PageSwitch.next) {
				newPage = state.currentPage + 1;
			} else {
				newPage = state.currentPage - 1;
			}

			let totalPagesRequired = Math.floor(state.allNodes.length / numPerPage);
			let remainingItems = state.allNodes.length % numPerPage;
			if (remainingItems !== 0) totalPagesRequired += 1;

			if (newPage > totalPagesRequired || newPage < 1) return state;

			let currPageSize = numPerPage;
			if (newPage === totalPagesRequired) {
				currPageSize = remainingItems;
			}
			newState.activeNodes = newState.allNodes.slice(
				(newPage! - 1) * numPerPage,
				(newPage! - 1) * numPerPage + currPageSize
			);

			newState.currentPage = newPage!;
			newState.currentPageCount = currPageSize;
			return newState;


*/