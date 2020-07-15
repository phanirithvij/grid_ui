/** @jsx _jsx */
import { useEffect, useState } from "react";
import ReactModal from "react-modal";
import { css, jsx as _jsx } from "@emotion/core";
import keyboardJS from "keyboardjs";
import "./Keyboard.css";
import { ConsoleKeyCombinations } from "../../screens/Console/Console.keybinds";
import Tippy from "@tippyjs/react";

const ToggleKeyComb = "ctrl + /";

export default function KeyBoardHelp() {
	let [showModal, setShowModal] = useState(true);
	const handleCloseModal = () => setShowModal(false);
	useEffect(() => {
		keyboardJS.bind(
			ToggleKeyComb,
			/*
				Pressed in not getting fired on the very first time
				So using released callback which acts the same
				TODO see if this issue occurs at other keybinds
			*/
			null,
			() => {
				console.log("released");
				// Here an important thing to note is that
				// if we use showModal variable and call `setShowModal(!showModal)`
				// the showmodal is always false because it is pass by value
				// Clear explaination https://stackoverflow.com/a/53024497/8608146

				// So we should do it like this: get the current value and toggle it
				setShowModal((state) => !state);
			},
			// prevent duplicates
			true
		);

		keyboardJS.bind("esc", handleCloseModal);

		// close modal on focus and enter
		keyboardJS.bind("enter", () => {
			const dataset = (document.activeElement as HTMLElement).dataset;
			if (dataset.close) handleCloseModal();
		});

		return () => {
			keyboardJS.reset();
		};
	}, []); // empty dependencies ensures this will be only called once

	return (
		<div
			css={css`
				color: white;
				position: absolute;
				right: 5%;
				bottom: 0;
				// transform: translate(-50%, 0);
				pre {
					margin: 0;
				}
			`}
		>
			<ReactModal isOpen={showModal} contentLabel="Minimal Modal Example">
				<div>
					{Object.entries(ConsoleKeyCombinations).map(([k, v], _i, _arr) => {
						return (
							<div
								key={k}
								css={css`
									pre {
										margin: 1em 0;
									}
								`}
							>
								<pre>{v.keys.join(" or ")}</pre>
								<span style={{ fontSize: "large" }}>{v.desc}</span>
								{v.subdescs !== undefined &&
									v.subdescs.map((subdesc) => (
										<div
											css={css`
												// float: left;
												padding-left: 20px;
											`}
											key={subdesc}
										>
											{subdesc}
										</div>
									))}
							</div>
						);
					})}
					<Tippy content={`${ToggleKeyComb} or esc`}>
						<i
							id="close-modal-x"
							tabIndex={0}
							data-close="true"
							onClick={handleCloseModal}
							className="fas fa-times"
							css={css`
								position: absolute;
								top: 10px;
								right: 10px;
								cursor: pointer;
							`}
						></i>
					</Tippy>
				</div>
			</ReactModal>
			<small>CTRL + /</small> keyboard shortcuts
		</div>
	);
}
