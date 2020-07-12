/*
	This file has some code which was removed later on but can be used again
	This can be safely removed and it will not add to the build
*/

// Shows a dot which follows the cursor
// This was used to debug the ringsystem
function showPoint(evt: React.MouseEvent<HTMLDivElement, MouseEvent>) {
	let dot = document.createElement("div");
	dot.className = "dot";
	dot.style.left = evt.pageX + "px";
	dot.style.top = evt.pageY + "px";
	document.body.appendChild(dot);
}

export default null;

/* 
// Console.tsx code for keyboard events
// Replaced by keyboardJS

	const { type } = args!;
	let newPage = state.currentPage;
	if (type! === PageSwitch.next) {
		newPage = state.currentPage + 1;
	} else {
		newPage = state.currentPage - 1;
	}

	// This part handles the calculation of the number of pages and the currentPageCount

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