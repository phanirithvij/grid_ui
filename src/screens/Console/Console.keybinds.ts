import keyboardJS from "keyboardjs";
import { RingRef } from "../../components/RingSystem/RingSystem";
import { LABELS } from "../../components/Status";
import { PagenavType } from "./Console";

interface KeyCombinationInfo {
	keys: string[];
	desc: string;
	subdescs?: string[];
}

export const ConsoleKeyCombinations: { [key: string]: KeyCombinationInfo } = {
	nextPage: { keys: ["n", "N", "right"], desc: "Next page in table" },
	prevPage: { keys: ["p", "P", "left"], desc: "Previous page in table" },
	esc: {
		keys: ["esc"],
		desc: "Esc key can do these:",
		subdescs: [
			"Clears current tab focus",
			"Clears selected filter",
			"Closes the keyboard shortcuts reference",
		],
	},
	show: { keys: ["ctrl + /"], desc: "Show/Hide this page" },
	enter: {
		keys: ["enter"],
		desc: "Enter key when used with tab focus will:",
		subdescs: [
			"Opens Node Modals on the right if focused on an arrow",
			"Filters nodes by status if focused on rings",
		],
	},
};

/** A trigger type which is used to determine the type of the focus actions */
export enum FocusTriggerActions {
	/** Ring keyboardfocus triggers Ring.tsx*/
	filterSelected = "filterSelected",
	/** Triggered when focused on the arrow icons in NodeRow, NodeRow.tsx */
	openNodeModal = "openNodeModal",
}

/** The dataset values for focus actions */
export interface FocusActionDataset extends DOMStringMap {
	/** Focus trigger action type */
	triggerAction: FocusTriggerActions;
	/** The LABEL of the selected filter from the defined LABELS array */
	triggerFilterLabel?: string;
}

/** A function which handles the initialiazation of keyboard shortcuts for this component */
export function initializeKeyBinds(
	/* These arguments are needed to execute the keyboad actions */
	ringRef: React.RefObject<RingRef>,
	ringFilter: (filterIndex: number) => void
) {
	// register keybinds
	// [N, n, ->] => Next page
	// [P, p, <-] => Previous page
	// ESC => clear filter

	// Note: using keyboardJS for handling key combinations
	// Currently no key combinations are registered

	keyboardJS.setContext(`Console`);
	keyboardJS.bind(ConsoleKeyCombinations.nextPage.keys, () => {
		let btn = document.querySelector(
			`#${PagenavType.next}-page`
		) as HTMLButtonElement;
		btn.click();
	});

	keyboardJS.bind(ConsoleKeyCombinations.prevPage.keys, () => {
		let btn = document.querySelector(
			`#${PagenavType.prev}-page`
		) as HTMLButtonElement;
		btn.click();
	});

	keyboardJS.bind(ConsoleKeyCombinations.esc.keys, () => {
		// Un select most recent selected component
		// eg. remove filter
		const focused = document.activeElement as HTMLElement;
		// if nothing is focused or body is focused
		// remove any selected filter
		if (!focused || focused === document.body)
			ringRef.current?.saveFilterState();
		// else remove any focused element
		else focused.blur();
	});

	keyboardJS.bind(["enter"], () => {
		// do something based on current selected element
		const selected = document.activeElement as HTMLElement;
		if (!selected) return;
		const dataset = selected.dataset as FocusActionDataset;
		if (dataset.triggerAction === `${FocusTriggerActions.filterSelected}`) {
			if (
				dataset.triggerFilterLabel === undefined ||
				!LABELS.includes(dataset.triggerFilterLabel)
			)
				return;

			let index = LABELS.indexOf(dataset.triggerFilterLabel);
			ringFilter(index);
			ringRef.current?.saveFilterState(index);
		}
	});
}

/** Resets the current keybinds */
export function unBindKeys() {
	keyboardJS.withContext("Console", () => {
		keyboardJS.reset();
	});
}
