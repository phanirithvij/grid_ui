/** @jsx _jsx */

import { css, jsx as _jsx } from "@emotion/core";
import Tippy from "@tippyjs/react";
import { followCursor } from "tippy.js";
import "tippy.js/dist/tippy.css"; // optional for styling
import { ReactComponent as TooltipBottomIcon } from "../../assets/icons/tooltip-bott.svg";

export function ToolTip({ children }: { children: JSX.Element }) {
	return (
		<div
			id="tooltip"
			css={css`
				transition: 0.35s display;
				border-radius: 5px;
				padding: 5px;
				z-index: 9999;
			`}
			style={{ position: "absolute", display: "none" }}
		>
			{children}
			<span>
				<TooltipBottomIcon />
			</span>
		</div>
	);
}

export default function Ring(props: {
	radius: number;
	stroke: number;
	id: string;
	color: string;
	progress: number;
	offset: number;
	parentCB: Function;
}) {
	const { radius, stroke, progress, offset, color, id /* parentCB */ } = props;

	// useEffect(() => {
	// 	// register tippy tooltips only when progress changes
	// 	tippy(`#${id}`, {
	// 		content: `${progress}%`,
	// 		followCursor: true,
	// 		plugins: [followCursor],
	// 	});
	// }, [progress]);

	let normalizedRadius = radius - stroke;
	let circumference = normalizedRadius * 2 * Math.PI;
	const strokeDashoffset = circumference - (progress / 100) * circumference;
	const offsetAngle = (360 * offset) / 100;

	return (
		<Tippy
			content={`${progress}%`}
			followCursor={true}
			plugins={[followCursor]}
		>
			<svg
				id={id}
				height={radius * 2}
				width={radius * 2}
				css={css`
					position: absolute;
					.progress-ring__circle {
						transition: 0.35s stroke-dashoffset, 0.35s transform;
						// axis compensation
						transform: rotate(calc(-90deg + ${offsetAngle}deg));
						transform-origin: 50% 50%;
					}
				`}
			>
				<circle
					className="progress-ring__circle"
					stroke={color}
					fill="transparent"
					strokeWidth={stroke}
					strokeDasharray={circumference + " " + circumference}
					style={{ strokeDashoffset }}
					r={normalizedRadius}
					cx={radius}
					cy={radius}
					// onClick={(ev) => showTooltip(ev, <div>{color}</div>)}
					// onMouseOut={hideTooltip}
				/>
			</svg>
		</Tippy>
	);
}
