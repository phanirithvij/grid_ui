import * as Replacer from "findandreplacedomtext";

const searchHighlight = (search: string) => {
	return Replacer(document.body, {
		find: new RegExp(search, "ig"),
		wrap: "mark",
		wrapClass: "highlight",
	});
};


export default searchHighlight;
