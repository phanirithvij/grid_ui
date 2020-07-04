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
