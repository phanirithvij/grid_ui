/** @jsx _jsx */

import { css, jsx as _jsx } from "@emotion/core";
import React from "react";

interface RingProps {
	radius: number;
	stroke: number;
	highlight?: boolean;
	id: string;
	color: string;
	progress: number;
	offset: number;
	parentCB: Function;
}

// Ring is an svg cicular ring implementation
const Ring = React.memo((props: RingProps) => {
	const {
		radius,
		stroke,
		progress,
		offset: offsetPercent,
		color,
		id,
		highlight = false,
		/* parentCB */
	} = props;

	let normalizedRadius = radius - stroke;
	let circumference = normalizedRadius * 2 * Math.PI;
	const strokeDashoffset = circumference - (progress / 100) * circumference;
	const offsetAngle = (360 * offsetPercent) / 100;

	return (
		<svg
			id={id}
			height={radius * 2}
			width={radius * 2}
			css={css`
				position: absolute;
				.progress-ring__circle {
					transition: 0.35s stroke-dashoffset, 0.35s transform;
					// -90deg axis compensation
					transform: rotate(calc(-90deg + ${offsetAngle}deg));
					transform-origin: 50% 50%;
				}
			`}
		>
			<circle
				className="progress-ring__circle"
				stroke={color}
				fill="transparent"
				strokeWidth={highlight ? stroke + 5 : stroke}
				strokeDasharray={circumference + " " + circumference}
				style={{ strokeDashoffset }}
				r={normalizedRadius}
				cx={radius}
				cy={radius}
			/>
		</svg>
	);
});

export default Ring;
