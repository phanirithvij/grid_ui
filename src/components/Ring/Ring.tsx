/** @jsx _jsx */

import { css, jsx as _jsx } from "@emotion/core";
import React, { useState } from "react";
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
	color: string;
	progress: number;
	offset: number;
	parentCB: Function;
}) {
	const { radius, stroke, progress, offset, color, parentCB } = props;
	let normalizedRadius = radius - stroke;
	let circumference = normalizedRadius * 2 * Math.PI;
	const strokeDashoffset = circumference - (progress / 100) * circumference;
	const offsetAngle = (360 * offset) / 100;

	return (
		<React.Fragment>
			<svg
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
		</React.Fragment>
	);
}
