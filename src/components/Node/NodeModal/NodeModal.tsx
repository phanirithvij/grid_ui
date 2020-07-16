/** @jsx _jsx */

import { css, jsx as _jsx } from "@emotion/core";

export default function NodeModal(props: { id: string }) {
	const { id } = props;
	return (
		<div
			id="node-modal"
			css={css`
				min-width: 290px;
				width: 23.5vw;
				background-image: linear-gradient(
					-90.19deg,
					#ffffff 80.01%,
					#dbffe5 99.64%
				);
				background-position: center 3px;
				height: 130vh;
				padding-top: 30px;
				padding-right: 1vw;
				padding-left: 1vw;
				transform: translate(2vw, -21vh);
				// border-left: 1px solid;
				// border-top: 1px solid;
			`}
		>
			<i
				onClick={() => {
					let element = document.querySelector("#node-modal") as HTMLDivElement;
					element.style.display =
						element.style.display === "none" ? "block" : "none";
				}}
				className="fa fa-times"
				title="Close Node Details Modal"
				css={css`
					position: absolute;
					top: 10px;
					right: 10px;
					cursor: pointer;
				`}
			></i>
			<div
				css={css`
					background: #95adae78;
					width: 100%;
					height: 300px;
					display: flex;
					align-items: center;
					flex-direction: column;
					justify-content: space-around;
				`}
			>
				<span>Node 1</span>
				<p>Status : UP</p>
				<p>Capabilities:</p>
				<div
					css={css`
						background: #95adae78;
						width: 70%;
						height: 100px;
					`}
				></div>
			</div>
		</div>
	);
}
